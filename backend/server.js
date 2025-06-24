const express = require('express');
const cors = require('cors');
const winston = require('winston');
const app = express();
const { users } = require('./data.js');

// Define allowed origins
const allowedOrigins = [
  'https://fantasy11-3vnl.onrender.com', // Frontend production URL
  'http://localhost:3000' // Frontend local development URL
];

// CORS options
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allow methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow common headers
  credentials: true, // Support cookies or auth headers if needed
  optionsSuccessStatus: 200 // Ensure preflight requests succeed
};

// Apply CORS with options
app.use(cors(corsOptions));
app.use(express.json());

// Logger configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'server.log' })
  ]
});

const currentDate = new Date('2025-06-24T11:03:00Z'); // Fixed UTC date for consistency

// Normalization utilities
const zScoreNormalize = (value, mean, std) => std > 0 ? (value - mean) / std : 0;
const minMaxNormalize = (value, min, max) => max > min ? (value - min) / (max - min) : 0;
const mean = (arr) => arr.reduce((sum, x) => sum + x, 0) / arr.length;
const std = (arr, meanVal) => Math.sqrt(arr.reduce((sum, x) => sum + Math.pow(x - meanVal, 2), 0) / (arr.length - 1));
const min = (arr) => Math.min(...arr);
const max = (arr) => Math.max(...arr);

// Logistic Regression Model
class LogisticRegression {
  constructor(numFeatures, learningRate = 0.01, numIterations = 5000, lambda = 0.1) {
    this.weights = new Array(numFeatures).fill(0.1);
    this.bias = 0.1;
    this.learningRate = learningRate;
    this.numIterations = numIterations;
    this.lambda = lambda;
  }

  sigmoid(z) {
    return 1 / (1 + Math.exp(-Math.max(Math.min(z, 100), -100)));
  }

  train(features, labels, classWeights = { 0: 1, 1: 1 }) {
    for (let i = 0; i < this.numIterations; i++) {
      const predictions = features.map((f) => this.sigmoid(this.predictRaw(f)));
      for (let j = 0; j < this.weights.length; j++) {
        let gradient = 0;
        for (let k = 0; k < features.length; k++) {
          const error = predictions[k] - labels[k];
          gradient += classWeights[labels[k]] * error * features[k][j];
        }
        this.weights[j] -= this.learningRate * ((gradient / features.length) + (this.lambda * this.weights[j]));
      }
      let biasGradient = 0;
      for (let k = 0; k < features.length; k++) {
        biasGradient += classWeights[labels[k]] * (predictions[k] - labels[k]);
      }
      this.bias -= this.learningRate * (biasGradient / features.length);
    }
  }

  predictRaw(features) {
    return features.reduce((sum, f, i) => sum + f * this.weights[i], 0) + this.bias;
  }

  predict(features, threshold = 0.5) {
    return this.sigmoid(this.predictRaw(features)) > threshold ? 1 : 0;
  }

  predictProb(features) {
    return this.sigmoid(this.predictRaw(features));
  }

  evaluate(features, labels, threshold = 0.5) {
    const predictions = features.map((f) => this.predict(f, threshold));
    const correct = predictions.reduce((sum, pred, i) => sum + (pred === labels[i] ? 1 : 0), 0);
    const accuracy = correct / labels.length;

    let truePositives = 0, falsePositives = 0, falseNegatives = 0;
    for (let i = 0; i < predictions.length; i++) {
      if (predictions[i] === 1 && labels[i] === 1) truePositives++;
      if (predictions[i] === 1 && labels[i] === 0) falsePositives++;
      if (predictions[i] === 0 && labels[i] === 1) falseNegatives++;
    }
    const precision = truePositives / (truePositives + falsePositives) || 0;
    const recall = truePositives / (truePositives + falseNegatives) || 0;
    const f1Score = 2 * (precision * recall) / (precision + recall) || 0;

    const scores = features.map((f) => this.predictProb(f));
    let auc = 0.5;
    const pos = labels.reduce((sum, l) => sum + l, 0);
    const neg = labels.length - pos;
    if (pos > 0 && neg > 0) {
      const ranked = scores.map((s, i) => ({ score: s, label: labels[i] }))
        .sort((a, b) => b.score - a.score);
      let tpr = 0, fpr = 0, aucSum = 0;
      let prevTpr = 0, prevFpr = 0;
      let posCount = 0, negCount = 0;
      for (let i = 0; i < ranked.length; i++) {
        if (i > 0 && ranked[i].score !== ranked[i - 1].score) {
          aucSum += (tpr + prevTpr) * (fpr - prevFpr) / 2;
          prevTpr = tpr;
          prevFpr = fpr;
        }
        if (ranked[i].label === 1) posCount++;
        else negCount++;
        tpr = posCount / pos;
        fpr = negCount / neg;
      }
      aucSum += (tpr + prevTpr) * (fpr - prevFpr) / 2;
      auc = aucSum;
    }

    return { accuracy, precision, recall, f1Score, auc };
  }

  getFeatureImportance(featureNames) {
    return featureNames.map((name, i) => ({
      feature: name,
      weight: Math.abs(this.weights[i]).toFixed(4)
    })).sort((a, b) => b.weight - a.weight);
  }
}

// SMOTE Implementation
const smote = (features, labels, numPositive, k = 3) => {
  const positiveIndices = labels.map((l, i) => l === 1 ? i : -1).filter(i => i !== -1);
  const newFeatures = [...features];
  const newLabels = [...labels];

  if (positiveIndices.length < 2) return { features, labels };

  const findKNN = (feature, indices, k) => {
    const distances = indices.map(i => ({
      index: i,
      distance: Math.sqrt(feature.reduce((sum, f, j) => sum + Math.pow(f - features[i][j], 2), 0))
    })).sort((a, b) => a.distance - b.distance);
    return distances.slice(1, k + 1).map(d => d.index);
  };

  while (newLabels.filter(l => l === 1).length < numPositive) {
    const idx = positiveIndices[Math.floor(Math.random() * positiveIndices.length)];
    const neighbors = findKNN(features[idx], positiveIndices, k);
    const neighborIdx = neighbors[Math.floor(Math.random() * neighbors.length)];
    const alpha = Math.random();
    const newFeature = features[idx].map((f, i) => f + alpha * (features[neighborIdx][i] - f));
    newFeatures.push(newFeature);
    newLabels.push(1);
  }

  return { features: newFeatures, labels: newLabels };
};

// Stratified K-Fold Cross-Validation
const stratifiedKFoldCV = (features, labels, numFeatures, learningRate, lambda, classWeights, threshold = 0.5, k = 5) => {
  if (features.length === 0 || labels.length === 0) {
    return { mean: { accuracy: 1.0, precision: 0.0, recall: 0.0, f1Score: 0.0, auc: 0.0 }, std: { accuracy: 0.0, precision: 0.0, recall: 0.0, f1Score: 0.0, auc: 0.0 } };
  }
  const indices = Array.from({ length: features.length }, (_, i) => i);
  const positiveIndices = indices.filter(i => labels[i] === 1);
  const negativeIndices = indices.filter(i => labels[i] === 0);
  const posPerFold = Math.floor(positiveIndices.length / k);
  const negPerFold = Math.floor(negativeIndices.length / k);

  const metrics = [];
  for (let fold = 0; fold < k; fold++) {
    const valPos = positiveIndices.slice(fold * posPerFold, (fold + 1) * posPerFold);
    const valNeg = negativeIndices.slice(fold * negPerFold, (fold + 1) * negPerFold);
    const valIndices = [...valPos, ...valNeg];
    const trainIndices = indices.filter(i => !valIndices.includes(i));

    const trainFeatures = trainIndices.map(i => features[i]);
    const trainLabels = trainIndices.map(i => labels[i]);
    const valFeatures = valIndices.map(i => features[i]);
    const valLabels = valIndices.map(i => labels[i]);

    const model = new LogisticRegression(numFeatures, learningRate, 5000, lambda);
    model.train(trainFeatures, trainLabels, classWeights);
    const result = model.evaluate(valFeatures, valLabels, threshold);
    metrics.push(result);
  }

  const meanMetrics = {
    accuracy: mean(metrics.map(m => m.accuracy)),
    precision: mean(metrics.map(m => m.precision)),
    recall: mean(metrics.map(m => m.recall)),
    f1Score: mean(metrics.map(m => m.f1Score)),
    auc: mean(metrics.map(m => m.auc)),
  };

  const stdMetrics = {
    accuracy: Math.sqrt(mean(metrics.map(m => Math.pow(m.accuracy - meanMetrics.accuracy, 2)))),
    precision: Math.sqrt(mean(metrics.map(m => Math.pow(m.precision - meanMetrics.precision, 2)))),
    recall: Math.sqrt(mean(metrics.map(m => Math.pow(m.recall - meanMetrics.recall, 2)))),
    f1Score: Math.sqrt(mean(metrics.map(m => Math.pow(m.f1Score - meanMetrics.f1Score, 2)))),
    auc: Math.sqrt(mean(metrics.map(m => Math.pow(m.auc - meanMetrics.auc, 2)))),
  };

  return { mean: meanMetrics, std: stdMetrics };
};

// Grid Search for Hyperparameter Tuning
const gridSearch = (features, labels, classWeights, threshold = 0.5) => {
  if (features.length === 0 || labels.length === 0) {
    return { learningRate: 0.01, lambda: 0.1 };
  }
  const paramGrid = [
    { learningRate: 0.001, lambda: 0.01 }, { learningRate: 0.001, lambda: 0.1 },
    { learningRate: 0.01, lambda: 0.01 }, { learningRate: 0.01, lambda: 0.1 },
    { learningRate: 0.05, lambda: 0.01 }, { learningRate: 0.05, lambda: 0.1 },
  ];

  let bestParams = { learningRate: 0.01, lambda: 0.1 };
  let bestScore = -Infinity;

  for (const params of paramGrid) {
    const metrics = stratifiedKFoldCV(features, labels, features[0].length, params.learningRate, params.lambda, classWeights, threshold);
    const score = metrics.mean.f1Score;
    if (score > bestScore) {
      bestScore = score;
      bestParams = params;
    }
  }

  return bestParams;
};

// Class Weights Computation
const computeClassWeights = (labels) => {
  const numPos = labels.filter(l => l === 1).length;
  const numNeg = labels.length - numPos;
  const posWeight = numPos > 0 ? Math.min(numNeg / numPos, 10) : 1;
  return { 0: 1, 1: posWeight };
};

// Feature Extraction
const extractFeatures = (user, currentDate, normParams) => {
  const totalDeposits = user.totalDeposits || 0;
  const totalWithdrawals = user.totalWithdrawals || 0;
  const engagementScore = user.engagementScore || 0.7;
  const gameTime = user.gameTime || 200;
  const averageSpend = user.averageSpend || 10;
  const activeContests = user.activeContests || 0;
  const lastLogin = user.lastLogin || currentDate.toISOString();
  const journey = user.journey || [];
  const bettingHistory = user.bettingHistory || [];
  const completedContests = user.completedContests || 0;
  const wins = user.wins || 0;

  const balance = totalDeposits - totalWithdrawals;
  const daysSinceLastLogin = (currentDate - new Date(lastLogin)) / (1000 * 60 * 60 * 24);
  const recentBets = bettingHistory.filter(
    (b) => (currentDate - new Date(b.date)) / (1000 * 60 * 60 * 24) < 7
  ).length;
  const depositAmounts = journey.filter((j) => j.action === 'deposit').map((j) => j.amount);
  const depositVariance = depositAmounts.length > 1
    ? depositAmounts.reduce((sum, x) => sum + Math.pow(x - mean(depositAmounts), 2), 0) / (depositAmounts.length - 1)
    : 0;
  const logDepositVariance = depositVariance > 0 ? Math.log10(depositVariance) : 0;
  const registrationDate = journey.find((j) => j.action === 'deposit')?.timestamp || currentDate.toISOString();
  const tenure = (currentDate - new Date(registrationDate)) / (1000 * 60 * 60 * 24);
  const winRate = completedContests > 0 ? wins / completedContests : 0;
  const bettingFrequency = bettingHistory.length / (tenure / 7 || 1);
  const lastDeposit = journey.filter(j => j.action === 'deposit').sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
  const depositRecency = lastDeposit ? (currentDate - new Date(lastDeposit.timestamp)) / (1000 * 60 * 60 * 24) : 30;

  return {
    normalizedFeatures: [
      zScoreNormalize(daysSinceLastLogin, normParams.daysSinceLastLogin.mean, normParams.daysSinceLastLogin.std),
      minMaxNormalize(engagementScore, 0, 1),
      minMaxNormalize(activeContests, normParams.activeContests.min, normParams.activeContests.max),
      minMaxNormalize(recentBets, normParams.recentBets.min, normParams.recentBets.max),
      zScoreNormalize(balance, normParams.balance.mean, normParams.balance.std),
      zScoreNormalize(logDepositVariance, normParams.logDepositVariance.mean, normParams.logDepositVariance.std),
      zScoreNormalize(averageSpend, normParams.averageSpend.mean, normParams.averageSpend.std),
      zScoreNormalize(gameTime, normParams.gameTime.mean, normParams.gameTime.std),
      zScoreNormalize(tenure, normParams.tenure.mean, normParams.tenure.std),
      minMaxNormalize(winRate, 0, 1),
      zScoreNormalize(bettingFrequency, normParams.bettingFrequency.mean, normParams.bettingFrequency.std),
      zScoreNormalize(depositRecency, normParams.depositRecency.mean, normParams.depositRecency.std)
    ],
    rawFeatures: {
      daysSinceLastLogin,
      engagementScore,
      balance,
      activeContests,
      recentBets,
      logDepositVariance,
      averageSpend,
      gameTime,
      tenure,
      winRate,
      bettingFrequency,
      depositRecency
    }
  };
};

// Prepare Training Data
const prepareTrainingData = () => {
  const rawFeaturesList = users.map(user => {
    const totalDeposits = user.totalDeposits || 0;
    const totalWithdrawals = user.totalWithdrawals || 0;
    const engagementScore = user.engagementScore || 0.7;
    const gameTime = user.gameTime || 200;
    const averageSpend = user.averageSpend || 10;
    const activeContests = user.activeContests || 0;
    const lastLogin = user.lastLogin || currentDate.toISOString();
    const journey = user.journey || [];
    const bettingHistory = user.bettingHistory || [];
    const completedContests = user.completedContests || 0;
    const wins = user.wins || 0;

    const balance = totalDeposits - totalWithdrawals;
    const daysSinceLastLogin = (currentDate - new Date(lastLogin)) / (1000 * 60 * 60 * 24);
    const recentBets = bettingHistory.filter(
      (b) => (currentDate - new Date(b.date)) / (1000 * 60 * 60 * 24) < 7
    ).length;
    const depositAmounts = journey.filter((j) => j.action === 'deposit').map((j) => j.amount);
    const depositVariance = depositAmounts.length > 1
      ? depositAmounts.reduce((sum, x) => sum + Math.pow(x - mean(depositAmounts), 2), 0) / (depositAmounts.length - 1)
      : 0;
    const logDepositVariance = depositVariance > 0 ? Math.log10(depositVariance) : 0;
    const registrationDate = journey.find((j) => j.action === 'deposit')?.timestamp || currentDate.toISOString();
    const tenure = (currentDate - new Date(registrationDate)) / (1000 * 60 * 60 * 24);
    const winRate = completedContests > 0 ? wins / completedContests : 0;
    const bettingFrequency = bettingHistory.length / (tenure / 7 || 1);
    const lastDeposit = journey.filter(j => j.action === 'deposit').sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
    const depositRecency = lastDeposit ? (currentDate - new Date(lastDeposit.timestamp)) / (1000 * 60 * 60 * 24) : 30;

    return {
      daysSinceLastLogin,
      engagementScore,
      balance,
      activeContests,
      recentBets,
      logDepositVariance,
      averageSpend,
      gameTime,
      tenure,
      winRate,
      bettingFrequency,
      depositRecency
    };
  });

  const normParams = {
    daysSinceLastLogin: { mean: mean(rawFeaturesList.map(f => f.daysSinceLastLogin)), std: std(rawFeaturesList.map(f => f.daysSinceLastLogin), mean(rawFeaturesList.map(f => f.daysSinceLastLogin))) },
    engagementScore: { min: 0, max: 1 },
    balance: { mean: mean(rawFeaturesList.map(f => f.balance)), std: std(rawFeaturesList.map(f => f.balance), mean(rawFeaturesList.map(f => f.balance))) },
    activeContests: { min: min(rawFeaturesList.map(f => f.activeContests)), max: max(rawFeaturesList.map(f => f.activeContests)) },
    recentBets: { min: min(rawFeaturesList.map(f => f.recentBets)), max: max(rawFeaturesList.map(f => f.recentBets)) },
    logDepositVariance: { mean: mean(rawFeaturesList.map(f => f.logDepositVariance)), std: std(rawFeaturesList.map(f => f.logDepositVariance), mean(rawFeaturesList.map(f => f.logDepositVariance))) },
    averageSpend: { mean: mean(rawFeaturesList.map(f => f.averageSpend)), std: std(rawFeaturesList.map(f => f.averageSpend), mean(rawFeaturesList.map(f => f.averageSpend))) },
    gameTime: { mean: mean(rawFeaturesList.map(f => f.gameTime)), std: std(rawFeaturesList.map(f => f.gameTime), mean(rawFeaturesList.map(f => f.gameTime))) },
    tenure: { mean: mean(rawFeaturesList.map(f => f.tenure)), std: std(rawFeaturesList.map(f => f.tenure), mean(rawFeaturesList.map(f => f.tenure))) },
    winRate: { min: 0, max: 1 },
    bettingFrequency: { mean: mean(rawFeaturesList.map(f => f.bettingFrequency)), std: std(rawFeaturesList.map(f => f.bettingFrequency), mean(rawFeaturesList.map(f => f.bettingFrequency))) },
    depositRecency: { mean: mean(rawFeaturesList.map(f => f.depositRecency)), std: std(rawFeaturesList.map(f => f.depositRecency), mean(rawFeaturesList.map(f => f.depositRecency))) }
  };

  logger.info('Feature Statistics:');
  logger.info(`daysSinceLastLogin: mean=${normParams.daysSinceLastLogin.mean.toFixed(2)}, std=${normParams.daysSinceLastLogin.std.toFixed(2)}`);
  logger.info(`balance: mean=${normParams.balance.mean.toFixed(2)}, std=${normParams.balance.std.toFixed(2)}`);
  logger.info(`logDepositVariance: mean=${normParams.logDepositVariance.mean.toFixed(2)}, std=${normParams.logDepositVariance.std.toFixed(2)}`);
  logger.info(`averageSpend: mean=${normParams.averageSpend.mean.toFixed(2)}, std=${normParams.averageSpend.std.toFixed(2)}`);

  const features = [];
  const labels = { churn: [], dropOff: [], spike: [] };

  rawFeaturesList.forEach((rawFeatures) => {
    const normalizedFeatures = [
      zScoreNormalize(rawFeatures.daysSinceLastLogin, normParams.daysSinceLastLogin.mean, normParams.daysSinceLastLogin.std),
      minMaxNormalize(rawFeatures.engagementScore, 0, 1),
      minMaxNormalize(rawFeatures.activeContests, normParams.activeContests.min, normParams.activeContests.max),
      minMaxNormalize(rawFeatures.recentBets, normParams.recentBets.min, normParams.recentBets.max),
      zScoreNormalize(rawFeatures.balance, normParams.balance.mean, normParams.balance.std),
      zScoreNormalize(rawFeatures.logDepositVariance, normParams.logDepositVariance.mean, normParams.logDepositVariance.std),
      zScoreNormalize(rawFeatures.averageSpend, normParams.averageSpend.mean, normParams.averageSpend.std),
      zScoreNormalize(rawFeatures.gameTime, normParams.gameTime.mean, normParams.gameTime.std),
      zScoreNormalize(rawFeatures.tenure, normParams.tenure.mean, normParams.tenure.std),
      minMaxNormalize(rawFeatures.winRate, 0, 1),
      zScoreNormalize(rawFeatures.bettingFrequency, normParams.bettingFrequency.mean, normParams.bettingFrequency.std),
      zScoreNormalize(rawFeatures.depositRecency, normParams.depositRecency.mean, normParams.depositRecency.std)
    ];

    labels.churn.push((rawFeatures.engagementScore < 0.65 && rawFeatures.daysSinceLastLogin > 4) ? 1 : 0);
    labels.dropOff.push((rawFeatures.engagementScore < 0.7 && rawFeatures.balance < 150) ? 1 : 0);
    labels.spike.push((rawFeatures.depositVariance > 5000 || (rawFeatures.averageSpend > 15 && rawFeatures.recentBets > 2) || rawFeatures.gameTime > 300) ? 1 : 0);

    features.push(normalizedFeatures);
  });

  logger.info(`Churn positive cases: ${labels.churn.filter(l => l === 1).length}`);
  logger.info(`Drop-off positive cases: ${labels.dropOff.filter(l => l === 1).length}`);
  logger.info(`Spike positive cases: ${labels.spike.filter(l => l === 1).length}`);

  let churnFeatures = features.map(f => [f[0], f[1], f[2], f[4]]); // daysSinceLastLogin, engagementScore, activeContests, balance
  let churnLabels = labels.churn;
  let dropOffFeatures = features.map(f => [f[1], f[4], f[6], f[11]]); // engagementScore, balance, averageSpend, depositRecency
  let dropOffLabels = labels.dropOff;
  let spikeFeatures = features.map(f => [f[5], f[6], f[7], f[3]]); // logDepositVariance, averageSpend, gameTime, recentBets
  let spikeLabels = labels.spike;

  if (labels.churn.filter(l => l === 1).length > 0) {
    ({ features: churnFeatures, labels: churnLabels } = smote(churnFeatures, labels.churn, 14));
  }
  if (labels.dropOff.filter(l => l === 1).length > 0) {
    ({ features: dropOffFeatures, labels: dropOffLabels } = smote(dropOffFeatures, labels.dropOff, 14));
  }
  if (labels.spike.filter(l => l === 1).length > 0) {
    ({ features: spikeFeatures, labels: spikeLabels } = smote(spikeFeatures, labels.spike, 14));
  }

  return {
    features: { churn: churnFeatures, dropOff: dropOffFeatures, spike: spikeFeatures },
    labels: { churn: churnLabels, dropOff: dropOffLabels, spike: spikeLabels },
    normParams
  };
};

const { features, labels, normParams } = prepareTrainingData();

const featureNames = {
  churn: ['daysSinceLastLogin', 'engagementScore', 'activeContests', 'balance'],
  dropOff: ['engagementScore', 'balance', 'averageSpend', 'depositRecency'],
  spike: ['logDepositVariance', 'averageSpend', 'gameTime', 'recentBets']
};

const classWeightsChurn = computeClassWeights(labels.churn);
const classWeightsDropOff = computeClassWeights(labels.dropOff);
const classWeightsSpike = computeClassWeights(labels.spike);

const bestChurnParams = gridSearch(features.churn, labels.churn, classWeightsChurn, 0.4);
const bestDropOffParams = gridSearch(features.dropOff, labels.dropOff, classWeightsDropOff, 0.3);
const bestSpikeParams = gridSearch(features.spike, labels.spike, classWeightsSpike, 0.5);

const churnModel = new LogisticRegression(4, bestChurnParams.learningRate, 5000, bestChurnParams.lambda);
const dropOffModel = new LogisticRegression(4, bestDropOffParams.learningRate, 5000, bestDropOffParams.lambda);
const spikeModel = new LogisticRegression(4, bestSpikeParams.learningRate, 5000, bestSpikeParams.lambda);

churnModel.train(features.churn, labels.churn, classWeightsChurn);
dropOffModel.train(features.dropOff, labels.dropOff, classWeightsDropOff);
spikeModel.train(features.spike, labels.spike, classWeightsSpike);

logger.info('Churn Feature Importance: ' + JSON.stringify(churnModel.getFeatureImportance(featureNames.churn)));
logger.info('Drop-off Feature Importance: ' + JSON.stringify(dropOffModel.getFeatureImportance(featureNames.dropOff)));
logger.info('Spike Feature Importance: ' + JSON.stringify(spikeModel.getFeatureImportance(featureNames.spike)));

const evaluationMetrics = {
  churn: stratifiedKFoldCV(features.churn, labels.churn, 4, bestChurnParams.learningRate, bestChurnParams.lambda, classWeightsChurn, 0.4),
  dropOff: stratifiedKFoldCV(features.dropOff, labels.dropOff, 4, bestDropOffParams.learningRate, bestDropOffParams.lambda, classWeightsDropOff, 0.3),
  spike: stratifiedKFoldCV(features.spike, labels.spike, 4, bestSpikeParams.learningRate, bestSpikeParams.lambda, classWeightsSpike, 0.5)
};

logger.info('Churn Model Performance:');
logger.info(`Accuracy: ${evaluationMetrics.churn.mean.accuracy.toFixed(2)} ± ${evaluationMetrics.churn.std.accuracy.toFixed(2)}`);
logger.info(`Recall: ${evaluationMetrics.churn.mean.recall.toFixed(2)} ± ${evaluationMetrics.churn.std.recall.toFixed(2)}`);
logger.info(`F1 Score: ${evaluationMetrics.churn.mean.f1Score.toFixed(2)} ± ${evaluationMetrics.churn.std.f1Score.toFixed(2)}`);

logger.info('Drop-off Model Performance:');
logger.info(`Accuracy: ${evaluationMetrics.dropOff.mean.accuracy.toFixed(2)} ± ${evaluationMetrics.dropOff.std.accuracy.toFixed(2)}`);
logger.info(`Recall: ${evaluationMetrics.dropOff.mean.recall.toFixed(2)} ± ${evaluationMetrics.dropOff.std.recall.toFixed(2)}`);
logger.info(`F1 Score: ${evaluationMetrics.dropOff.mean.f1Score.toFixed(2)} ± ${evaluationMetrics.dropOff.std.f1Score.toFixed(2)}`);

logger.info('Spike Model Performance:');
logger.info(`Accuracy: ${evaluationMetrics.spike.mean.accuracy.toFixed(2)} ± ${evaluationMetrics.spike.std.accuracy.toFixed(2)}`);
logger.info(`Recall: ${evaluationMetrics.spike.mean.recall.toFixed(2)} ± ${evaluationMetrics.spike.std.recall.toFixed(2)}`);
logger.info(`F1 Score: ${evaluationMetrics.spike.mean.f1Score.toFixed(2)} ± ${evaluationMetrics.spike.std.f1Score.toFixed(2)}`);

// API Endpoints
app.get('/api/users', (req, res) => {
  if (!users) {
    logger.error('No users data available');
    return res.status(500).json({ error: 'No users data available' });
  }
  res.json(users);
});

app.get('/api/user/:id/journey', (req, res) => {
  const user = users.find((u) => u.userId === req.params.id);
  if (!user) {
    logger.error(`User not found: ${req.params.id}`);
    return res.status(404).json({ error: 'User not found' });
  }

  let filteredJourney = user.journey;
  if (req.query.action) {
    filteredJourney = filteredJourney.filter((j) => j.action === req.query.action);
  }
  if (req.query.startDate && req.query.endDate) {
    try {
      const start = new Date(req.query.startDate);
      const end = new Date(req.query.endDate);
      filteredJourney = filteredJourney.filter((j) => {
        const ts = new Date(j.timestamp);
        return ts >= start && ts <= end;
      });
    } catch (error) {
      logger.error(`Invalid date format for user ${req.params.id}: ${error.message}`);
      return res.status(400).json({ error: 'Invalid date format' });
    }
  }

  res.json(filteredJourney);
});

app.post('/api/predict/:userId', (req, res) => {
  const userId = req.params.userId;
  const user = users.find((u) => u.userId === userId);
  if (!user) {
    logger.error(`User not found: ${userId}`);
    return res.status(404).json({ error: 'User not found' });
  }

  try {
    const { normalizedFeatures, rawFeatures } = extractFeatures(user, currentDate, normParams);
    logger.info(`Predicting for user ${userId}: ${JSON.stringify(rawFeatures)}`);

    const churnFeatures = [normalizedFeatures[0], normalizedFeatures[1], normalizedFeatures[2], normalizedFeatures[4]];
    const dropOffFeatures = [normalizedFeatures[1], normalizedFeatures[4], normalizedFeatures[6], normalizedFeatures[11]];
    const spikeFeatures = [normalizedFeatures[5], normalizedFeatures[6], normalizedFeatures[7], normalizedFeatures[3]];

    const churnRisk = churnModel.predictProb(churnFeatures);
    const dropOffRisk = dropOffModel.predictProb(dropOffFeatures);
    const spikeLikelihood = spikeModel.predictProb(spikeFeatures);

    const normalizedGameTime = minMaxNormalize(rawFeatures.gameTime, normParams.gameTime.min, normParams.gameTime.max);
    const gameTimeEngagement = 0.6 * normalizedGameTime + 0.4 * rawFeatures.engagementScore;
    const normalizedTenure = zScoreNormalize(rawFeatures.tenure, normParams.tenure.mean, normParams.tenure.std);
    const ltv = user.totalDeposits * (normalizedTenure > 0 ? normalizedTenure : 1);

    res.json({
      churnRisk: Number(churnRisk.toFixed(3)),
      dropOffRisk: Number(dropOffRisk.toFixed(3)),
      spikeLikelihood: Number(spikeLikelihood.toFixed(3)),
      gameTimeEngagement: Number(gameTimeEngagement.toFixed(3)),
      ltv: Number(ltv.toFixed(2)),
    });
  } catch (error) {
    logger.error(`Prediction error for user ${userId}: ${error.message}`);
    res.status(500).json({ error: 'Prediction error' });
  }
});

app.post('/api/predict-custom', (req, res) => {
  const {
    engagementScore,
    gameTime,
    averageSpend,
    daysSinceLastLogin = 0,
    activeContests = 0,
    recentBets = 0,
    depositVariance = 0,
    tenure = 30,
    wins = 0,
    bettingHistoryLength = 0,
    lastDepositDays = 30,
    totalDeposits = 0,
    totalWithdrawals = 0
  } = req.body;

  if (!engagementScore || !gameTime || !averageSpend) {
    logger.error('Missing required fields in custom prediction');
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const validatedEngagementScore = Math.max(0, Math.min(1, parseFloat(engagementScore) || 0.7));
    const validatedGameTime = Math.max(0, parseFloat(gameTime) || 200);
    const validatedAverageSpend = Math.max(0, parseFloat(averageSpend) || 10);
    const validatedDaysSinceLastLogin = Math.max(0, parseFloat(daysSinceLastLogin));
    const validatedActiveContests = Math.max(0, parseInt(activeContests));
    const validatedRecentBets = Math.max(0, parseInt(recentBets));
    const validatedDepositVariance = Math.max(0, parseFloat(depositVariance));
    const validatedLogDepositVariance = validatedDepositVariance > 0 ? Math.log10(validatedDepositVariance) : 0;
    const validatedTenure = Math.max(0, parseFloat(tenure));
    const validatedWinRate = wins / (validatedTenure / 7 || 1);
    const validatedBettingFrequency = bettingHistoryLength / (validatedTenure / 7 || 1);
    const validatedDepositRecency = Math.max(0, parseFloat(lastDepositDays));
    const validatedBalance = totalDeposits - totalWithdrawals;

    const normalizedFeatures = [
      zScoreNormalize(validatedDaysSinceLastLogin, normParams.daysSinceLastLogin.mean, normParams.daysSinceLastLogin.std),
      minMaxNormalize(validatedEngagementScore, 0, 1),
      minMaxNormalize(validatedActiveContests, normParams.activeContests.min, normParams.activeContests.max),
      minMaxNormalize(validatedRecentBets, normParams.recentBets.min, normParams.recentBets.max),
      zScoreNormalize(validatedBalance, normParams.balance.mean, normParams.balance.std),
      zScoreNormalize(validatedLogDepositVariance, normParams.logDepositVariance.mean, normParams.logDepositVariance.std),
      zScoreNormalize(validatedAverageSpend, normParams.averageSpend.mean, normParams.averageSpend.std),
      zScoreNormalize(validatedGameTime, normParams.gameTime.mean, normParams.gameTime.std),
      zScoreNormalize(validatedTenure, normParams.tenure.mean, normParams.tenure.std),
      minMaxNormalize(validatedWinRate, 0, 1),
      zScoreNormalize(validatedBettingFrequency, normParams.bettingFrequency.mean, normParams.bettingFrequency.std),
      zScoreNormalize(validatedDepositRecency, normParams.depositRecency.mean, normParams.depositRecency.std)
    ];

    const churnFeatures = [normalizedFeatures[0], normalizedFeatures[1], normalizedFeatures[2], normalizedFeatures[4]];
    const dropOffFeatures = [normalizedFeatures[1], normalizedFeatures[4], normalizedFeatures[6], normalizedFeatures[11]];
    const spikeFeatures = [normalizedFeatures[5], normalizedFeatures[6], normalizedFeatures[7], normalizedFeatures[3]];

    const churnRisk = churnModel.predictProb(churnFeatures);
    const dropOffRisk = dropOffModel.predictProb(dropOffFeatures);
    const spikeLikelihood = spikeModel.predictProb(spikeFeatures);

    const normalizedGameTime = minMaxNormalize(validatedGameTime, normParams.gameTime.min, normParams.gameTime.max);
    const gameTimeEngagement = 0.6 * normalizedGameTime + 0.4 * validatedEngagementScore;
    const normalizedTenure = zScoreNormalize(validatedTenure, normParams.tenure.mean, normParams.tenure.std);
    const ltv = totalDeposits * (normalizedTenure > 0 ? normalizedTenure : 1);

    res.json({
      churnRisk: Number(churnRisk.toFixed(3)),
      dropOffRisk: Number(dropOffRisk.toFixed(3)),
      spikeLikelihood: Number(spikeLikelihood.toFixed(3)),
      gameTimeEngagement: Number(gameTimeEngagement.toFixed(3)),
      ltv: Number(ltv.toFixed(2)),
    });
  } catch (error) {
    logger.error(`Custom prediction error: ${error.message}`);
    res.status(400).json({ error: 'Invalid input data' });
  }
});

app.get('/api/model-evaluation', (req, res) => {
  res.json({
    churn: {
      mean: {
        accuracy: evaluationMetrics.churn.mean.accuracy.toFixed(3),
        precision: evaluationMetrics.churn.mean.precision.toFixed(2),
        recall: evaluationMetrics.churn.mean.recall.toFixed(2),
        f1Score: evaluationMetrics.churn.mean.f1Score.toFixed(2),
        rocAuc: evaluationMetrics.churn.mean.auc.toFixed(3),
      },
      std: {
        accuracy: evaluationMetrics.churn.std.accuracy.toFixed(3),
        precision: evaluationMetrics.churn.std.precision.toFixed(2),
        recall: evaluationMetrics.churn.std.recall.toFixed(2),
        f1Score: evaluationMetrics.churn.std.f1Score.toFixed(2),
        rocAuc: evaluationMetrics.churn.std.auc.toFixed(3),
      }
    },
    dropOff: {
      mean: {
        accuracy: evaluationMetrics.dropOff.mean.accuracy.toFixed(3),
        precision: evaluationMetrics.dropOff.mean.precision.toFixed(2),
        recall: evaluationMetrics.dropOff.mean.recall.toFixed(2),
        f1Score: evaluationMetrics.dropOff.mean.f1Score.toFixed(2),
        rocAuc: evaluationMetrics.dropOff.mean.auc.toFixed(3),
      },
      std: {
        accuracy: evaluationMetrics.dropOff.std.accuracy.toFixed(3),
        precision: evaluationMetrics.dropOff.std.precision.toFixed(2),
        recall: evaluationMetrics.dropOff.std.recall.toFixed(2),
        f1Score: evaluationMetrics.dropOff.std.f1Score.toFixed(2),
        rocAuc: evaluationMetrics.dropOff.std.auc.toFixed(3),
      }
    },
    spike: {
      mean: {
        accuracy: evaluationMetrics.spike.mean.accuracy.toFixed(3),
        precision: evaluationMetrics.spike.mean.precision.toFixed(2),
        recall: evaluationMetrics.spike.mean.recall.toFixed(2),
        f1Score: evaluationMetrics.spike.mean.f1Score.toFixed(2),
        rocAuc: evaluationMetrics.spike.mean.auc.toFixed(3),
      },
      std: {
        accuracy: evaluationMetrics.spike.std.accuracy.toFixed(3),
        precision: evaluationMetrics.spike.std.precision.toFixed(2),
        recall: evaluationMetrics.spike.std.recall.toFixed(2),
        f1Score: evaluationMetrics.spike.std.f1Score.toFixed(2),
        rocAuc: evaluationMetrics.spike.std.auc.toFixed(3),
      }
    }
  });
});

app.get('/api/insights', (req, res) => {
  const userId = req.query.userId;
  const user = users.find((u) => u.userId === userId);
  if (!user) {
    logger.error(`User not found for insights: ${userId}`);
    return res.status(404).json({ error: 'User not found' });
  }

  try {
    const { normalizedFeatures } = extractFeatures(user, currentDate, normParams);
    const churnFeatures = [normalizedFeatures[0], normalizedFeatures[1], normalizedFeatures[2], normalizedFeatures[4]];
    const userChurnRisk = churnModel.predictProb(churnFeatures);

    const highChurnUsers = users.reduce((count, u) => {
      const { normalizedFeatures } = extractFeatures(u, currentDate, normParams);
      const churnFeatures = [normalizedFeatures[0], normalizedFeatures[1], normalizedFeatures[2], normalizedFeatures[4]];
      const churnRisk = churnModel.predictProb(churnFeatures);
      return churnRisk > 0.5 ? count + 1 : count;
    }, 0);

    const recommendation = userChurnRisk > 0.5
      ? `High churn risk for ${user.username} at ${currentDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}. Offer promotions for ${
          user.favoriteTeams?.join(', ') || 'favorite teams'
        } or bonus credits.`
      : `Low churn risk for ${user.username} at ${currentDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}. Maintain engagement with team-based contests.`;

    res.json({ recommendation, highChurnUsers });
  } catch (error) {
    logger.error(`Insight generation error for user ${userId}: ${error.message}`);
    res.status(500).json({ error: 'Insight generation error' });
  }
});

app.get('/api/team-popularity', (req, res) => {
  const teamCounts = {};
  users.forEach((u) => {
    (u.favoriteTeams || []).forEach((team) => {
      teamCounts[team] = (teamCounts[team] || 0) + 1;
    });
  });
  const teamPopularity = Object.entries(teamCounts).map(([team, count]) => ({ team, count }));
  res.json(teamPopularity);
});

app.get('/api/user/:id/financial-trends', (req, res) => {
  const user = users.find((u) => u.userId === req.params.id);
  if (!user) {
    logger.error(`User not found for financial trends: ${req.params.id}`);
    return res.status(404).json({ error: 'User not found' });
  }

  try {
    const dates = [];
    const deposits = [];
    const withdrawals = [];
    const startDate = new Date(user.registrationDate);
    const endDate = currentDate;

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d).toISOString().split('T')[0]);
      const deposit = user.journey.find(
        (j) => j.action === 'deposit' && new Date(j.timestamp).toISOString().split('T')[0] === dates[dates.length - 1]
      )?.amount || 0;
      const withdrawal = user.journey.find(
        (j) => j.action === 'withdrawal_request' && new Date(j.timestamp).toISOString().split('T')[0] === dates[dates.length - 1]
      )?.amount || 0;
      deposits.push(deposit);
      withdrawals.push(withdrawal);
    }

    const netActivity = deposits.map((d, i) => d - withdrawals[i]);

    const depositEvents = user.journey.filter((j) => j.action === 'deposit');
    const withdrawalEvents = user.journey.filter((j) => j.action === 'withdrawal_request');
    const avgDeposit = depositEvents.length ? depositEvents.reduce((sum, j) => sum + j.amount, 0) / depositEvents.length : 0;
    const avgWithdrawal = withdrawalEvents.length
      ? withdrawalEvents.reduce((sum, j) => sum + j.amount, 0) / withdrawalEvents.length : 0;

    const totalBettingSpend = user.bettingHistory.reduce((sum, b) => sum + b.amount, 0);
    const bettingSpendRatio = user.balance + totalBettingSpend > 0 ? totalBettingSpend / (totalBettingSpend + user.balance) : 0;

    const registrationDate = new Date(user.registrationDate);
    const timeSpanMonths = (currentDate - registrationDate) / (1000 * 60 * 60 * 24 * 30);
    const depositFrequency = depositEvents.length / timeSpanMonths;
    const withdrawalFrequency = withdrawalEvents.length / timeSpanMonths;

    const favoriteTeamFinancials = { deposits: 0, withdrawals: 0 };
    const nonFavoriteTeamFinancials = { deposits: 0, withdrawals: 0 };
    const contestTimestamps = user.journey
      .filter((j) => j.action === 'joined_contest')
      .map((j) => ({ timestamp: new Date(j.timestamp), contestId: j.contestId }));
    user.journey.forEach((j) => {
      if (j.action === 'deposit' || j.action === 'withdrawal_request') {
        const isNearContest = contestTimestamps.some(
          (ct) => Math.abs(new Date(j.timestamp) - ct.timestamp) < 24 * 60 * 60 * 1000
        );
        if (isNearContest) {
          favoriteTeamFinancials[j.action === 'deposit' ? 'deposits' : 'withdrawals'] += j.amount;
        } else {
          nonFavoriteTeamFinancials[j.action === 'deposit' ? 'deposits' : 'withdrawals'] += j.amount;
        }
      }
    });

    const financialInsights = [
      `Total deposits of ₹${user.totalDeposits.toFixed(2)} with an average of ₹${avgDeposit.toFixed(2)} per deposit as of ${currentDate.toLocaleString(
        'en-IN',
        { timeZone: 'Asia/Kolkata' }
      )}.`,
      `Total withdrawals of ₹${user.totalWithdrawals.toFixed(2)} with an average of ₹${avgWithdrawal.toFixed(2)} per withdrawal`,
      `Betting spend of ₹${totalBettingSpend.toFixed(2)} is ${(bettingSpendRatio * 100).toFixed(1)}% of total funds.`,
      `Net contribution of ₹${(user.totalDeposits - user.totalWithdrawals).toFixed(2)} suggests ${
        user.totalDeposits > user.totalWithdrawals ? 'active participation' : 'potential withdrawal risk'
      }.`,
      user.balance < user.averageSpend
        ? 'Low balance warning: Consider deposit incentives.'
        : 'Healthy balance for continued engagement.',
    ];

    res.json({
      dates,
      deposits,
      withdrawals,
      netActivity,
      avgDeposit,
      avgWithdrawal,
      totalBettingSpend,
      bettingSpendRatio,
      depositFrequency,
      withdrawalFrequency,
      favoriteTeamFinancials,
      nonFavoriteTeamFinancials,
      financialInsights,
    });
  } catch (error) {
    logger.error(`Financial trends error for user ${req.params.id}: ${error.message}`);
    res.status(500).json({ error: 'Financial trends error' });
  }
});

app.listen(5000, () => logger.info(`Server running on port 5000 at ${currentDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`));