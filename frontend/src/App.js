import React, { useEffect, useState, useRef } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import GaugeChart from 'react-gauge-chart';
import axios from 'axios';
import visionLogo from './assets/vision.png';
import Vision11Documentation from './Document';
import './index.css';

// Register Chart.js components and zoom plugin
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, zoomPlugin);

// Base API URL from environment variable
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Chart.js custom theme with zoom for financial trends
const chartOptions = {
  plugins: {
    legend: {
      labels: {
        color: '#e0e0e0',
        font: { size: 14, family: 'Inter, sans-serif' },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleFont: { size: 14 },
      bodyFont: { size: 12 },
    },
    title: { display: false },
    zoom: {
      zoom: {
        wheel: { enabled: true },
        pinch: { enabled: true },
        mode: 'xy',
      },
      pan: {
        enabled: true,
        mode: 'xy',
      },
      limits: {
        x: { min: 'original', max: 'original' },
        y: { min: 'original', max: 'original' },
      },
    },
  },
  scales: {
    x: { ticks: { color: '#a0a0a0', font: { size: 12 } }, grid: { display: false } },
    y: { ticks: { color: '#a0a0a0', font: { size: 12 } }, grid: { color: 'rgba(255,255,255,0.1)' } },
  },
  maintainAspectRatio: false,
};

// Default chart options for other charts (without zoom)
const defaultChartOptions = {
  plugins: {
    legend: {
      labels: {
        color: '#e0e0e0',
        font: { size: 14, family: 'Inter, sans-serif' },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleFont: { size: 14 },
      bodyFont: { size: 12 },
    },
    title: { display: false },
  },
  scales: {
    x: { ticks: { color: '#a0a0a0', font: { size: 12 } }, grid: { display: false } },
    y: { ticks: { color: '#a0a0a0', font: { size: 12 } }, grid: { color: 'rgba(255,255,255,0.1)' } },
  },
  maintainAspectRatio: false,
};

// Custom Timeline Component
const Timeline = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <article className="p-4 bg-gray-900/70 rounded-lg shadow-sm border border-gray-700 text-center">
          <p className="text-gray-400">No journey data available.</p>
        </article>
      </div>
    );
  }

  const getEventColor = (action) => {
    switch (action) {
      case 'login':
        return 'bg-teal-600/30 border-teal-500';
      case 'placed_bet':
        return 'bg-purple-600/30 border-purple-500';
      case 'deposit':
        return 'bg-green-600/30 border-green-500';
      case 'viewed_leaderboard':
        return 'bg-blue-600/30 border-blue-500';
      case 'withdrawal_request':
        return 'bg-red-600/30 border-red-500';
      default:
        return 'bg-gray-900/70 border-gray-700';
    }
  };

  return (
    <div className="flex flex-row space-x-4">
      {events.map((event, index) => (
        <article
          key={index}
          className={`flex-shrink-0 w-60 sm:w-64 p-4 rounded-lg shadow-sm border transition-all duration-200 group hover:shadow-md hover:scale-105 ${getEventColor(event.action)}`}
          aria-label={`${event.action.replace('_', ' ')} event at ${new Date(event.timestamp).toLocaleString()}`}
        >
          <p className="text-xs text-gray-400 mb-1">{new Date(event.timestamp).toLocaleString()}</p>
          <p className="text-base font-semibold capitalize text-white mb-2">{event.action.replace('_request', '').replace('_', ' ')}</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            {event.amount && `Amount: ₹${event.amount}`}
            {event.contestId && ` Contest: ${event.contestId}`}
            {event.rank && ` Rank: ${event.rank}`}
            {event.message && ` ${event.message}`}
          </p>
        </article>
      ))}
    </div>
  );
};

// InsightsCards Component
const InsightsCards = ({ insights }) => {
  const insightLines = insights
    ? typeof insights === 'string'
      ? insights.split('\n').map(line => line.trim()).filter(line => line.length > 0)
      : insights.filter(line => line.length > 0)
    : [];

  const colors = [
    'bg-teal-600/30 border-teal-500',
    'bg-purple-600/30 border-purple-500',
    'bg-blue-600/30 border-blue-500',
    'bg-green-600/30 border-green-500',
    'bg-red-600/30 border-red-500',
    'bg-yellow-600/30 border-yellow-500',
    'bg-cyan-600/30 border-cyan-500',
  ];

  const getIcon = (insight) => {
    if (insight.includes('churn risk')) return '📊';
    if (insight.includes('net contribution')) return '💰';
    if (insight.includes('session time') || insight.includes('Total deposits')) return '⏳';
    if (insight.includes('bets') || insight.includes('Betting spend')) return '🎰';
    if (insight.includes('Win rate')) return '🏆';
    if (insight.includes('Last login')) return '🕒';
    if (insight.includes('Peak activity')) return '📈';
    if (insight.includes('Engages heavily')) return '🏏';
    if (insight.includes('Referred')) return '👥';
    if (insight.includes('balance')) return '💸';
    return 'ℹ️';
  };

  if (insightLines.length === 0) {
    return (
      <article className="p-4 bg-gray-900/70 rounded-lg shadow-sm border border-gray-700 text-center">
        <p className="text-gray-400">No insights available.</p>
      </article>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {insightLines.map((insight, index) => (
        <article
          key={index}
          className={`p-4 rounded-lg shadow-sm border transition-all duration-200 group hover:shadow-md hover:scale-105 ${colors[index % colors.length]}`}
          aria-label={`Insight: ${insight}`}
        >
          <div className="flex items-start space-x-3">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white ${colors[index % colors.length].split(' ')[0].replace('bg-', 'bg-')}`}>
              {getIcon(insight)}
            </div>
            <p className="text-sm font-medium text-white leading-relaxed">
              {insight.replace(/\$/g, '₹')}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
};

function App() {
  const [users, setUsers] = useState([]);
  const [userPredictions, setUserPredictions] = useState({});
  const [journey, setJourney] = useState([]);
  const [predictions, setPredictions] = useState({});
  const [insights, setInsights] = useState('');
  const [teamPopularity, setTeamPopularity] = useState([]);
  const [financialTrends, setFinancialTrends] = useState({});
  const [activeTab, setActiveTab] = useState('journey');
  const [selectedUser, setSelectedUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [journeyFilter, setJourneyFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [engagementScoreInput, setEngagementScoreInput] = useState('');
  const [gameTimeInput, setGameTimeInput] = useState('');
  const [averageSpendInput, setAverageSpendInput] = useState('');
  const [showDocumentation, setShowDocumentation] = useState(false);
  const financialChartRef = useRef(null);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handleZoomIn = () => {
    const chart = financialChartRef.current;
    if (chart) {
      chart.zoomScale('x', { min: chart.scales.x.min * 0.8, max: chart.scales.x.max * 0.8 }, 'default');
      chart.zoomScale('y', { min: chart.scales.y.min * 0.8, max: chart.scales.y.max * 0.8 }, 'default');
    }
  };

  const handleZoomOut = () => {
    const chart = financialChartRef.current;
    if (chart) {
      chart.zoomScale('x', { min: chart.scales.x.min * 1.2, max: chart.scales.x.max * 1.2 }, 'default');
      chart.zoomScale('y', { min: chart.scales.y.min * 1.2, max: chart.scales.y.max * 1.2 }, 'default');
    }
  };

  const handleResetZoom = () => {
    const chart = financialChartRef.current;
    if (chart) {
      chart.resetZoom();
    }
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    axios
      .get(`${API_URL}/api/users`)
      .then(async (res) => {
        if (isMounted) {
          const usersData = res.data;
          setUsers(usersData);
          if (usersData.length > 0) {
            const firstUser = usersData[0];
            setSelectedUser(firstUser.userId);
            setEngagementScoreInput(firstUser.engagementScore || '');
            setGameTimeInput(firstUser.gameTime || '');
            setAverageSpendInput(firstUser.averageSpend || '');
            setDateRange({
              start: firstUser.registrationDate || '2024-12-01',
              end: formatDate(new Date()),
            });

            // Fetch predictions for all users using the new endpoint
            const predictionsPromises = usersData.map((user) =>
              axios
                .post(`${API_URL}/api/predict/${user.userId}`)
                .then((res) => ({ userId: user.userId, predictions: res.data }))
                .catch(() => ({ userId: user.userId, predictions: {} }))
            );
            const predictionsResults = await Promise.all(predictionsPromises);
            const predictionsMap = predictionsResults.reduce((acc, { userId, predictions }) => {
              acc[userId] = predictions;
              return acc;
            }, {});
            setUserPredictions(predictionsMap);
          }
        }
      })
      .catch(() => {
        if (isMounted) setError('Failed to fetch users data');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    axios
      .get(`${API_URL}/api/team-popularity`)
      .then((res) => {
        if (isMounted) setTeamPopularity(res.data);
      })
      .catch(() => {
        if (isMounted) setError('Failed to fetch team popularity data');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (selectedUser) fetchJourneyAndInsights(selectedUser);
  }, [selectedUser, journeyFilter, dateRange]);

  const fetchJourneyAndInsights = (userId) => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const params = {
      action: journeyFilter !== 'all' ? journeyFilter : undefined,
      startDate: dateRange.start || undefined,
      endDate: dateRange.end || undefined,
    };

    axios
      .get(`${API_URL}/api/user/${userId}/journey`, { params })
      .then((res) => {
        if (isMounted) {
          const formattedJourney = res.data.map((j) => ({
            ...j,
            timestamp: j.timestamp instanceof Date ? j.timestamp : new Date(j.timestamp),
          }));
          setJourney(formattedJourney);
        }
      })
      .catch(() => {
        if (isMounted) setError('Failed to fetch user journey');
      });

    axios
      .get(`${API_URL}/api/insights`, { params: { userId } })
      .then((res) => {
        if (isMounted) {
          const user = users.find((u) => u.userId === userId);
          if (!user) return;

          const totalSessionTime = journey.reduce((sum, j) => sum + (j.duration || 0), 0) / 60;
          const betCount = user.bettingHistory?.length || 0;
          const avgBetAmount = user.bettingHistory?.length
            ? (user.bettingHistory.reduce((sum, b) => sum + b.amount, 0) / user.bettingHistory.length).toFixed(2)
            : 0;
          const winRate = user.bettingHistory?.length
            ? ((user.bettingHistory.filter((b) => b.outcome === 'win').length / user.bettingHistory.length) * 100).toFixed(1)
            : 0;
          const hoursSinceLastLogin = ((new Date() - new Date(user.lastLogin)) / 3600000).toFixed(1);
          const peakActivityHour = journey.length
            ? Math.max(...journey.map((j) => new Date(j.timestamp).getHours()))
            : 'No data';

          const personalizedInsights = `
            ${res.data.recommendation || 'No specific recommendations.'}
            User ${user.username} (${userId}) has a net contribution of ₹${(user.totalDeposits - user.totalWithdrawals).toFixed(2)}.
            Total session time: ${totalSessionTime.toFixed(1)} minutes.
            Placed ${betCount} bets with an average bet amount of ₹${avgBetAmount}.
            Win rate: ${winRate}%.
            Last login was ${hoursSinceLastLogin} hours ago.
            Peak activity around ${peakActivityHour}:00.
            Engages heavily with ${user.favoriteTeams?.join(', ') || 'no teams'}.
            ${user.referredUsers > 0 ? `Referred ${user.referredUsers} users, indicating strong loyalty.` : 'No referrals yet.'}
          `;
          setInsights(personalizedInsights.trim());
        }
      })
      .catch(() => {
        if (isMounted) setError('Failed to fetch insights');
      });

    axios
      .get(`${API_URL}/api/user/${userId}/financial-trends`)
      .then((res) => {
        if (isMounted) setFinancialTrends(res.data);
      })
      .catch(() => {
        if (isMounted) setError('Failed to fetch financial trends');
      });

    // Update predictions based on selected user
    const selectedUserData = users.find((u) => u.userId === userId) || {};
    axios
      .post(`${API_URL}/api/predict/${userId}`)
      .then((res) => setPredictions(res.data))
      .catch(() => setError('Failed to fetch predictions'));

    return () => {
      isMounted = false;
    };
  };

  const predictAll = (score, gameTime, spend, userId) => {
    const validatedScore = Math.max(0, Math.min(1, parseFloat(score) || 0.7));
    const validatedGameTime = Math.max(0, parseFloat(gameTime) || 120);
    const validatedSpend = Math.max(0, parseFloat(spend) || 50);
    axios
      .post(`${API_URL}/api/predict/${userId}`)
      .then((res) => setPredictions(res.data))
      .catch(() => setError('Failed to fetch predictions'));
  };

  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);
    const user = users.find((u) => u.userId === userId);
    if (user) {
      setEngagementScoreInput(user.engagementScore || '');
      setGameTimeInput(user.gameTime || '');
      setAverageSpendInput(user.averageSpend || '');
      setDateRange({
        start: user.registrationDate || '2024-12-01',
        end: formatDate(new Date()),
      });
    }
  };

  const exportInsights = () => {
    const user = users.find((u) => u.userId === selectedUser);
    if (!user) {
      setError('No user selected for export');
      return;
    }

    const csvContent = [
      ['User ID', 'Username', 'Churn Risk', 'LTV', 'Total Points', 'Win Rate', 'Insights'],
      [
        user.userId,
        user.username,
        userPredictions[user.userId]?.churnRisk?.toFixed(2) || 'N/A',
        userPredictions[user.userId]?.ltv?.toFixed(2) || 'N/A',
        user.totalPoints || 0,
        user.bettingHistory?.length
          ? ((user.bettingHistory.filter((b) => b.outcome === 'win').length / user.bettingHistory.length) * 100).toFixed(1)
          : 0,
        insights.replace(/\n/g, ' ').replace(/"/g, '""'),
      ],
    ]
      .map((row) => `"${row.join('","')}"`)
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${user.username}_insights.csv`;
    link.click();
  };

  const selectedUserData = users.find((u) => u.userId === selectedUser) || {};

  const churnData = {
    labels: users.map((u) => u.username),
    datasets: [
      {
        label: 'Churn Risk (%)',
        data: users.map((u) => (userPredictions[u.userId]?.churnRisk * 100 || 0).toFixed(1)),
        backgroundColor: users.map((u) => (userPredictions[u.userId]?.churnRisk > 0.5 ? 'rgba(255, 0, 0, 0.4)' : 'rgba(45, 212, 191, 0.4)')),
        borderColor: users.map((u) => (userPredictions[u.userId]?.churnRisk > 0.5 ? 'rgba(255, 0, 0, 1)' : 'rgba(45, 212, 191, 1)')),
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  const winLossData = {
    labels: ['Wins', 'Losses'],
    datasets: [
      {
        data: [
          selectedUserData.bettingHistory?.filter((b) => b.outcome === 'win').length || 0,
          selectedUserData.bettingHistory?.filter((b) => b.outcome === 'loss').length || 0,
        ],
        backgroundColor: ['#2DD4BF', '#F87171'],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  const teamPopularityData = {
    labels: teamPopularity.map((t) => t.team),
    datasets: [
      {
        label: 'Number of Fans',
        data: teamPopularity.map((t) => t.count),
        backgroundColor: 'rgba(45, 212, 191, 0.4)',
        borderColor: 'rgba(45, 212, 191, 1)',
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  const financialTrendsData = {
    labels: financialTrends.dates || [],
    datasets: [
      {
        label: 'Deposits (₹)',
        data: financialTrends.deposits || [],
        borderColor: '#2DD4BF',
        backgroundColor: 'rgba(45, 212, 191, 0.2)',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Withdrawals (₹)',
        data: financialTrends.withdrawals || [],
        borderColor: '#F87171',
        backgroundColor: 'rgba(248, 113, 113, 0.2)',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Net Activity (₹)',
        data: financialTrends.netActivity || [],
        borderColor: (ctx) => (ctx.dataset.data[ctx.dataIndex] >= 0 ? '#34D399' : '#EF4444'),
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const bettingSpendData = {
    labels: ['Betting Spend', 'Remaining Balance'],
    datasets: [
      {
        data: [financialTrends.totalBettingSpend || 0, selectedUserData.balance || 0],
        backgroundColor: ['#F87171', '#2DD4BF'],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  const timelineEvents = journey.map((j) => ({
    timestamp: j.timestamp,
    action: j.action,
    amount: j.amount,
    contestId: j?.contestId || '',
    rank: j.rank,
    message: j.message,
  }));

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="sticky top-0 bg-gray-900 backdrop-blur-md z-10 py-4 mb-8 rounded-xl shadow-lg border border-gray-700">
          <div className="flex flex-row items-center justify-between px-4">
            <div className="flex flex-row items-center space-x-4">
              <img src={visionLogo} alt="Vision11 Logo" className="h-auto" style={{ width: '100px' }} />
              <h1 className="text-2xl sm:text-4xl md:text-4xl font-bold text-red-500">Analytics</h1>
            </div>
            <button
              onClick={() => setShowDocumentation(!showDocumentation)}
              className="px-4 py-2 rounded-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500"
              aria-label={showDocumentation ? 'Hide documentation' : 'Show documentation'}
            >
              {showDocumentation ? '🔙' : 'ℹ️'}
            </button>
          </div>
          {showDocumentation && (
            <div className="mt-4 px-4 pb-4">
              <Vision11Documentation />
            </div>
          )}
        </header>
        {error && (
          <div className="flex justify-between items-center bg-red-500/30 border border-red-500 text-red-500 p-4 rounded-lg mb-6">
            <p>{error}</p>
            <button onClick={() => setError(null)} className="text-sm hover:text-white">Dismiss</button>
          </div>
        )}

        {/* Filters Section */}
        <div className="mb-8 bg-gray-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Select User</label>
              <select
                value={selectedUser}
                onChange={handleUserChange}
                className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                disabled={users.length === 0}
                aria-label="Select user"
              >
                {users.length === 0 ? (
                  <option value="">No users available</option>
                ) : (
                  users.map((user) => (
                    <option key={user.userId} value={user.userId}>
                      {user.username} ({user.userId})
                    </option>
                  ))
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Start Date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                aria-label="Start date"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">End Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                aria-label="End date"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={exportInsights}
                className="w-full p-3 rounded-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition-all disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                disabled={!selectedUser}
                aria-label="Export insights as CSV"
              >
                Export Insights
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-gray-800/50 backdrop-blur-md p-2 rounded-xl border border-gray-700">
          {['journey', 'analytics', 'financial', 'teams'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 px-4 py-3 font-semibold capitalize rounded-lg transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-red-500 text-white shadow-md'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => setActiveTab(tab)}
              aria-selected={activeTab === tab}
              role="tab"
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="transition-opacity duration-300">
          {activeTab === 'journey' && (
            <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">User Details</h2>
                {selectedUser ? (
                  <div className="bg-gray-900/70 rounded-lg shadow-sm border border-gray-700 p-4 flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold">
                      {selectedUserData.username ? selectedUserData.username[0].toUpperCase() : '?'}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <p className="text-sm text-gray-400">
                        <span className="font-medium text-white">User ID:</span> {selectedUserData.userId || 'N/A'}
                      </p>
                      <p className="text-sm text-gray-400">
                        <span className="font-medium text-white">Username:</span> {selectedUserData.username || 'N/A'}
                      </p>
                      <p className="text-sm text-gray-400">
                        <span className="font-medium text-white">Email:</span> {selectedUserData.email || 'N/A'}
                      </p>
                      <p className="text-sm text-gray-400">
                        <span className="font-medium text-white">Registration Date:</span>{' '}
                        {selectedUserData.registrationDate
                          ? new Date(selectedUserData.registrationDate).toLocaleDateString()
                          : 'N/A'}
                      </p>
                      <p className="text-sm text-gray-400">
                        <span className="font-medium text-white">Total Deposits:</span>{' '}
                        {selectedUserData.totalDeposits ? `₹${selectedUserData.totalDeposits.toFixed(2)}` : '₹0.00'}
                      </p>
                      <p className="text-sm text-gray-400">
                        <span className="font-medium text-white">Total Withdrawals:</span>{' '}
                        {selectedUserData.totalWithdrawals ? `₹${selectedUserData.totalWithdrawals.toFixed(2)}` : '₹0.00'}
                      </p>
                      <p className="text-sm text-gray-400">
                        <span className="font-medium text-white">Balance:</span>{' '}
                        {selectedUserData.balance ? `₹${selectedUserData.balance.toFixed(2)}` : '₹0.00'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 text-center">No user selected.</p>
                )}
              </div>

              <h2 className="text-2xl font-semibold mb-4">User Journey</h2>
              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-1">Filter Actions</label>
                <select
                  value={journeyFilter}
                  onChange={(e) => setJourneyFilter(e.target.value)}
                  className="w-full sm:w-1/3 p-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  aria-label="Filter journey actions"
                >
                  <option value="all">All Actions</option>
                  <option value="login">Login</option>
                  <option value="placed_bet">Placed Bet</option>
                  <option value="deposit">Deposit</option>
                  <option value="viewed_leaderboard">Viewed Leaderboard</option>
                  <option value="withdrawal_request">Withdrawal</option>
                </select>
              </div>
              <div className="h-[250px] sm:h-[300px] overflow-x-auto overflow-y-hidden timeline-container flex flex-row gap-4 pb-6">
                <Timeline events={timelineEvents} />
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Insights</h3>
                <InsightsCards insights={insights} />
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
                <h2 className="text-2xl font-semibold mb-4">Churn Risk Comparison</h2>
                <div className="h-[300px] sm:h-[400px]">
                  {users.length > 0 ? (
                    <Bar data={churnData} options={defaultChartOptions} />
                  ) : (
                    <p className="text-gray-400 text-center py-4">No data available.</p>
                  )}
                </div>
                <div className="mt-6">
                  <p className="text-sm text-gray-400 mb-2">Selected User Churn Risk</p>
                  <div className="w-full flex justify-center">
                    <GaugeChart
                      id="churn-gauge"
                      nrOfLevels={20}
                      percent={userPredictions[selectedUser]?.churnRisk || 0}
                      textColor="#e0e0e0"
                      colors={['#00FF00', '#FFFF00', '#FF0000']}
                      arcWidth={0.3}
                      style={{ width: '400px', height: 'auto' }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700">
                <h2 className="text-2xl font-semibold mb-4">Win/Loss Ratio</h2>
                <div className="h-[300px] sm:h-[400px]">
                  {winLossData.datasets[0].data.some((v) => v > 0) ? (
                    <Pie data={winLossData} options={defaultChartOptions} />
                  ) : (
                    <p className="text-gray-400 text-center py-4">No win/loss data available.</p>
                  )}
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700">
                <h2 className="text-2xl font-semibold mb-4">Predictions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Engagement Score (0-1)</label>
                    <div className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 text-white">
                      {engagementScoreInput ? parseFloat(engagementScoreInput).toFixed(2) : '0.70'}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Game Time (min)</label>
                    <div className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 text-white">
                      {gameTimeInput ? parseFloat(gameTimeInput).toFixed(0) : '120'}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Avg Spend (₹)</label>
                    <div className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 text-white">
                      {averageSpendInput ? parseFloat(averageSpendInput).toFixed(2) : '50.00'}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {['churnRisk', 'dropOffRisk', 'spikeLikelihood', 'gameTimeEngagement', 'ltv'].map((key) => (
                    <div key={key} className="p-4 bg-gray-900/70 rounded-lg shadow-sm border border-gray-700 hover:shadow-md transition-shadow">
                      <p className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                      <p className="text-lg font-bold text-red-600">
                        {key === 'ltv' ? `₹${predictions[key]?.toFixed(2) || '0.00'}` : `${(predictions[key] || 0).toFixed(3)}`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'financial' && (
            <div className="space-y-8">
              <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700">
                <h2 className="text-2xl font-semibold mb-4">Financial Trends</h2>
                <div className="flex space-x-2 mb-4">
                  <button
                    onClick={handleZoomIn}
                    className="px-4 py-2 rounded-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    aria-label="Zoom in on financial trends chart"
                  >
                    +
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className="px-4 py-2 rounded-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    aria-label="Zoom out on financial trends chart"
                  >
                    -
                  </button>
                  <button
                    onClick={handleResetZoom}
                    className="px-4 py-2 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-gray-500"
                    aria-label="Reset zoom on financial trends chart"
                  >
                    Reset
                  </button>
                </div>
                <div className="h-[300px] sm:h-[400px]">
                  {financialTrends.dates?.length > 0 ? (
                    <Line ref={financialChartRef} data={financialTrendsData} options={chartOptions} />
                  ) : (
                    <p className="text-gray-400 text-center py-4">No financial data available.</p>
                  )}
                </div>
                <p className="text-sm text-gray-400 mt-2">Use mouse wheel, pinch, or buttons to zoom; drag to pan</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700">
                <h2 className="text-2xl font-semibold mb-4">Transaction Averages</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gray-900/70 rounded-lg shadow-sm border border-gray-700">
                    <p className="text-sm text-gray-400">Average Deposit</p>
                    <p className="text-lg font-bold text-green-500">₹{financialTrends.avgDeposit?.toFixed(2) || '0.00'}</p>
                  </div>
                  <div className="p-4 bg-gray-900/70 rounded-lg shadow-sm border border-gray-700">
                    <p className="text-sm text-gray-400">Average Withdrawal</p>
                    <p className="text-lg font-bold text-red-500">₹{financialTrends.avgWithdrawal?.toFixed(2) || '0.00'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700">
                <h2 className="text-2xl font-semibold mb-4">Betting Spend vs. Balance</h2>
                <div className="h-[300px] sm:h-[400px]">
                  {financialTrends.totalBettingSpend || selectedUserData.balance ? (
                    <Pie data={bettingSpendData} options={defaultChartOptions} />
                  ) : (
                    <p className="text-gray-400 text-center py-4">No betting spend data available.</p>
                  )}
                </div>
                <p className="text-sm text-gray-400 mt-4">
                  Betting Spend Ratio: {(financialTrends.bettingSpendRatio * 100)?.toFixed(1) || 0}%
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700">
                <h2 className="text-2xl font-semibold mb-4">Transaction Frequency</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gray-900/70 rounded-lg shadow-sm border border-gray-700">
                    <p className="text-sm text-gray-400">Deposits per Month</p>
                    <p className="text-lg font-bold text-green-500">{financialTrends.depositFrequency?.toFixed(2) || '0.00'}</p>
                  </div>
                  <div className="p-4 bg-gray-900/70 rounded-lg shadow-sm border border-gray-700">
                    <p className="text-sm text-gray-400">Withdrawals per Month</p>
                    <p className="text-lg font-bold text-red-500">{financialTrends.withdrawalFrequency?.toFixed(2) || '0.00'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700">
                <h2 className="text-2xl font-semibold mb-4">Financial Insights</h2>
                <InsightsCards insights={financialTrends.financialInsights} />
              </div>
            </div>
          )}

          {activeTab === 'teams' && (
            <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700">
              <h2 className="text-2xl font-semibold mb-4">Team Popularity</h2>
              <div className="h-[300px] sm:h-[400px]">
                {teamPopularity.length > 0 ? (
                  <Bar data={teamPopularityData} options={defaultChartOptions} />
                ) : (
                  <p className="text-gray-400 text-center py-4">No team popularity data available.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;