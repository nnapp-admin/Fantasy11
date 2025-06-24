const users = [
  {
    userId: 'U001',
    username: 'FantasyKing22',
    email: 'king22@fantasy.com',
    registrationDate: '2024-12-01',
    lastLogin: '2025-06-17T14:30:00Z',
    totalDeposits: 410.50, // 250.50 + 20 + 30 + 40 + 20 + 50
    totalWithdrawals: 240.75, // 120.75 + 50 + 70
    balance: 169.75, // 410.50 - 240.75
    engagementScore: 0.85,
    gameTime: 450,
    averageSpend: 12.50, // Mean of bettingHistory (10 + 15) / 2
    favoriteTeams: ['Mumbai Indians', 'Royal Challengers Bangalore'],
    activeContests: 3,
    completedContests: 12,
    wins: 12, // Matches completed contests
    totalPoints: 2610, // 300 from bettingHistory + 2310 from 11 additional wins (210 each)
    journey: [
      { timestamp: new Date('2024-12-01T00:00:00Z'), action: 'deposit', amount: 250.50 },
      { timestamp: new Date('2024-12-05T00:00:00Z'), action: 'deposit', amount: 20.00 },
      { timestamp: new Date('2024-12-15T10:00:00Z'), action: 'deposit', amount: 30.00 },
      { timestamp: new Date('2025-01-10T12:00:00Z'), action: 'deposit', amount: 40.00 },
      { timestamp: new Date('2025-02-01T00:00:00Z'), action: 'withdrawal_request', amount: 120.75 },
      { timestamp: new Date('2025-02-01T09:30:00Z'), action: 'withdrawal_request', amount: 50.00 },
      { timestamp: new Date('2025-03-15T11:00:00Z'), action: 'deposit', amount: 20.00 },
      { timestamp: new Date('2025-06-10T09:15:00Z'), action: 'joined_contest', contestId: 'C001' }, // Moved before bet
      { timestamp: new Date('2025-06-10T09:45:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'win', pointsEarned: 150, contestId: 'C001' },
      { timestamp: new Date('2025-06-12T09:45:00Z'), action: 'placed_bet', amount: 15.00, outcome: 'win', pointsEarned: 150, contestId: 'C002' },
      { timestamp: new Date('2025-06-15T09:00:00Z'), action: 'login', duration: 300 },
      { timestamp: new Date('2025-06-15T10:00:00Z'), action: 'viewed_leaderboard', rank: 15 },
      { timestamp: new Date('2025-06-15T10:30:00Z'), action: 'received_notification', message: 'Contest results updated' },
      { timestamp: new Date('2025-06-15T11:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-06-15T11:30:00Z'), action: 'logout' }, // Removed duration
      { timestamp: new Date('2025-06-16T12:00:00Z'), action: 'withdrawal_request', amount: 70.00 },
      { timestamp: new Date('2025-01-01T12:00:00Z'), action: 'won_contest', contestId: 'C003', pointsEarned: 210 },
      { timestamp: new Date('2025-02-01T12:00:00Z'), action: 'won_contest', contestId: 'C004', pointsEarned: 210 },
      { timestamp: new Date('2025-03-01T12:00:00Z'), action: 'won_contest', contestId: 'C005', pointsEarned: 210 },
      { timestamp: new Date('2025-04-01T12:00:00Z'), action: 'won_contest', contestId: 'C006', pointsEarned: 210 },
      { timestamp: new Date('2025-05-01T12:00:00Z'), action: 'won_contest', contestId: 'C007', pointsEarned: 210 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C008', pointsEarned: 210 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C009', pointsEarned: 210 },
      { timestamp: new Date('2025-06-11T12:00:00Z'), action: 'won_contest', contestId: 'C010', pointsEarned: 210 },
      { timestamp: new Date('2025-06-12T12:00:00Z'), action: 'won_contest', contestId: 'C011', pointsEarned: 210 },
      { timestamp: new Date('2025-06-13T12:00:00Z'), action: 'won_contest', contestId: 'C012', pointsEarned: 210 },
      { timestamp: new Date('2025-06-14T12:00:00Z'), action: 'won_contest', contestId: 'C013', pointsEarned: 210 }
    ],
    referralCode: 'KING22REF',
    referredUsers: 2,
    notificationsEnabled: true,
    preferredLanguage: 'en',
    deviceType: 'mobile',
    lastDeposit: { amount: 50.00, date: '2025-06-15T11:00:00Z' },
    bettingHistory: [
      { contestId: 'C001', amount: 10.00, outcome: 'win', date: '2025-06-10', pointsEarned: 150 },
      { contestId: 'C002', amount: 15.00, outcome: 'win', date: '2025-06-12', pointsEarned: 150 }
    ]
  },
  {
    userId: 'U002',
    username: 'CricketFan99',
    email: 'fan99@fantasy.com',
    registrationDate: '2025-01-15',
    lastLogin: '2025-06-17T16:45:00Z',
    totalDeposits: 240.00, // 150 + 20 + 40 + 30
    totalWithdrawals: 120.00, // 80 + 40
    balance: 120.00, // 240 - 120
    engagementScore: 0.65,
    gameTime: 320,
    averageSpend: 15.00, // Mean of bettingHistory (20 + 10) / 2
    favoriteTeams: ['Chennai Super Kings', 'Kolkata Knight Riders'],
    activeContests: 1,
    completedContests: 8,
    wins: 8, // Matches completed contests
    totalPoints: 1301, // 90 from bettingHistory + 1211 from 7 additional wins (173 each)
    journey: [
      { timestamp: new Date('2025-01-15T00:00:00Z'), action: 'deposit', amount: 150.00 },
      { timestamp: new Date('2025-02-01T08:00:00Z'), action: 'deposit', amount: 20.00 },
      { timestamp: new Date('2025-03-15T09:00:00Z'), action: 'deposit', amount: 40.00 },
      { timestamp: new Date('2025-04-01T00:00:00Z'), action: 'withdrawal_request', amount: 80.00 },
      { timestamp: new Date('2025-04-10T10:00:00Z'), action: 'withdrawal_request', amount: 40.00 },
      { timestamp: new Date('2025-06-15T09:00:00Z'), action: 'deposit', amount: 30.00 },
      { timestamp: new Date('2025-06-14T09:00:00Z'), action: 'joined_contest', contestId: 'C003' },
      { timestamp: new Date('2025-06-14T09:45:00Z'), action: 'placed_bet', amount: 20.00, outcome: 'win', pointsEarned: 90, contestId: 'C003' },
      { timestamp: new Date('2025-06-16T09:45:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'loss', pointsEarned: 0, contestId: 'C004' },
      { timestamp: new Date('2025-06-16T08:00:00Z'), action: 'login', duration: 200 },
      { timestamp: new Date('2025-06-16T08:30:00Z'), action: 'viewed_leaderboard', rank: 50 },
      { timestamp: new Date('2025-06-16T09:15:00Z'), action: 'logout' }, // Removed duration
      { timestamp: new Date('2025-02-01T12:00:00Z'), action: 'won_contest', contestId: 'C014', pointsEarned: 173 },
      { timestamp: new Date('2025-03-01T12:00:00Z'), action: 'won_contest', contestId: 'C015', pointsEarned: 173 },
      { timestamp: new Date('2025-04-01T12:00:00Z'), action: 'won_contest', contestId: 'C016', pointsEarned: 173 },
      { timestamp: new Date('2025-05-01T12:00:00Z'), action: 'won_contest', contestId: 'C017', pointsEarned: 173 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C018', pointsEarned: 173 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C019', pointsEarned: 173 },
      { timestamp: new Date('2025-06-15T12:00:00Z'), action: 'won_contest', contestId: 'C020', pointsEarned: 173 }
    ],
    referralCode: 'FAN99REF',
    referredUsers: 0,
    notificationsEnabled: false,
    preferredLanguage: 'hi',
    deviceType: 'desktop',
    lastDeposit: { amount: 30.00, date: '2025-06-15T09:00:00Z' },
    bettingHistory: [
      { contestId: 'C003', amount: 20.00, outcome: 'win', date: '2025-06-14', pointsEarned: 90 },
      { contestId: 'C004', amount: 10.00, outcome: 'loss', date: '2025-06-16', pointsEarned: 0 }
    ]
  },
  {
    userId: 'U003',
    username: 'BettingProX',
    email: 'proX@fantasy.com',
    registrationDate: '2025-03-10',
    lastLogin: '2025-06-18T01:00:00Z',
    totalDeposits: 850.00, // 500 + 50 + 75 + 100 + 75 + 50
    totalWithdrawals: 550.00, // 300 + 80 + 70 + 100
    balance: 300.00, // 850 - 550
    engagementScore: 0.95,
    gameTime: 600,
    averageSpend: 26.25, // Mean of bettingHistory (30 + 25 + 20 + 30) / 4
    favoriteTeams: ['Delhi Capitals', 'Sunrisers Hyderabad'],
    activeContests: 5,
    completedContests: 20,
    wins: 14, // Adjusted to match remaining contests
    totalPoints: 2975, // 0 from bettingHistory + 2975 from 14 wins (212.5 each)
    journey: [
      { timestamp: new Date('2025-03-10T00:00:00Z'), action: 'deposit', amount: 500.00 },
      { timestamp: new Date('2025-03-15T11:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-04-01T00:00:00Z'), action: 'withdrawal_request', amount: 300.00 },
      { timestamp: new Date('2025-04-01T12:00:00Z'), action: 'deposit', amount: 75.00 },
      { timestamp: new Date('2025-04-15T10:00:00Z'), action: 'withdrawal_request', amount: 80.00 },
      { timestamp: new Date('2025-05-01T09:00:00Z'), action: 'deposit', amount: 100.00 },
      { timestamp: new Date('2025-05-15T14:00:00Z'), action: 'withdrawal_request', amount: 70.00 },
      { timestamp: new Date('2025-06-01T13:00:00Z'), action: 'deposit', amount: 75.00 },
      { timestamp: new Date('2025-06-14T13:30:00Z'), action: 'joined_contest', contestId: 'C005' },
      { timestamp: new Date('2025-06-15T14:00:00Z'), action: 'placed_bet', amount: 30.00, outcome: 'loss', pointsEarned: 0, contestId: 'C005' },
      { timestamp: new Date('2025-06-16T14:00:00Z'), action: 'placed_bet', amount: 25.00, outcome: 'loss', pointsEarned: 0, contestId: 'C006' },
      { timestamp: new Date('2025-06-17T11:00:00Z'), action: 'placed_bet', amount: 20.00, outcome: 'loss', pointsEarned: 0, contestId: 'C035' }, // Added loss
      { timestamp: new Date('2025-06-17T11:30:00Z'), action: 'placed_bet', amount: 30.00, outcome: 'loss', pointsEarned: 0, contestId: 'C036' }, // Added loss
      { timestamp: new Date('2025-06-17T12:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-06-17T13:00:00Z'), action: 'login', duration: 420 },
      { timestamp: new Date('2025-06-17T14:30:00Z'), action: 'viewed_leaderboard', rank: 3 },
      { timestamp: new Date('2025-06-17T15:00:00Z'), action: 'withdrawal_request', amount: 100.00 },
      { timestamp: new Date('2025-06-17T15:30:00Z'), action: 'logout' }, // Removed duration
      { timestamp: new Date('2025-03-20T12:00:00Z'), action: 'won_contest', contestId: 'C021', pointsEarned: 212.5 },
      { timestamp: new Date('2025-04-01T12:00:00Z'), action: 'won_contest', contestId: 'C022', pointsEarned: 212.5 },
      { timestamp: new Date('2025-04-15T12:00:00Z'), action: 'won_contest', contestId: 'C023', pointsEarned: 212.5 },
      { timestamp: new Date('2025-05-01T12:00:00Z'), action: 'won_contest', contestId: 'C024', pointsEarned: 212.5 },
      { timestamp: new Date('2025-05-15T12:00:00Z'), action: 'won_contest', contestId: 'C025', pointsEarned: 212.5 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C026', pointsEarned: 212.5 },
      { timestamp: new Date('2025-06-05T12:00:00Z'), action: 'won_contest', contestId: 'C027', pointsEarned: 212.5 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C028', pointsEarned: 212.5 },
      { timestamp: new Date('2025-06-12T12:00:00Z'), action: 'won_contest', contestId: 'C029', pointsEarned: 212.5 },
      { timestamp: new Date('2025-06-14T12:00:00Z'), action: 'won_contest', contestId: 'C030', pointsEarned: 212.5 },
      { timestamp: new Date('2025-06-15T12:00:00Z'), action: 'won_contest', contestId: 'C031', pointsEarned: 212.5 },
      { timestamp: new Date('2025-06-16T12:00:00Z'), action: 'won_contest', contestId: 'C032', pointsEarned: 212.5 },
      { timestamp: new Date('2025-06-17T12:00:00Z'), action: 'won_contest', contestId: 'C033', pointsEarned: 212.5 },
      { timestamp: new Date('2025-06-18T12:00:00Z'), action: 'won_contest', contestId: 'C034', pointsEarned: 212.5 }
    ],
    referralCode: 'PROXREF',
    referredUsers: 4,
    notificationsEnabled: true,
    preferredLanguage: 'en',
    deviceType: 'mobile',
    lastDeposit: { amount: 50.00, date: '2025-06-17T12:00:00Z' },
    bettingHistory: [
      { contestId: 'C005', amount: 30.00, outcome: 'loss', date: '2025-06-15', pointsEarned: 0 },
      { contestId: 'C006', amount: 25.00, outcome: 'loss', date: '2025-06-16', pointsEarned: 0 },
      { contestId: 'C035', amount: 20.00, outcome: 'loss', date: '2025-06-17', pointsEarned: 0 }, // Added loss
      { contestId: 'C036', amount: 30.00, outcome: 'loss', date: '2025-06-17', pointsEarned: 0 } // Added loss
    ]
  },
  {
    userId: 'U004',
    username: 'Dream11Star',
    email: 'star11@fantasy.com',
    registrationDate: '2025-02-20',
    lastLogin: '2025-06-18T03:15:00Z',
    totalDeposits: 470.25, // 320.25 + 30 + 45 + 50 + 25
    totalWithdrawals: 270.00, // 150 + 50 + 70
    balance: 200.25, // 470.25 - 270
    engagementScore: 0.78,
    gameTime: 380,
    averageSpend: 17.67, // Mean of bettingHistory (15 + 20 + 18) / 3
    favoriteTeams: ['Rajasthan Royals', 'Punjab Kings'],
    activeContests: 2,
    completedContests: 15,
    wins: 15, // Matches completed contests
    totalPoints: 3298, // 400 from bettingHistory + 2898 from 14 additional wins (207 each)
    journey: [
      { timestamp: new Date('2025-02-20T00:00:00Z'), action: 'deposit', amount: 320.25 },
      { timestamp: new Date('2025-03-01T00:00:00Z'), action: 'withdrawal_request', amount: 150.00 },
      { timestamp: new Date('2025-03-01T10:00:00Z'), action: 'deposit', amount: 30.00 },
      { timestamp: new Date('2025-04-01T11:00:00Z'), action: 'deposit', amount: 45.00 },
      { timestamp: new Date('2025-04-15T12:00:00Z'), action: 'withdrawal_request', amount: 50.00 },
      { timestamp: new Date('2025-05-10T09:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-06-15T10:20:00Z'), action: 'joined_contest', contestId: 'C007' },
      { timestamp: new Date('2025-06-15T10:45:00Z'), action: 'placed_bet', amount: 15.00, outcome: 'win', pointsEarned: 200, contestId: 'C007' },
      { timestamp: new Date('2025-06-16T10:45:00Z'), action: 'placed_bet', amount: 20.00, outcome: 'win', pointsEarned: 200, contestId: 'C008' },
      { timestamp: new Date('2025-06-16T15:30:00Z'), action: 'deposit', amount: 25.00 },
      { timestamp: new Date('2025-06-17T10:00:00Z'), action: 'login', duration: 250 },
      { timestamp: new Date('2025-06-17T10:45:00Z'), action: 'placed_bet', amount: 18.00, outcome: 'loss', pointsEarned: 0, contestId: 'C015' },
      { timestamp: new Date('2025-06-17T11:00:00Z'), action: 'viewed_leaderboard', rank: 10 },
      { timestamp: new Date('2025-06-17T11:30:00Z'), action: 'logout' }, // Removed duration
      { timestamp: new Date('2025-06-17T12:00:00Z'), action: 'withdrawal_request', amount: 70.00 },
      { timestamp: new Date('2025-03-01T12:00:00Z'), action: 'won_contest', contestId: 'C041', pointsEarned: 207 },
      { timestamp: new Date('2025-04-01T12:00:00Z'), action: 'won_contest', contestId: 'C042', pointsEarned: 207 },
      { timestamp: new Date('2025-05-01T12:00:00Z'), action: 'won_contest', contestId: 'C043', pointsEarned: 207 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C044', pointsEarned: 207 },
      { timestamp: new Date('2025-06-05T12:00:00Z'), action: 'won_contest', contestId: 'C045', pointsEarned: 207 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C046', pointsEarned: 207 },
      { timestamp: new Date('2025-06-12T12:00:00Z'), action: 'won_contest', contestId: 'C047', pointsEarned: 207 },
      { timestamp: new Date('2025-06-13T12:00:00Z'), action: 'won_contest', contestId: 'C048', pointsEarned: 207 },
      { timestamp: new Date('2025-06-14T12:00:00Z'), action: 'won_contest', contestId: 'C049', pointsEarned: 207 },
      { timestamp: new Date('2025-06-15T12:00:00Z'), action: 'won_contest', contestId: 'C050', pointsEarned: 207 },
      { timestamp: new Date('2025-06-16T12:00:00Z'), action: 'won_contest', contestId: 'C051', pointsEarned: 207 },
      { timestamp: new Date('2025-06-17T12:00:00Z'), action: 'won_contest', contestId: 'C052', pointsEarned: 207 },
      { timestamp: new Date('2025-06-18T12:00:00Z'), action: 'won_contest', contestId: 'C053', pointsEarned: 207 },
      { timestamp: new Date('2025-06-19T12:00:00Z'), action: 'won_contest', contestId: 'C054', pointsEarned: 207 }
    ],
    referralCode: 'STAR11REF',
    referredUsers: 1,
    notificationsEnabled: true,
    preferredLanguage: 'en',
    deviceType: 'mobile',
    lastDeposit: { amount: 25.00, date: '2025-06-16T15:30:00Z' },
    bettingHistory: [
      { contestId: 'C007', amount: 15.00, outcome: 'win', date: '2025-06-15', pointsEarned: 200 },
      { contestId: 'C008', amount: 20.00, outcome: 'win', date: '2025-06-16', pointsEarned: 200 },
      { contestId: 'C015', amount: 18.00, outcome: 'loss', date: '2025-06-17', pointsEarned: 0 }
    ]
  },
  {
    userId: 'U005',
    username: 'WicketWizard',
    email: 'wizard@fantasy.com',
    registrationDate: '2024-11-05',
    lastLogin: '2025-06-16T20:00:00Z',
    totalDeposits: 165.00, // 100 + 15 + 30 + 20
    totalWithdrawals: 125.00, // 100 + 25
    balance: 40.00, // 165 - 125
    engagementScore: 0.55,
    gameTime: 200,
    averageSpend: 7.67, // Mean of bettingHistory (5 + 10 + 8) / 3
    favoriteTeams: ['Lucknow Super Giants', 'Gujarat Titans'],
    activeContests: 0,
    completedContests: 5,
    wins: 5, // Adjusted to match completedContests
    totalPoints: 800, // 100 from bettingHistory + 700 from 6 wins (116.67 each, adjusted)
    journey: [
      { timestamp: new Date('2024-11-05T00:00:00Z'), action: 'deposit', amount: 100.00 },
      { timestamp: new Date('2024-12-01T09:00:00Z'), action: 'deposit', amount: 15.00 },
      { timestamp: new Date('2025-01-01T00:00:00Z'), action: 'withdrawal_request', amount: 100.00 },
      { timestamp: new Date('2025-01-15T10:00:00Z'), action: 'deposit', amount: 30.00 },
      { timestamp: new Date('2025-03-01T11:00:00Z'), action: 'withdrawal_request', amount: 25.00 },
      { timestamp: new Date('2025-06-13T09:45:00Z'), action: 'placed_bet', amount: 5.00, outcome: 'loss', pointsEarned: 0, contestId: 'C009' },
      { timestamp: new Date('2025-06-14T09:45:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'win', pointsEarned: 100, contestId: 'C010' },
      { timestamp: new Date('2025-06-14T10:00:00Z'), action: 'deposit', amount: 20.00 },
      { timestamp: new Date('2025-06-15T09:45:00Z'), action: 'placed_bet', amount: 8.00, outcome: 'loss', pointsEarned: 0, contestId: 'C016' },
      { timestamp: new Date('2025-06-16T18:00:00Z'), action: 'login', duration: 150 },
      { timestamp: new Date('2025-06-16T18:15:00Z'), action: 'viewed_leaderboard', rank: 75 },
      { timestamp: new Date('2025-06-16T18:30:00Z'), action: 'logout' }, // Removed duration
      { timestamp: new Date('2025-01-01T12:00:00Z'), action: 'won_contest', contestId: 'C055', pointsEarned: 116.67 },
      { timestamp: new Date('2025-02-01T12:00:00Z'), action: 'won_contest', contestId: 'C056', pointsEarned: 116.67 },
      { timestamp: new Date('2025-03-01T12:00:00Z'), action: 'won_contest', contestId: 'C057', pointsEarned: 116.67 },
      { timestamp: new Date('2025-04-01T12:00:00Z'), action: 'won_contest', contestId: 'C058', pointsEarned: 116.67 },
      { timestamp: new Date('2025-05-01T12:00:00Z'), action: 'won_contest', contestId: 'C059', pointsEarned: 116.67 }
    ],
    referralCode: 'WIZARDREF',
    referredUsers: 0,
    notificationsEnabled: false,
    preferredLanguage: 'hi',
    deviceType: 'desktop',
    lastDeposit: { amount: 20.00, date: '2025-06-14T10:00:00Z' },
    bettingHistory: [
      { contestId: 'C009', amount: 5.00, outcome: 'loss', date: '2025-06-13', pointsEarned: 0 },
      { contestId: 'C010', amount: 10.00, outcome: 'win', date: '2025-06-14', pointsEarned: 100 },
      { contestId: 'C016', amount: 8.00, outcome: 'loss', date: '2025-06-15', pointsEarned: 0 }
    ]
  },
  {
    userId: 'U006',
    username: 'RunMachine88',
    email: 'run88@fantasy.com',
    registrationDate: '2025-04-01',
    lastLogin: '2025-06-17T22:30:00Z',
    totalDeposits: 650.00, // 400 + 50 + 60 + 40 + 50 + 50
    totalWithdrawals: 410.00, // 250 + 60 + 100
    balance: 240.00, // 650 - 410
    engagementScore: 0.88,
    gameTime: 520,
    averageSpend: 24.25, // Mean of bettingHistory (25 + 30 + 22 + 20) / 4
    favoriteTeams: ['Mumbai Indians', 'Chennai Super Kings'],
    activeContests: 4,
    completedContests: 18,
    wins: 14, // Matches totalPoints
    totalPoints: 3625, // 550 from bettingHistory + 3075 from 13 additional wins (236.54 each)
    journey: [
      { timestamp: new Date('2025-04-01T00:00:00Z'), action: 'deposit', amount: 400.00 },
      { timestamp: new Date('2025-04-10T12:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-04-20T11:00:00Z'), action: 'withdrawal_request', amount: 60.00 },
      { timestamp: new Date('2025-05-01T00:00:00Z'), action: 'withdrawal_request', amount: 250.00 },
      { timestamp: new Date('2025-05-01T10:00:00Z'), action: 'deposit', amount: 60.00 },
      { timestamp: new Date('2025-05-15T09:00:00Z'), action: 'deposit', amount: 40.00 },
      { timestamp: new Date('2025-06-01T13:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-06-10T14:00:00Z'), action: 'withdrawal_request', amount: 100.00 },
      { timestamp: new Date('2025-06-16T09:30:00Z'), action: 'joined_contest', contestId: 'C011' },
      { timestamp: new Date('2025-06-16T10:00:00Z'), action: 'placed_bet', amount: 25.00, outcome: 'win', pointsEarned: 275, contestId: 'C011' },
      { timestamp: new Date('2025-06-17T10:00:00Z'), action: 'placed_bet', amount: 30.00, outcome: 'loss', pointsEarned: 0, contestId: 'C012' },
      { timestamp: new Date('2025-06-17T19:00:00Z'), action: 'login', duration: 360 },
      { timestamp: new Date('2025-06-17T20:30:00Z'), action: 'viewed_leaderboard', rank: 5 },
      { timestamp: new Date('2025-06-17T21:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-06-17T21:30:00Z'), action: 'logout' }, // Removed duration
      { timestamp: new Date('2025-06-18T10:00:00Z'), action: 'placed_bet', amount: 22.00, outcome: 'win', pointsEarned: 275, contestId: 'C017' },
      { timestamp: new Date('2025-06-18T10:30:00Z'), action: 'placed_bet', amount: 20.00, outcome: 'loss', pointsEarned: 0, contestId: 'C018' },
      { timestamp: new Date('2025-04-15T12:00:00Z'), action: 'won_contest', contestId: 'C062', pointsEarned: 236.54 },
      { timestamp: new Date('2025-05-01T12:00:00Z'), action: 'won_contest', contestId: 'C063', pointsEarned: 236.54 },
      { timestamp: new Date('2025-05-15T12:00:00Z'), action: 'won_contest', contestId: 'C064', pointsEarned: 236.54 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C065', pointsEarned: 236.54 },
      { timestamp: new Date('2025-06-05T12:00:00Z'), action: 'won_contest', contestId: 'C066', pointsEarned: 236.54 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C067', pointsEarned: 236.54 },
      { timestamp: new Date('2025-06-12T12:00:00Z'), action: 'won_contest', contestId: 'C068', pointsEarned: 236.54 },
      { timestamp: new Date('2025-06-13T12:00:00Z'), action: 'won_contest', contestId: 'C069', pointsEarned: 236.54 },
      { timestamp: new Date('2025-06-14T12:00:00Z'), action: 'won_contest', contestId: 'C070', pointsEarned: 236.54 },
      { timestamp: new Date('2025-06-15T12:00:00Z'), action: 'won_contest', contestId: 'C071', pointsEarned: 236.54 },
      { timestamp: new Date('2025-06-16T12:00:00Z'), action: 'won_contest', contestId: 'C072', pointsEarned: 236.54 },
      { timestamp: new Date('2025-06-17T12:00:00Z'), action: 'won_contest', contestId: 'C073', pointsEarned: 236.54 },
      { timestamp: new Date('2025-06-18T12:00:00Z'), action: 'won_contest', contestId: 'C074', pointsEarned: 236.54 }
    ],
    referralCode: 'RUN88REF',
    referredUsers: 3,
    notificationsEnabled: true,
    preferredLanguage: 'en',
    deviceType: 'mobile',
    lastDeposit: { amount: 50.00, date: '2025-06-17T21:00:00Z' },
    bettingHistory: [
      { contestId: 'C011', amount: 25.00, outcome: 'win', date: '2025-06-16', pointsEarned: 275 },
      { contestId: 'C012', amount: 30.00, outcome: 'loss', date: '2025-06-17', pointsEarned: 0 },
      { contestId: 'C017', amount: 22.00, outcome: 'win', date: '2025-06-18', pointsEarned: 275 },
      { contestId: 'C018', amount: 20.00, outcome: 'loss', date: '2025-06-18', pointsEarned: 0 }
    ]
  },
  {
    userId: 'U007',
    username: 'SpinMaster',
    email: 'spin@fantasy.com',
    registrationDate: '2025-05-10',
    lastLogin: '2025-06-18T05:00:00Z',
    totalDeposits: 255.00, // 180 + 25 + 30 + 20
    totalWithdrawals: 110.00, // 50 + 30 + 30
    balance: 145.00, // 255 - 110
    engagementScore: 0.70,
    gameTime: 280,
    averageSpend: 10.00, // Mean of bettingHistory (12 + 8 + 10 + 10) / 4
    favoriteTeams: ['Royal Challengers Bangalore', 'Delhi Capitals'],
    activeContests: 2,
    completedContests: 10,
    wins: 14, // Matches totalPoints
    totalPoints: 1480, // 120 from bettingHistory + 1360 from 13 additional wins (104.62 each)
    journey: [
      { timestamp: new Date('2025-05-10T00:00:00Z'), action: 'deposit', amount: 180.00 },
      { timestamp: new Date('2025-05-15T10:00:00Z'), action: 'deposit', amount: 25.00 },
      { timestamp: new Date('2025-06-01T00:00:00Z'), action: 'withdrawal_request', amount: 50.00 },
      { timestamp: new Date('2025-06-01T09:00:00Z'), action: 'deposit', amount: 30.00 },
      { timestamp: new Date('2025-06-10T11:00:00Z'), action: 'withdrawal_request', amount: 30.00 },
      { timestamp: new Date('2025-06-17T10:00:00Z'), action: 'deposit', amount: 20.00 },
      { timestamp: new Date('2025-06-17T12:00:00Z'), action: 'withdrawal_request', amount: 30.00 },
      { timestamp: new Date('2025-06-17T15:00:00Z'), action: 'joined_contest', contestId: 'C013' },
      { timestamp: new Date('2025-06-17T15:30:00Z'), action: 'placed_bet', amount: 12.00, outcome: 'win', pointsEarned: 120, contestId: 'C013' },
      { timestamp: new Date('2025-06-18T03:00:00Z'), action: 'login', duration: 180 },
      { timestamp: new Date('2025-06-18T04:00:00Z'), action: 'viewed_leaderboard', rank: 30 },
      { timestamp: new Date('2025-06-18T04:30:00Z'), action: 'logout' }, // Removed duration
      { timestamp: new Date('2025-06-18T10:00:00Z'), action: 'placed_bet', amount: 8.00, outcome: 'loss', pointsEarned: 0, contestId: 'C014' },
      { timestamp: new Date('2025-06-18T10:30:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'loss', pointsEarned: 0, contestId: 'C019' },
      { timestamp: new Date('2025-06-18T11:00:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'loss', pointsEarned: 0, contestId: 'C020' },
      { timestamp: new Date('2025-05-15T12:00:00Z'), action: 'won_contest', contestId: 'C075', pointsEarned: 104.62 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C076', pointsEarned: 104.62 },
      { timestamp: new Date('2025-06-02T12:00:00Z'), action: 'won_contest', contestId: 'C077', pointsEarned: 104.62 },
      { timestamp: new Date('2025-06-03T12:00:00Z'), action: 'won_contest', contestId: 'C078', pointsEarned: 104.62 },
      { timestamp: new Date('2025-06-04T12:00:00Z'), action: 'won_contest', contestId: 'C079', pointsEarned: 104.62 },
      { timestamp: new Date('2025-06-05T12:00:00Z'), action: 'won_contest', contestId: 'C080', pointsEarned: 104.62 },
      { timestamp: new Date('2025-06-06T12:00:00Z'), action: 'won_contest', contestId: 'C081', pointsEarned: 104.62 },
      { timestamp: new Date('2025-06-07T12:00:00Z'), action: 'won_contest', contestId: 'C082', pointsEarned: 104.62 },
      { timestamp: new Date('2025-06-08T12:00:00Z'), action: 'won_contest', contestId: 'C083', pointsEarned: 104.62 },
      { timestamp: new Date('2025-06-09T12:00:00Z'), action: 'won_contest', contestId: 'C084', pointsEarned: 104.62 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C085', pointsEarned: 104.62 },
      { timestamp: new Date('2025-06-11T12:00:00Z'), action: 'won_contest', contestId: 'C086', pointsEarned: 104.62 },
      { timestamp: new Date('2025-06-12T12:00:00Z'), action: 'won_contest', contestId: 'C087', pointsEarned: 104.62 },
      { timestamp: new Date('2025-06-13T12:00:00Z'), action: 'won_contest', contestId: 'C088', pointsEarned: 104.62 }
    ],
    referralCode: 'SPINREF',
    referredUsers: 1,
    notificationsEnabled: true,
    preferredLanguage: 'hi',
    deviceType: 'mobile',
    lastDeposit: { amount: 20.00, date: '2025-06-17T10:00:00Z' },
    bettingHistory: [
      { contestId: 'C013', amount: 12.00, outcome: 'win', date: '2025-06-17', pointsEarned: 120 },
      { contestId: 'C014', amount: 8.00, outcome: 'loss', date: '2025-06-18', pointsEarned: 0 },
      { contestId: 'C019', amount: 10.00, outcome: 'loss', date: '2025-06-18', pointsEarned: 0 },
      { contestId: 'C020', amount: 10.00, outcome: 'loss', date: '2025-06-18', pointsEarned: 0 }
    ]
  },

  {
    userId: 'U008',
    username: 'GameChanger77',
    email: 'changer77@fantasy.com',
    registrationDate: '2025-01-20',
    lastLogin: '2025-06-18T12:00:00Z',
    totalDeposits: 320.00, // 200 + 50 + 30 + 40
    totalWithdrawals: 150.00, // 100 + 50
    balance: 170.00, // 320 - 150
    engagementScore: 0.72,
    gameTime: 350,
    averageSpend: 14.00, // Mean of bettingHistory (10 + 15 + 17) / 3
    favoriteTeams: ['Kolkata Knight Riders', 'Sunrisers Hyderabad'],
    activeContests: 2,
    completedContests: 10,
    wins: 10, // Matches completed contests
    totalPoints: 2100, // 300 from bettingHistory + 1800 from 9 additional wins (200 each)
    journey: [
      { timestamp: new Date('2025-01-20T00:00:00Z'), action: 'deposit', amount: 200.00 },
      { timestamp: new Date('2025-02-10T10:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-03-01T12:00:00Z'), action: 'withdrawal_request', amount: 100.00 },
      { timestamp: new Date('2025-04-01T09:00:00Z'), action: 'deposit', amount: 30.00 },
      { timestamp: new Date('2025-05-15T11:00:00Z'), action: 'deposit', amount: 40.00 },
      { timestamp: new Date('2025-06-01T14:00:00Z'), action: 'withdrawal_request', amount: 50.00 },
      { timestamp: new Date('2025-06-15T10:00:00Z'), action: 'joined_contest', contestId: 'C089' },
      { timestamp: new Date('2025-06-15T10:30:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'win', pointsEarned: 150, contestId: 'C089' },
      { timestamp: new Date('2025-06-16T10:30:00Z'), action: 'placed_bet', amount: 15.00, outcome: 'win', pointsEarned: 150, contestId: 'C090' },
      { timestamp: new Date('2025-06-17T10:00:00Z'), action: 'placed_bet', amount: 17.00, outcome: 'loss', pointsEarned: 0, contestId: 'C091' },
      { timestamp: new Date('2025-06-18T11:00:00Z'), action: 'login', duration: 200 },
      { timestamp: new Date('2025-06-18T11:30:00Z'), action: 'viewed_leaderboard', rank: 25 },
      { timestamp: new Date('2025-06-18T12:00:00Z'), action: 'logout' },
      { timestamp: new Date('2025-02-01T12:00:00Z'), action: 'won_contest', contestId: 'C092', pointsEarned: 200 },
      { timestamp: new Date('2025-03-01T12:00:00Z'), action: 'won_contest', contestId: 'C093', pointsEarned: 200 },
      { timestamp: new Date('2025-04-01T12:00:00Z'), action: 'won_contest', contestId: 'C094', pointsEarned: 200 },
      { timestamp: new Date('2025-05-01T12:00:00Z'), action: 'won_contest', contestId: 'C095', pointsEarned: 200 },
      { timestamp: new Date('2025-05-10T12:00:00Z'), action: 'won_contest', contestId: 'C096', pointsEarned: 200 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C097', pointsEarned: 200 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C098', pointsEarned: 200 },
      { timestamp: new Date('2025-06-15T12:00:00Z'), action: 'won_contest', contestId: 'C099', pointsEarned: 200 },
      { timestamp: new Date('2025-06-16T12:00:00Z'), action: 'won_contest', contestId: 'C100', pointsEarned: 200 }
    ],
    referralCode: 'CHANGER77REF',
    referredUsers: 2,
    notificationsEnabled: true,
    preferredLanguage: 'en',
    deviceType: 'mobile',
    lastDeposit: { amount: 40.00, date: '2025-05-15T11:00:00Z' },
    bettingHistory: [
      { contestId: 'C089', amount: 10.00, outcome: 'win', date: '2025-06-15', pointsEarned: 150 },
      { contestId: 'C090', amount: 15.00, outcome: 'win', date: '2025-06-16', pointsEarned: 150 },
      { contestId: 'C091', amount: 17.00, outcome: 'loss', date: '2025-06-17', pointsEarned: 0 }
    ]
  },
  {
    userId: 'U009',
    username: 'PowerHitter45',
    email: 'hitter45@fantasy.com',
    registrationDate: '2025-02-15',
    lastLogin: '2025-06-18T14:20:00Z',
    totalDeposits: 280.00, // 150 + 40 + 50 + 40
    totalWithdrawals: 100.00, // 60 + 40
    balance: 180.00, // 280 - 100
    engagementScore: 0.68,
    gameTime: 300,
    averageSpend: 12.50, // Mean of bettingHistory (15 + 10) / 2
    favoriteTeams: ['Punjab Kings', 'Rajasthan Royals'],
    activeContests: 1,
    completedContests: 7,
    wins: 7, // Matches completed contests
    totalPoints: 1260, // 180 from bettingHistory + 1080 from 6 additional wins (180 each)
    journey: [
      { timestamp: new Date('2025-02-15T00:00:00Z'), action: 'deposit', amount: 150.00 },
      { timestamp: new Date('2025-03-01T09:00:00Z'), action: 'deposit', amount: 40.00 },
      { timestamp: new Date('2025-04-01T10:00:00Z'), action: 'withdrawal_request', amount: 60.00 },
      { timestamp: new Date('2025-05-01T11:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'withdrawal_request', amount: 40.00 },
      { timestamp: new Date('2025-06-15T09:00:00Z'), action: 'deposit', amount: 40.00 },
      { timestamp: new Date('2025-06-16T10:00:00Z'), action: 'joined_contest', contestId: 'C101' },
      { timestamp: new Date('2025-06-16T10:30:00Z'), action: 'placed_bet', amount: 15.00, outcome: 'win', pointsEarned: 180, contestId: 'C101' },
      { timestamp: new Date('2025-06-17T10:30:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'loss', pointsEarned: 0, contestId: 'C102' },
      { timestamp: new Date('2025-06-18T13:00:00Z'), action: 'login', duration: 180 },
      { timestamp: new Date('2025-06-18T13:30:00Z'), action: 'viewed_leaderboard', rank: 40 },
      { timestamp: new Date('2025-06-18T14:00:00Z'), action: 'logout' },
      { timestamp: new Date('2025-03-01T12:00:00Z'), action: 'won_contest', contestId: 'C103', pointsEarned: 180 },
      { timestamp: new Date('2025-04-01T12:00:00Z'), action: 'won_contest', contestId: 'C104', pointsEarned: 180 },
      { timestamp: new Date('2025-05-01T12:00:00Z'), action: 'won_contest', contestId: 'C105', pointsEarned: 180 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C106', pointsEarned: 180 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C107', pointsEarned: 180 },
      { timestamp: new Date('2025-06-15T12:00:00Z'), action: 'won_contest', contestId: 'C108', pointsEarned: 180 }
    ],
    referralCode: 'HITTER45REF',
    referredUsers: 0,
    notificationsEnabled: false,
    preferredLanguage: 'hi',
    deviceType: 'desktop',
    lastDeposit: { amount: 40.00, date: '2025-06-15T09:00:00Z' },
    bettingHistory: [
      { contestId: 'C101', amount: 15.00, outcome: 'win', date: '2025-06-16', pointsEarned: 180 },
      { contestId: 'C102', amount: 10.00, outcome: 'loss', date: '2025-06-17', pointsEarned: 0 }
    ]
  },
  {
    userId: 'U010',
    username: 'StrikeForce99',
    email: 'strike99@fantasy.com',
    registrationDate: '2025-03-05',
    lastLogin: '2025-06-18T16:00:00Z',
    totalDeposits: 700.00, // 400 + 100 + 80 + 120
    totalWithdrawals: 450.00, // 250 + 100 + 100
    balance: 250.00, // 700 - 450
    engagementScore: 0.90,
    gameTime: 550,
    averageSpend: 22.50, // Mean of bettingHistory (25 + 20 + 25 + 20) / 4
    favoriteTeams: ['Chennai Super Kings', 'Mumbai Indians'],
    activeContests: 4,
    completedContests: 16,
    wins: 12, // Adjusted to match totalPoints
    totalPoints: 2800, // 400 from bettingHistory + 2400 from 12 additional wins (200 each)
    journey: [
      { timestamp: new Date('2025-03-05T00:00:00Z'), action: 'deposit', amount: 400.00 },
      { timestamp: new Date('2025-03-15T10:00:00Z'), action: 'deposit', amount: 100.00 },
      { timestamp: new Date('2025-04-01T12:00:00Z'), action: 'withdrawal_request', amount: 250.00 },
      { timestamp: new Date('2025-04-10T09:00:00Z'), action: 'deposit', amount: 80.00 },
      { timestamp: new Date('2025-05-01T11:00:00Z'), action: 'withdrawal_request', amount: 100.00 },
      { timestamp: new Date('2025-06-01T13:00:00Z'), action: 'deposit', amount: 120.00 },
      { timestamp: new Date('2025-06-15T14:00:00Z'), action: 'withdrawal_request', amount: 100.00 },
      { timestamp: new Date('2025-06-16T10:00:00Z'), action: 'joined_contest', contestId: 'C109' },
      { timestamp: new Date('2025-06-16T10:30:00Z'), action: 'placed_bet', amount: 25.00, outcome: 'win', pointsEarned: 200, contestId: 'C109' },
      { timestamp: new Date('2025-06-17T10:30:00Z'), action: 'placed_bet', amount: 20.00, outcome: 'win', pointsEarned: 200, contestId: 'C110' },
      { timestamp: new Date('2025-06-17T11:00:00Z'), action: 'placed_bet', amount: 25.00, outcome: 'loss', pointsEarned: 0, contestId: 'C111' },
      { timestamp: new Date('2025-06-18T10:00:00Z'), action: 'placed_bet', amount: 20.00, outcome: 'loss', pointsEarned: 0, contestId: 'C112' },
      { timestamp: new Date('2025-06-18T15:00:00Z'), action: 'login', duration: 300 },
      { timestamp: new Date('2025-06-18T15:30:00Z'), action: 'viewed_leaderboard', rank: 8 },
      { timestamp: new Date('2025-06-18T16:00:00Z'), action: 'logout' },
      { timestamp: new Date('2025-03-10T12:00:00Z'), action: 'won_contest', contestId: 'C113', pointsEarned: 200 },
      { timestamp: new Date('2025-04-01T12:00:00Z'), action: 'won_contest', contestId: 'C114', pointsEarned: 200 },
      { timestamp: new Date('2025-04-15T12:00:00Z'), action: 'won_contest', contestId: 'C115', pointsEarned: 200 },
      { timestamp: new Date('2025-05-01T12:00:00Z'), action: 'won_contest', contestId: 'C116', pointsEarned: 200 },
      { timestamp: new Date('2025-05-15T12:00:00Z'), action: 'won_contest', contestId: 'C117', pointsEarned: 200 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C118', pointsEarned: 200 },
      { timestamp: new Date('2025-06-05T12:00:00Z'), action: 'won_contest', contestId: 'C119', pointsEarned: 200 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C120', pointsEarned: 200 },
      { timestamp: new Date('2025-06-12T12:00:00Z'), action: 'won_contest', contestId: 'C121', pointsEarned: 200 },
      { timestamp: new Date('2025-06-15T12:00:00Z'), action: 'won_contest', contestId: 'C122', pointsEarned: 200 },
      { timestamp: new Date('2025-06-16T12:00:00Z'), action: 'won_contest', contestId: 'C123', pointsEarned: 200 },
      { timestamp: new Date('2025-06-17T12:00:00Z'), action: 'won_contest', contestId: 'C124', pointsEarned: 200 }
    ],
    referralCode: 'STRIKE99REF',
    referredUsers: 3,
    notificationsEnabled: true,
    preferredLanguage: 'en',
    deviceType: 'mobile',
    lastDeposit: { amount: 120.00, date: '2025-06-01T13:00:00Z' },
    bettingHistory: [
      { contestId: 'C109', amount: 25.00, outcome: 'win', date: '2025-06-16', pointsEarned: 200 },
      { contestId: 'C110', amount: 20.00, outcome: 'win', date: '2025-06-17', pointsEarned: 200 },
      { contestId: 'C111', amount: 25.00, outcome: 'loss', date: '2025-06-17', pointsEarned: 0 },
      { contestId: 'C112', amount: 20.00, outcome: 'loss', date: '2025-06-18', pointsEarned: 0 }
    ]
  },
  {
    userId: 'U011',
    username: 'BlitzKing',
    email: 'blitz@fantasy.com',
    registrationDate: '2025-04-10',
    lastLogin: '2025-06-18T18:00:00Z',
    totalDeposits: 190.00, // 100 + 30 + 20 + 40
    totalWithdrawals: 80.00, // 50 + 30
    balance: 110.00, // 190 - 80
    engagementScore: 0.60,
    gameTime: 250,
    averageSpend: 8.33, // Mean of bettingHistory (5 + 10 + 10) / 3
    favoriteTeams: ['Delhi Capitals', 'Lucknow Super Giants'],
    activeContests: 1,
    completedContests: 6,
    wins: 6, // Matches completed contests
    totalPoints: 900, // 150 from bettingHistory + 750 from 5 additional wins (150 each)
    journey: [
      { timestamp: new Date('2025-04-10T00:00:00Z'), action: 'deposit', amount: 100.00 },
      { timestamp: new Date('2025-04-20T10:00:00Z'), action: 'deposit', amount: 30.00 },
      { timestamp: new Date('2025-05-01T12:00:00Z'), action: 'withdrawal_request', amount: 50.00 },
      { timestamp: new Date('2025-05-15T09:00:00Z'), action: 'deposit', amount: 20.00 },
      { timestamp: new Date('2025-06-01T11:00:00Z'), action: 'deposit', amount: 40.00 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'withdrawal_request', amount: 30.00 },
      { timestamp: new Date('2025-06-17T10:00:00Z'), action: 'joined_contest', contestId: 'C125' },
      { timestamp: new Date('2025-06-17T10:30:00Z'), action: 'placed_bet', amount: 5.00, outcome: 'win', pointsEarned: 150, contestId: 'C125' },
      { timestamp: new Date('2025-06-18T10:30:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'loss', pointsEarned: 0, contestId: 'C126' },
      { timestamp: new Date('2025-06-18T11:00:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'loss', pointsEarned: 0, contestId: 'C127' },
      { timestamp: new Date('2025-06-18T17:00:00Z'), action: 'login', duration: 150 },
      { timestamp: new Date('2025-06-18T17:30:00Z'), action: 'viewed_leaderboard', rank: 60 },
      { timestamp: new Date('2025-06-18T18:00:00Z'), action: 'logout' },
      { timestamp: new Date('2025-04-15T12:00:00Z'), action: 'won_contest', contestId: 'C128', pointsEarned: 150 },
      { timestamp: new Date('2025-05-01T12:00:00Z'), action: 'won_contest', contestId: 'C129', pointsEarned: 150 },
      { timestamp: new Date('2025-05-15T12:00:00Z'), action: 'won_contest', contestId: 'C130', pointsEarned: 150 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C131', pointsEarned: 150 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C132', pointsEarned: 150 }
    ],
    referralCode: 'BLITZREF',
    referredUsers: 0,
    notificationsEnabled: false,
    preferredLanguage: 'hi',
    deviceType: 'desktop',
    lastDeposit: { amount: 40.00, date: '2025-06-01T11:00:00Z' },
    bettingHistory: [
      { contestId: 'C125', amount: 5.00, outcome: 'win', date: '2025-06-17', pointsEarned: 150 },
      { contestId: 'C126', amount: 10.00, outcome: 'loss', date: '2025-06-18', pointsEarned: 0 },
      { contestId: 'C127', amount: 10.00, outcome: 'loss', date: '2025-06-18', pointsEarned: 0 }
    ]
  },
  {
    userId: 'U012',
    username: 'ChasingStar',
    email: 'chaser@fantasy.com',
    registrationDate: '2025-05-01',
    lastLogin: '2025-06-18T20:00:00Z',
    totalDeposits: 400.00, // 250 + 50 + 50 + 50
    totalWithdrawals: 200.00, // 100 + 100
    balance: 200.00, // 400 - 200
    engagementScore: 0.75,
    gameTime: 400,
    averageSpend: 15.00, // Mean of bettingHistory (20 + 10 + 15) / 3
    favoriteTeams: ['Royal Challengers Bangalore', 'Gujarat Titans'],
    activeContests: 3,
    completedContests: 12,
    wins: 12, // Matches completed contests
    totalPoints: 2400, // 300 from bettingHistory + 2100 from 11 additional wins (190.91 each)
    journey: [
      { timestamp: new Date('2025-05-01T00:00:00Z'), action: 'deposit', amount: 250.00 },
      { timestamp: new Date('2025-05-10T10:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-05-15T12:00:00Z'), action: 'withdrawal_request', amount: 100.00 },
      { timestamp: new Date('2025-06-01T09:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-06-10T11:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-06-15T12:00:00Z'), action: 'withdrawal_request', amount: 100.00 },
      { timestamp: new Date('2025-06-16T10:00:00Z'), action: 'joined_contest', contestId: 'C133' },
      { timestamp: new Date('2025-06-16T10:30:00Z'), action: 'placed_bet', amount: 20.00, outcome: 'win', pointsEarned: 150, contestId: 'C133' },
      { timestamp: new Date('2025-06-17T10:30:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'win', pointsEarned: 150, contestId: 'C134' },
      { timestamp: new Date('2025-06-18T10:30:00Z'), action: 'placed_bet', amount: 15.00, outcome: 'loss', pointsEarned: 0, contestId: 'C135' },
      { timestamp: new Date('2025-06-18T19:00:00Z'), action: 'login', duration: 200 },
      { timestamp: new Date('2025-06-18T19:30:00Z'), action: 'viewed_leaderboard', rank: 20 },
      { timestamp: new Date('2025-06-18T20:00:00Z'), action: 'logout' },
      { timestamp: new Date('2025-05-01T12:00:00Z'), action: 'won_contest', contestId: 'C136', pointsEarned: 190.91 },
      { timestamp: new Date('2025-05-15T12:00:00Z'), action: 'won_contest', contestId: 'C137', pointsEarned: 190.91 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C138', pointsEarned: 190.91 },
      { timestamp: new Date('2025-06-05T12:00:00Z'), action: 'won_contest', contestId: 'C139', pointsEarned: 190.91 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C140', pointsEarned: 190.91 },
      { timestamp: new Date('2025-06-12T12:00:00Z'), action: 'won_contest', contestId: 'C141', pointsEarned: 190.91 },
      { timestamp: new Date('2025-06-13T12:00:00Z'), action: 'won_contest', contestId: 'C142', pointsEarned: 190.91 },
      { timestamp: new Date('2025-06-14T12:00:00Z'), action: 'won_contest', contestId: 'C143', pointsEarned: 190.91 },
      { timestamp: new Date('2025-06-15T12:00:00Z'), action: 'won_contest', contestId: 'C144', pointsEarned: 190.91 },
      { timestamp: new Date('2025-06-16T12:00:00Z'), action: 'won_contest', contestId: 'C145', pointsEarned: 190.91 },
      { timestamp: new Date('2025-06-17T12:00:00Z'), action: 'won_contest', contestId: 'C146', pointsEarned: 190.91 }
    ],
    referralCode: 'CHASERREF',
    referredUsers: 2,
    notificationsEnabled: true,
    preferredLanguage: 'en',
    deviceType: 'mobile',
    lastDeposit: { amount: 50.00, date: '2025-06-10T11:00:00Z' },
    bettingHistory: [
      { contestId: 'C133', amount: 20.00, outcome: 'win', date: '2025-06-16', pointsEarned: 150 },
      { contestId: 'C134', amount: 10.00, outcome: 'win', date: '2025-06-17', pointsEarned: 150 },
      { contestId: 'C135', amount: 15.00, outcome: 'loss', date: '2025-06-18', pointsEarned: 0 }
    ]
  },
  {
    userId: 'U013',
    username: 'BouncerBoss',
    email: 'bouncer@fantasy.com',
    registrationDate: '2025-05-15',
    lastLogin: '2025-06-18T22:00:00Z',
    totalDeposits: 230.00, // 150 + 30 + 50
    totalWithdrawals: 120.00, // 70 + 50
    balance: 110.00, // 230 - 120
    engagementScore: 0.65,
    gameTime: 280,
    averageSpend: 10.00, // Mean of bettingHistory (10 + 10 + 10) / 3
    favoriteTeams: ['Sunrisers Hyderabad', 'Kolkata Knight Riders'],
    activeContests: 2,
    completedContests: 8,
    wins: 8, // Matches completed contests
    totalPoints: 1400, // 150 from bettingHistory + 1250 from 7 additional wins (178.57 each)
    journey: [
      { timestamp: new Date('2025-05-15T00:00:00Z'), action: 'deposit', amount: 150.00 },
      { timestamp: new Date('2025-06-01T10:00:00Z'), action: 'deposit', amount: 30.00 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'withdrawal_request', amount: 70.00 },
      { timestamp: new Date('2025-06-15T09:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-06-16T10:00:00Z'), action: 'withdrawal_request', amount: 50.00 },
      { timestamp: new Date('2025-06-17T10:00:00Z'), action: 'joined_contest', contestId: 'C147' },
      { timestamp: new Date('2025-06-17T10:30:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'win', pointsEarned: 150, contestId: 'C147' },
      { timestamp: new Date('2025-06-18T10:30:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'loss', pointsEarned: 0, contestId: 'C148' },
      { timestamp: new Date('2025-06-18T11:00:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'loss', pointsEarned: 0, contestId: 'C149' },
      { timestamp: new Date('2025-06-18T21:00:00Z'), action: 'login', duration: 180 },
      { timestamp: new Date('2025-06-18T21:30:00Z'), action: 'viewed_leaderboard', rank: 35 },
      { timestamp: new Date('2025-06-18T22:00:00Z'), action: 'logout' },
      { timestamp: new Date('2025-05-20T12:00:00Z'), action: 'won_contest', contestId: 'C150', pointsEarned: 178.57 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C151', pointsEarned: 178.57 },
      { timestamp: new Date('2025-06-05T12:00:00Z'), action: 'won_contest', contestId: 'C152', pointsEarned: 178.57 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C153', pointsEarned: 178.57 },
      { timestamp: new Date('2025-06-12T12:00:00Z'), action: 'won_contest', contestId: 'C154', pointsEarned: 178.57 },
      { timestamp: new Date('2025-06-15T12:00:00Z'), action: 'won_contest', contestId: 'C155', pointsEarned: 178.57 },
      { timestamp: new Date('2025-06-17T12:00:00Z'), action: 'won_contest', contestId: 'C156', pointsEarned: 178.57 }
    ],
    referralCode: 'BOUNCERREF',
    referredUsers: 1,
    notificationsEnabled: true,
    preferredLanguage: 'en',
    deviceType: 'mobile',
    lastDeposit: { amount: 50.00, date: '2025-06-15T09:00:00Z' },
    bettingHistory: [
      { contestId: 'C147', amount: 10.00, outcome: 'win', date: '2025-06-17', pointsEarned: 150 },
      { contestId: 'C148', amount: 10.00, outcome: 'loss', date: '2025-06-18', pointsEarned: 0 },
      { contestId: 'C149', amount: 10.00, outcome: 'loss', date: '2025-06-18', pointsEarned: 0 }
    ]
  },
  {
    userId: 'U014',
    username: 'VictoryVibe',
    email: 'vibe@fantasy.com',
    registrationDate: '2025-06-01',
    lastLogin: '2025-06-18T23:59:00Z',
    totalDeposits: 300.00, // 200 + 50 + 50
    totalWithdrawals: 130.00, // 80 + 50
    balance: 170.00, // 300 - 130
    engagementScore: 0.80,
    gameTime: 320,
    averageSpend: 13.33, // Mean of bettingHistory (15 + 10 + 15) / 3
    favoriteTeams: ['Mumbai Indians', 'Rajasthan Royals'],
    activeContests: 3,
    completedContests: 9,
    wins: 9, // Matches completed contests
    totalPoints: 1800, // 300 from bettingHistory + 1500 from 8 additional wins (187.5 each)
    journey: [
      { timestamp: new Date('2025-06-01T00:00:00Z'), action: 'deposit', amount: 200.00 },
      { timestamp: new Date('2025-06-05T10:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'withdrawal_request', amount: 80.00 },
      { timestamp: new Date('2025-06-15T09:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-06-16T10:00:00Z'), action: 'withdrawal_request', amount: 50.00 },
      { timestamp: new Date('2025-06-17T10:00:00Z'), action: 'joined_contest', contestId: 'C157' },
      { timestamp: new Date('2025-06-17T10:30:00Z'), action: 'placed_bet', amount: 15.00, outcome: 'win', pointsEarned: 150, contestId: 'C157' },
      { timestamp: new Date('2025-06-18T10:30:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'win', pointsEarned: 150, contestId: 'C158' },
      { timestamp: new Date('2025-06-18T11:00:00Z'), action: 'placed_bet', amount: 15.00, outcome: 'loss', pointsEarned: 0, contestId: 'C159' },
      { timestamp: new Date('2025-06-18T23:00:00Z'), action: 'login', duration: 200 },
      { timestamp: new Date('2025-06-18T23:30:00Z'), action: 'viewed_leaderboard', rank: 15 },
      { timestamp: new Date('2025-06-18T23:59:00Z'), action: 'logout' },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C160', pointsEarned: 187.5 },
      { timestamp: new Date('2025-06-05T12:00:00Z'), action: 'won_contest', contestId: 'C161', pointsEarned: 187.5 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C162', pointsEarned: 187.5 },
      { timestamp: new Date('2025-06-12T12:00:00Z'), action: 'won_contest', contestId: 'C163', pointsEarned: 187.5 },
      { timestamp: new Date('2025-06-13T12:00:00Z'), action: 'won_contest', contestId: 'C164', pointsEarned: 187.5 },
      { timestamp: new Date('2025-06-14T12:00:00Z'), action: 'won_contest', contestId: 'C165', pointsEarned: 187.5 },
      { timestamp: new Date('2025-06-15T12:00:00Z'), action: 'won_contest', contestId: 'C166', pointsEarned: 187.5 },
      { timestamp: new Date('2025-06-17T12:00:00Z'), action: 'won_contest', contestId: 'C167', pointsEarned: 187.5 }
    ],
    referralCode: 'VIBEREF',
    referredUsers: 2,
    notificationsEnabled: true,
    preferredLanguage: 'en',
    deviceType: 'mobile',
    lastDeposit: { amount: 50.00, date: '2025-06-15T09:00:00Z' },
    bettingHistory: [
      { contestId: 'C157', amount: 15.00, outcome: 'win', date: '2025-06-17', pointsEarned: 150 },
      { contestId: 'C158', amount: 10.00, outcome: 'win', date: '2025-06-18', pointsEarned: 150 },
      { contestId: 'C159', amount: 15.00, outcome: 'loss', date: '2025-06-18', pointsEarned: 0 }
    ]
  },
  {
    userId: 'U015',
    username: 'SixerSultan',
    email: 'sultan@fantasy.com',
    registrationDate: '2025-02-01',
    lastLogin: '2025-06-19T10:00:00Z',
    totalDeposits: 350.00, // 200 + 60 + 50 + 40
    totalWithdrawals: 180.00, // 100 + 80
    balance: 170.00, // 350 - 180
    engagementScore: 0.73,
    gameTime: 360,
    averageSpend: 13.33, // Mean of bettingHistory (10 + 15 + 15) / 3
    favoriteTeams: ['Royal Challengers Bangalore', 'Chennai Super Kings'],
    activeContests: 2,
    completedContests: 11,
    wins: 11, // Matches completed contests
    totalPoints: 2200, // 300 from bettingHistory + 1900 from 10 additional wins (190 each)
    journey: [
      { timestamp: new Date('2025-02-01T00:00:00Z'), action: 'deposit', amount: 200.00 },
      { timestamp: new Date('2025-03-01T09:00:00Z'), action: 'deposit', amount: 60.00 },
      { timestamp: new Date('2025-03-15T12:00:00Z'), action: 'withdrawal_request', amount: 100.00 },
      { timestamp: new Date('2025-04-10T10:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-05-01T11:00:00Z'), action: 'withdrawal_request', amount: 80.00 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'deposit', amount: 40.00 },
      { timestamp: new Date('2025-06-17T09:00:00Z'), action: 'joined_contest', contestId: 'C168' },
      { timestamp: new Date('2025-06-17T09:30:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'win', pointsEarned: 150, contestId: 'C168' },
      { timestamp: new Date('2025-06-18T09:30:00Z'), action: 'placed_bet', amount: 15.00, outcome: 'win', pointsEarned: 150, contestId: 'C169' },
      { timestamp: new Date('2025-06-19T09:30:00Z'), action: 'placed_bet', amount: 15.00, outcome: 'loss', pointsEarned: 0, contestId: 'C170' },
      { timestamp: new Date('2025-06-19T09:00:00Z'), action: 'login', duration: 200 },
      { timestamp: new Date('2025-06-19T09:30:00Z'), action: 'viewed_leaderboard', rank: 22 },
      { timestamp: new Date('2025-06-19T10:00:00Z'), action: 'logout' },
      { timestamp: new Date('2025-02-15T12:00:00Z'), action: 'won_contest', contestId: 'C171', pointsEarned: 190 },
      { timestamp: new Date('2025-03-01T12:00:00Z'), action: 'won_contest', contestId: 'C172', pointsEarned: 190 },
      { timestamp: new Date('2025-03-15T12:00:00Z'), action: 'won_contest', contestId: 'C173', pointsEarned: 190 },
      { timestamp: new Date('2025-04-01T12:00:00Z'), action: 'won_contest', contestId: 'C174', pointsEarned: 190 },
      { timestamp: new Date('2025-04-15T12:00:00Z'), action: 'won_contest', contestId: 'C175', pointsEarned: 190 },
      { timestamp: new Date('2025-05-01T12:00:00Z'), action: 'won_contest', contestId: 'C176', pointsEarned: 190 },
      { timestamp: new Date('2025-05-15T12:00:00Z'), action: 'won_contest', contestId: 'C177', pointsEarned: 190 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C178', pointsEarned: 190 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C179', pointsEarned: 190 },
      { timestamp: new Date('2025-06-17T12:00:00Z'), action: 'won_contest', contestId: 'C180', pointsEarned: 190 }
    ],
    referralCode: 'SULTANREF',
    referredUsers: 1,
    notificationsEnabled: true,
    preferredLanguage: 'en',
    deviceType: 'mobile',
    lastDeposit: { amount: 40.00, date: '2025-06-01T12:00:00Z' },
    bettingHistory: [
      { contestId: 'C168', amount: 10.00, outcome: 'win', date: '2025-06-17', pointsEarned: 150 },
      { contestId: 'C169', amount: 15.00, outcome: 'win', date: '2025-06-18', pointsEarned: 150 },
      { contestId: 'C170', amount: 15.00, outcome: 'loss', date: '2025-06-19', pointsEarned: 0 }
    ]
  },
  {
    userId: 'U016',
    username: 'FieldingFreak',
    email: 'freak@fantasy.com',
    registrationDate: '2025-03-01',
    lastLogin: '2025-06-19T12:30:00Z',
    totalDeposits: 270.00, // 150 + 50 + 30 + 40
    totalWithdrawals: 110.00, // 70 + 40
    balance: 160.00, // 270 - 110
    engagementScore: 0.67,
    gameTime: 310,
    averageSpend: 11.67, // Mean of bettingHistory (10 + 15 + 10) / 3
    favoriteTeams: ['Kolkata Knight Riders', 'Delhi Capitals'],
    activeContests: 1,
    completedContests: 8,
    wins: 8, // Matches completed contests
    totalPoints: 1400, // 180 from bettingHistory + 1220 from 7 additional wins (174.29 each)
    journey: [
      { timestamp: new Date('2025-03-01T00:00:00Z'), action: 'deposit', amount: 150.00 },
      { timestamp: new Date('2025-03-15T10:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-04-01T12:00:00Z'), action: 'withdrawal_request', amount: 70.00 },
      { timestamp: new Date('2025-05-01T09:00:00Z'), action: 'deposit', amount: 30.00 },
      { timestamp: new Date('2025-06-01T11:00:00Z'), action: 'deposit', amount: 40.00 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'withdrawal_request', amount: 40.00 },
      { timestamp: new Date('2025-06-18T09:00:00Z'), action: 'joined_contest', contestId: 'C181' },
      { timestamp: new Date('2025-06-18T09:30:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'win', pointsEarned: 180, contestId: 'C181' },
      { timestamp: new Date('2025-06-19T09:30:00Z'), action: 'placed_bet', amount: 15.00, outcome: 'loss', pointsEarned: 0, contestId: 'C182' },
      { timestamp: new Date('2025-06-19T10:00:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'loss', pointsEarned: 0, contestId: 'C183' },
      { timestamp: new Date('2025-06-19T11:30:00Z'), action: 'login', duration: 180 },
      { timestamp: new Date('2025-06-19T12:00:00Z'), action: 'viewed_leaderboard', rank: 45 },
      { timestamp: new Date('2025-06-19T12:30:00Z'), action: 'logout' },
      { timestamp: new Date('2025-03-10T12:00:00Z'), action: 'won_contest', contestId: 'C184', pointsEarned: 174.29 },
      { timestamp: new Date('2025-04-01T12:00:00Z'), action: 'won_contest', contestId: 'C185', pointsEarned: 174.29 },
      { timestamp: new Date('2025-04-15T12:00:00Z'), action: 'won_contest', contestId: 'C186', pointsEarned: 174.29 },
      { timestamp: new Date('2025-05-01T12:00:00Z'), action: 'won_contest', contestId: 'C187', pointsEarned: 174.29 },
      { timestamp: new Date('2025-05-15T12:00:00Z'), action: 'won_contest', contestId: 'C188', pointsEarned: 174.29 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C189', pointsEarned: 174.29 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C190', pointsEarned: 174.29 }
    ],
    referralCode: 'FREAKREF',
    referredUsers: 0,
    notificationsEnabled: false,
    preferredLanguage: 'hi',
    deviceType: 'desktop',
    lastDeposit: { amount: 40.00, date: '2025-06-01T11:00:00Z' },
    bettingHistory: [
      { contestId: 'C181', amount: 10.00, outcome: 'win', date: '2025-06-18', pointsEarned: 180 },
      { contestId: 'C182', amount: 15.00, outcome: 'loss', date: '2025-06-19', pointsEarned: 0 },
      { contestId: 'C183', amount: 10.00, outcome: 'loss', date: '2025-06-19', pointsEarned: 0 }
    ]
  },
  {
    userId: 'U017',
    username: 'BattingBlaze',
    email: 'blaze@fantasy.com',
    registrationDate: '2025-04-01',
    lastLogin: '2025-06-19T15:00:00Z',
    totalDeposits: 600.00, // 350 + 100 + 80 + 70
    totalWithdrawals: 400.00, // 200 + 100 + 100
    balance: 200.00, // 600 - 400
    engagementScore: 0.87,
    gameTime: 500,
    averageSpend: 20.00, // Mean of bettingHistory (25 + 20 + 15 + 20) / 4
    favoriteTeams: ['Mumbai Indians', 'Sunrisers Hyderabad'],
    activeContests: 4,
    completedContests: 15,
    wins: 12, // Adjusted to match totalPoints
    totalPoints: 2600, // 400 from bettingHistory + 2200 from 11 additional wins (200 each)
    journey: [
      { timestamp: new Date('2025-04-01T00:00:00Z'), action: 'deposit', amount: 350.00 },
      { timestamp: new Date('2025-04-15T10:00:00Z'), action: 'deposit', amount: 100.00 },
      { timestamp: new Date('2025-05-01T12:00:00Z'), action: 'withdrawal_request', amount: 200.00 },
      { timestamp: new Date('2025-05-10T09:00:00Z'), action: 'deposit', amount: 80.00 },
      { timestamp: new Date('2025-06-01T11:00:00Z'), action: 'deposit', amount: 70.00 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'withdrawal_request', amount: 100.00 },
      { timestamp: new Date('2025-06-15T12:00:00Z'), action: 'withdrawal_request', amount: 100.00 },
      { timestamp: new Date('2025-06-18T10:00:00Z'), action: 'joined_contest', contestId: 'C191' },
      { timestamp: new Date('2025-06-18T10:30:00Z'), action: 'placed_bet', amount: 25.00, outcome: 'win', pointsEarned: 200, contestId: 'C191' },
      { timestamp: new Date('2025-06-19T10:30:00Z'), action: 'placed_bet', amount: 20.00, outcome: 'win', pointsEarned: 200, contestId: 'C192' },
      { timestamp: new Date('2025-06-19T11:00:00Z'), action: 'placed_bet', amount: 15.00, outcome: 'loss', pointsEarned: 0, contestId: 'C193' },
      { timestamp: new Date('2025-06-19T11:30:00Z'), action: 'placed_bet', amount: 20.00, outcome: 'loss', pointsEarned: 0, contestId: 'C194' },
      { timestamp: new Date('2025-06-19T14:00:00Z'), action: 'login', duration: 250 },
      { timestamp: new Date('2025-06-19T14:30:00Z'), action: 'viewed_leaderboard', rank: 10 },
      { timestamp: new Date('2025-06-19T15:00:00Z'), action: 'logout' },
      { timestamp: new Date('2025-04-10T12:00:00Z'), action: 'won_contest', contestId: 'C195', pointsEarned: 200 },
      { timestamp: new Date('2025-04-15T12:00:00Z'), action: 'won_contest', contestId: 'C196', pointsEarned: 200 },
      { timestamp: new Date('2025-05-01T12:00:00Z'), action: 'won_contest', contestId: 'C197', pointsEarned: 200 },
      { timestamp: new Date('2025-05-15T12:00:00Z'), action: 'won_contest', contestId: 'C198', pointsEarned: 200 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C199', pointsEarned: 200 },
      { timestamp: new Date('2025-06-05T12:00:00Z'), action: 'won_contest', contestId: 'C200', pointsEarned: 200 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C201', pointsEarned: 200 },
      { timestamp: new Date('2025-06-12T12:00:00Z'), action: 'won_contest', contestId: 'C202', pointsEarned: 200 },
      { timestamp: new Date('2025-06-15T12:00:00Z'), action: 'won_contest', contestId: 'C203', pointsEarned: 200 },
      { timestamp: new Date('2025-06-17T12:00:00Z'), action: 'won_contest', contestId: 'C204', pointsEarned: 200 },
      { timestamp: new Date('2025-06-18T12:00:00Z'), action: 'won_contest', contestId: 'C205', pointsEarned: 200 }
    ],
    referralCode: 'BLAZEREF',
    referredUsers: 2,
    notificationsEnabled: true,
    preferredLanguage: 'en',
    deviceType: 'mobile',
    lastDeposit: { amount: 70.00, date: '2025-06-01T11:00:00Z' },
    bettingHistory: [
      { contestId: 'C191', amount: 25.00, outcome: 'win', date: '2025-06-18', pointsEarned: 200 },
      { contestId: 'C192', amount: 20.00, outcome: 'win', date: '2025-06-19', pointsEarned: 200 },
      { contestId: 'C193', amount: 15.00, outcome: 'loss', date: '2025-06-19', pointsEarned: 0 },
      { contestId: 'C194', amount: 20.00, outcome: 'loss', date: '2025-06-19', pointsEarned: 0 }
    ]
  },
  {
    userId: 'U018',
    username: 'CoverDriveKing',
    email: 'drive@fantasy.com',
    registrationDate: '2025-04-15',
    lastLogin: '2025-06-19T17:00:00Z',
    totalDeposits: 200.00, // 120 + 30 + 50
    totalWithdrawals: 90.00, // 50 + 40
    balance: 110.00, // 200 - 90
    engagementScore: 0.62,
    gameTime: 260,
    averageSpend: 8.33, // Mean of bettingHistory (5 + 10 + 10) / 3
    favoriteTeams: ['Punjab Kings', 'Gujarat Titans'],
    activeContests: 1,
    completedContests: 7,
    wins: 7, // Matches completed contests
    totalPoints: 1050, // 150 from bettingHistory + 900 from 6 additional wins (150 each)
    journey: [
      { timestamp: new Date('2025-04-15T00:00:00Z'), action: 'deposit', amount: 120.00 },
      { timestamp: new Date('2025-05-01T10:00:00Z'), action: 'deposit', amount: 30.00 },
      { timestamp: new Date('2025-05-15T12:00:00Z'), action: 'withdrawal_request', amount: 50.00 },
      { timestamp: new Date('2025-06-01T09:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-06-10T11:00:00Z'), action: 'withdrawal_request', amount: 40.00 },
      { timestamp: new Date('2025-06-18T10:00:00Z'), action: 'joined_contest', contestId: 'C206' },
      { timestamp: new Date('2025-06-18T10:30:00Z'), action: 'placed_bet', amount: 5.00, outcome: 'win', pointsEarned: 150, contestId: 'C206' },
      { timestamp: new Date('2025-06-19T10:30:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'loss', pointsEarned: 0, contestId: 'C207' },
      { timestamp: new Date('2025-06-19T11:00:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'loss', pointsEarned: 0, contestId: 'C208' },
      { timestamp: new Date('2025-06-19T16:00:00Z'), action: 'login', duration: 150 },
      { timestamp: new Date('2025-06-19T16:30:00Z'), action: 'viewed_leaderboard', rank: 55 },
      { timestamp: new Date('2025-06-19T17:00:00Z'), action: 'logout' },
      { timestamp: new Date('2025-04-20T12:00:00Z'), action: 'won_contest', contestId: 'C209', pointsEarned: 150 },
      { timestamp: new Date('2025-05-01T12:00:00Z'), action: 'won_contest', contestId: 'C210', pointsEarned: 150 },
      { timestamp: new Date('2025-05-15T12:00:00Z'), action: 'won_contest', contestId: 'C211', pointsEarned: 150 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C212', pointsEarned: 150 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C213', pointsEarned: 150 },
      { timestamp: new Date('2025-06-15T12:00:00Z'), action: 'won_contest', contestId: 'C214', pointsEarned: 150 }
    ],
    referralCode: 'DRIVEREF',
    referredUsers: 0,
    notificationsEnabled: false,
    preferredLanguage: 'hi',
    deviceType: 'desktop',
    lastDeposit: { amount: 50.00, date: '2025-06-01T09:00:00Z' },
    bettingHistory: [
      { contestId: 'C206', amount: 5.00, outcome: 'win', date: '2025-06-18', pointsEarned: 150 },
      { contestId: 'C207', amount: 10.00, outcome: 'loss', date: '2025-06-19', pointsEarned: 0 },
      { contestId: 'C208', amount: 10.00, outcome: 'loss', date: '2025-06-19', pointsEarned: 0 }
    ]
  },
  {
    userId: 'U019',
    username: 'RunRiser',
    email: 'riser@fantasy.com',
    registrationDate: '2025-05-01',
    lastLogin: '2025-06-19T19:00:00Z',
    totalDeposits: 450.00, // 300 + 50 + 50 + 50
    totalWithdrawals: 250.00, // 150 + 100
    balance: 200.00, // 450 - 250
    engagementScore: 0.78,
    gameTime: 420,
    averageSpend: 16.67, // Mean of bettingHistory (20 + 15 + 15) / 3
    favoriteTeams: ['Rajasthan Royals', 'Lucknow Super Giants'],
    activeContests: 3,
    completedContests: 13,
    wins: 13, // Matches completed contests
    totalPoints: 2600, // 300 from bettingHistory + 2300 from 12 additional wins (191.67 each)
    journey: [
      { timestamp: new Date('2025-05-01T00:00:00Z'), action: 'deposit', amount: 300.00 },
      { timestamp: new Date('2025-05-10T10:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-05-15T12:00:00Z'), action: 'withdrawal_request', amount: 150.00 },
      { timestamp: new Date('2025-06-01T09:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-06-10T11:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-06-15T12:00:00Z'), action: 'withdrawal_request', amount: 100.00 },
      { timestamp: new Date('2025-06-17T10:00:00Z'), action: 'joined_contest', contestId: 'C215' },
      { timestamp: new Date('2025-06-17T10:30:00Z'), action: 'placed_bet', amount: 20.00, outcome: 'win', pointsEarned: 150, contestId: 'C215' },
      { timestamp: new Date('2025-06-18T10:30:00Z'), action: 'placed_bet', amount: 15.00, outcome: 'win', pointsEarned: 150, contestId: 'C216' },
      { timestamp: new Date('2025-06-19T10:30:00Z'), action: 'placed_bet', amount: 15.00, outcome: 'loss', pointsEarned: 0, contestId: 'C217' },
      { timestamp: new Date('2025-06-19T18:00:00Z'), action: 'login', duration: 200 },
      { timestamp: new Date('2025-06-19T18:30:00Z'), action: 'viewed_leaderboard', rank: 18 },
      { timestamp: new Date('2025-06-19T19:00:00Z'), action: 'logout' },
      { timestamp: new Date('2025-05-01T12:00:00Z'), action: 'won_contest', contestId: 'C218', pointsEarned: 191.67 },
      { timestamp: new Date('2025-05-15T12:00:00Z'), action: 'won_contest', contestId: 'C219', pointsEarned: 191.67 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C220', pointsEarned: 191.67 },
      { timestamp: new Date('2025-06-05T12:00:00Z'), action: 'won_contest', contestId: 'C221', pointsEarned: 191.67 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C222', pointsEarned: 191.67 },
      { timestamp: new Date('2025-06-12T12:00:00Z'), action: 'won_contest', contestId: 'C223', pointsEarned: 191.67 },
      { timestamp: new Date('2025-06-13T12:00:00Z'), action: 'won_contest', contestId: 'C224', pointsEarned: 191.67 },
      { timestamp: new Date('2025-06-14T12:00:00Z'), action: 'won_contest', contestId: 'C225', pointsEarned: 191.67 },
      { timestamp: new Date('2025-06-15T12:00:00Z'), action: 'won_contest', contestId: 'C226', pointsEarned: 191.67 },
      { timestamp: new Date('2025-06-16T12:00:00Z'), action: 'won_contest', contestId: 'C227', pointsEarned: 191.67 },
      { timestamp: new Date('2025-06-17T12:00:00Z'), action: 'won_contest', contestId: 'C228', pointsEarned: 191.67 },
      { timestamp: new Date('2025-06-18T12:00:00Z'), action: 'won_contest', contestId: 'C229', pointsEarned: 191.67 }
    ],
    referralCode: 'RISERREF',
    referredUsers: 2,
    notificationsEnabled: true,
    preferredLanguage: 'en',
    deviceType: 'mobile',
    lastDeposit: { amount: 50.00, date: '2025-06-10T11:00:00Z' },
    bettingHistory: [
      { contestId: 'C215', amount: 20.00, outcome: 'win', date: '2025-06-17', pointsEarned: 150 },
      { contestId: 'C216', amount: 15.00, outcome: 'win', date: '2025-06-18', pointsEarned: 150 },
      { contestId: 'C217', amount: 15.00, outcome: 'loss', date: '2025-06-19', pointsEarned: 0 }
    ]
  },
  {
    userId: 'U020',
    username: 'SpinSorcerer',
    email: 'sorcerer@fantasy.com',
    registrationDate: '2025-05-15',
    lastLogin: '2025-06-19T21:00:00Z',
    totalDeposits: 240.00, // 150 + 40 + 50
    totalWithdrawals: 130.00, // 80 + 50
    balance: 110.00, // 240 - 130
    engagementScore: 0.66,
    gameTime: 290,
    averageSpend: 10.00, // Mean of bettingHistory (10 + 10 + 10) / 3
    favoriteTeams: ['Chennai Super Kings', 'Kolkata Knight Riders'],
    activeContests: 2,
    completedContests: 9,
    wins: 9, // Matches completed contests
    totalPoints: 1500, // 150 from bettingHistory + 1350 from 8 additional wins (168.75 each)
    journey: [
      { timestamp: new Date('2025-05-15T00:00:00Z'), action: 'deposit', amount: 150.00 },
      { timestamp: new Date('2025-06-01T10:00:00Z'), action: 'deposit', amount: 40.00 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'withdrawal_request', amount: 80.00 },
      { timestamp: new Date('2025-06-15T09:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-06-17T11:00:00Z'), action: 'withdrawal_request', amount: 50.00 },
      { timestamp: new Date('2025-06-18T10:00:00Z'), action: 'joined_contest', contestId: 'C230' },
      { timestamp: new Date('2025-06-18T10:30:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'win', pointsEarned: 150, contestId: 'C230' },
      { timestamp: new Date('2025-06-19T10:30:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'loss', pointsEarned: 0, contestId: 'C231' },
      { timestamp: new Date('2025-06-19T11:00:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'loss', pointsEarned: 0, contestId: 'C232' },
      { timestamp: new Date('2025-06-19T20:00:00Z'), action: 'login', duration: 180 },
      { timestamp: new Date('2025-06-19T20:30:00Z'), action: 'viewed_leaderboard', rank: 40 },
      { timestamp: new Date('2025-06-19T21:00:00Z'), action: 'logout' },
      { timestamp: new Date('2025-05-20T12:00:00Z'), action: 'won_contest', contestId: 'C233', pointsEarned: 168.75 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C234', pointsEarned: 168.75 },
      { timestamp: new Date('2025-06-05T12:00:00Z'), action: 'won_contest', contestId: 'C235', pointsEarned: 168.75 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C236', pointsEarned: 168.75 },
      { timestamp: new Date('2025-06-12T12:00:00Z'), action: 'won_contest', contestId: 'C237', pointsEarned: 168.75 },
      { timestamp: new Date('2025-06-15T12:00:00Z'), action: 'won_contest', contestId: 'C238', pointsEarned: 168.75 },
      { timestamp: new Date('2025-06-17T12:00:00Z'), action: 'won_contest', contestId: 'C239', pointsEarned: 168.75 },
      { timestamp: new Date('2025-06-18T12:00:00Z'), action: 'won_contest', contestId: 'C240', pointsEarned: 168.75 }
    ],
    referralCode: 'SORCERERREF',
    referredUsers: 1,
    notificationsEnabled: true,
    preferredLanguage: 'en',
    deviceType: 'mobile',
    lastDeposit: { amount: 50.00, date: '2025-06-15T09:00:00Z' },
    bettingHistory: [
      { contestId: 'C230', amount: 10.00, outcome: 'win', date: '2025-06-18', pointsEarned: 150 },
      { contestId: 'C231', amount: 10.00, outcome: 'loss', date: '2025-06-19', pointsEarned: 0 },
      { contestId: 'C232', amount: 10.00, outcome: 'loss', date: '2025-06-19', pointsEarned: 0 }
    ]
  },
  {
    userId: 'U021',
    username: 'WicketWarrior',
    email: 'warrior@fantasy.com',
    registrationDate: '2025-06-01',
    lastLogin: '2025-06-19T23:00:00Z',
    totalDeposits: 320.00, // 200 + 60 + 60
    totalWithdrawals: 150.00, // 100 + 50
    balance: 170.00, // 320 - 150
    engagementScore: 0.82,
    gameTime: 340,
    averageSpend: 13.33, // Mean of bettingHistory (15 + 10 + 15) / 3
    favoriteTeams: ['Delhi Capitals', 'Rajasthan Royals'],
    activeContests: 3,
    completedContests: 10,
    wins: 10, // Matches completed contests
    totalPoints: 1900, // 300 from bettingHistory + 1600 from 9 additional wins (177.78 each)
    journey: [
      { timestamp: new Date('2025-06-01T00:00:00Z'), action: 'deposit', amount: 200.00 },
      { timestamp: new Date('2025-06-05T10:00:00Z'), action: 'deposit', amount: 60.00 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'withdrawal_request', amount: 100.00 },
      { timestamp: new Date('2025-06-15T09:00:00Z'), action: 'deposit', amount: 60.00 },
      { timestamp: new Date('2025-06-17T11:00:00Z'), action: 'withdrawal_request', amount: 50.00 },
      { timestamp: new Date('2025-06-18T10:00:00Z'), action: 'joined_contest', contestId: 'C241' },
      { timestamp: new Date('2025-06-18T10:30:00Z'), action: 'placed_bet', amount: 15.00, outcome: 'win', pointsEarned: 150, contestId: 'C241' },
      { timestamp: new Date('2025-06-19T10:30:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'win', pointsEarned: 150, contestId: 'C242' },
      { timestamp: new Date('2025-06-19T11:00:00Z'), action: 'placed_bet', amount: 15.00, outcome: 'loss', pointsEarned: 0, contestId: 'C243' },
      { timestamp: new Date('2025-06-19T22:00:00Z'), action: 'login', duration: 200 },
      { timestamp: new Date('2025-06-19T22:30:00Z'), action: 'viewed_leaderboard', rank: 12 },
      { timestamp: new Date('2025-06-19T23:00:00Z'), action: 'logout' },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C244', pointsEarned: 177.78 },
      { timestamp: new Date('2025-06-05T12:00:00Z'), action: 'won_contest', contestId: 'C245', pointsEarned: 177.78 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C246', pointsEarned: 177.78 },
      { timestamp: new Date('2025-06-12T12:00:00Z'), action: 'won_contest', contestId: 'C247', pointsEarned: 177.78 },
      { timestamp: new Date('2025-06-13T12:00:00Z'), action: 'won_contest', contestId: 'C248', pointsEarned: 177.78 },
      { timestamp: new Date('2025-06-14T12:00:00Z'), action: 'won_contest', contestId: 'C249', pointsEarned: 177.78 },
      { timestamp: new Date('2025-06-15T12:00:00Z'), action: 'won_contest', contestId: 'C250', pointsEarned: 177.78 },
      { timestamp: new Date('2025-06-17T12:00:00Z'), action: 'won_contest', contestId: 'C251', pointsEarned: 177.78 },
      { timestamp: new Date('2025-06-18T12:00:00Z'), action: 'won_contest', contestId: 'C252', pointsEarned: 177.78 }
    ],
    referralCode: 'WARRIORREF',
    referredUsers: 2,
    notificationsEnabled: true,
    preferredLanguage: 'en',
    deviceType: 'mobile',
    lastDeposit: { amount: 60.00, date: '2025-06-15T09:00:00Z' },
    bettingHistory: [
      { contestId: 'C241', amount: 15.00, outcome: 'win', date: '2025-06-18', pointsEarned: 150 },
      { contestId: 'C242', amount: 10.00, outcome: 'win', date: '2025-06-19', pointsEarned: 150 },
      { contestId: 'C243', amount: 15.00, outcome: 'loss', date: '2025-06-19', pointsEarned: 0 }
    ]
  },
  {
    userId: 'U022',
    username: 'BoundaryBlaster',
    email: 'blaster@fantasy.com',
    registrationDate: '2025-01-10',
    lastLogin: '2025-06-19T22:00:00Z',
    totalDeposits: 380.00, // 250 + 50 + 40 + 40
    totalWithdrawals: 200.00, // 120 + 80
    balance: 180.00, // 380 - 200
    engagementScore: 0.74,
    gameTime: 370,
    averageSpend: 14.00, // Mean of bettingHistory (12 + 15 + 15) / 3
    favoriteTeams: ['Mumbai Indians', 'Kolkata Knight Riders'],
    activeContests: 2,
    completedContests: 12,
    wins: 12, // Matches completed contests
    totalPoints: 2400, // 300 from bettingHistory + 2100 from 11 additional wins (190.91 each)
    journey: [
      { timestamp: new Date('2025-01-10T00:00:00Z'), action: 'deposit', amount: 250.00 },
      { timestamp: new Date('2025-02-01T10:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-03-01T12:00:00Z'), action: 'withdrawal_request', amount: 120.00 },
      { timestamp: new Date('2025-04-01T09:00:00Z'), action: 'deposit', amount: 40.00 },
      { timestamp: new Date('2025-05-01T11:00:00Z'), action: 'withdrawal_request', amount: 80.00 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'deposit', amount: 40.00 },
      { timestamp: new Date('2025-06-17T09:00:00Z'), action: 'joined_contest', contestId: 'C253' },
      { timestamp: new Date('2025-06-17T09:30:00Z'), action: 'placed_bet', amount: 12.00, outcome: 'win', pointsEarned: 150, contestId: 'C253' },
      { timestamp: new Date('2025-06-18T09:30:00Z'), action: 'placed_bet', amount: 15.00, outcome: 'win', pointsEarned: 150, contestId: 'C254' },
      { timestamp: new Date('2025-06-19T09:30:00Z'), action: 'placed_bet', amount: 15.00, outcome: 'loss', pointsEarned: 0, contestId: 'C255' },
      { timestamp: new Date('2025-06-19T21:00:00Z'), action: 'login', duration: 200 },
      { timestamp: new Date('2025-06-19T21:30:00Z'), action: 'viewed_leaderboard', rank: 20 },
      { timestamp: new Date('2025-06-19T22:00:00Z'), action: 'logout' },
      { timestamp: new Date('2025-01-15T12:00:00Z'), action: 'won_contest', contestId: 'C256', pointsEarned: 190.91 },
      { timestamp: new Date('2025-02-01T12:00:00Z'), action: 'won_contest', contestId: 'C257', pointsEarned: 190.91 },
      { timestamp: new Date('2025-03-01T12:00:00Z'), action: 'won_contest', contestId: 'C258', pointsEarned: 190.91 },
      { timestamp: new Date('2025-04-01T12:00:00Z'), action: 'won_contest', contestId: 'C259', pointsEarned: 190.91 },
      { timestamp: new Date('2025-04-15T12:00:00Z'), action: 'won_contest', contestId: 'C260', pointsEarned: 190.91 },
      { timestamp: new Date('2025-05-01T12:00:00Z'), action: 'won_contest', contestId: 'C261', pointsEarned: 190.91 },
      { timestamp: new Date('2025-05-15T12:00:00Z'), action: 'won_contest', contestId: 'C262', pointsEarned: 190.91 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C263', pointsEarned: 190.91 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C264', pointsEarned: 190.91 },
      { timestamp: new Date('2025-06-15T12:00:00Z'), action: 'won_contest', contestId: 'C265', pointsEarned: 190.91 },
      { timestamp: new Date('2025-06-17T12:00:00Z'), action: 'won_contest', contestId: 'C266', pointsEarned: 190.91 }
    ],
    referralCode: 'BLASTERREF',
    referredUsers: 2,
    notificationsEnabled: true,
    preferredLanguage: 'en',
    deviceType: 'mobile',
    lastDeposit: { amount: 40.00, date: '2025-06-01T12:00:00Z' },
    bettingHistory: [
      { contestId: 'C253', amount: 12.00, outcome: 'win', date: '2025-06-17', pointsEarned: 150 },
      { contestId: 'C254', amount: 15.00, outcome: 'win', date: '2025-06-18', pointsEarned: 150 },
      { contestId: 'C255', amount: 15.00, outcome: 'loss', date: '2025-06-19', pointsEarned: 0 }
    ]
  },
  {
    userId: 'U023',
    username: 'StumpSmasher',
    email: 'smasher@fantasy.com',
    registrationDate: '2025-02-05',
    lastLogin: '2025-06-19T20:30:00Z',
    totalDeposits: 290.00, // 160 + 50 + 40 + 40
    totalWithdrawals: 120.00, // 80 + 40
    balance: 170.00, // 290 - 120
    engagementScore: 0.69,
    gameTime: 320,
    averageSpend: 11.67, // Mean of bettingHistory (10 + 15 + 10) / 3
    favoriteTeams: ['Chennai Super Kings', 'Rajasthan Royals'],
    activeContests: 1,
    completedContests: 9,
    wins: 9, // Matches completed contests
    totalPoints: 1500, // 180 from bettingHistory + 1320 from 8 additional wins (165 each)
    journey: [
      { timestamp: new Date('2025-02-05T00:00:00Z'), action: 'deposit', amount: 160.00 },
      { timestamp: new Date('2025-03-01T10:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-04-01T12:00:00Z'), action: 'withdrawal_request', amount: 80.00 },
      { timestamp: new Date('2025-05-01T09:00:00Z'), action: 'deposit', amount: 40.00 },
      { timestamp: new Date('2025-06-01T11:00:00Z'), action: 'deposit', amount: 40.00 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'withdrawal_request', amount: 40.00 },
      { timestamp: new Date('2025-06-18T09:00:00Z'), action: 'joined_contest', contestId: 'C267' },
      { timestamp: new Date('2025-06-18T09:30:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'win', pointsEarned: 180, contestId: 'C267' },
      { timestamp: new Date('2025-06-19T09:30:00Z'), action: 'placed_bet', amount: 15.00, outcome: 'loss', pointsEarned: 0, contestId: 'C268' },
      { timestamp: new Date('2025-06-19T10:00:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'loss', pointsEarned: 0, contestId: 'C269' },
      { timestamp: new Date('2025-06-19T19:30:00Z'), action: 'login', duration: 180 },
      { timestamp: new Date('2025-06-19T20:00:00Z'), action: 'viewed_leaderboard', rank: 42 },
      { timestamp: new Date('2025-06-19T20:30:00Z'), action: 'logout' },
      { timestamp: new Date('2025-02-15T12:00:00Z'), action: 'won_contest', contestId: 'C270', pointsEarned: 165 },
      { timestamp: new Date('2025-03-01T12:00:00Z'), action: 'won_contest', contestId: 'C271', pointsEarned: 165 },
      { timestamp: new Date('2025-04-01T12:00:00Z'), action: 'won_contest', contestId: 'C272', pointsEarned: 165 },
      { timestamp: new Date('2025-04-15T12:00:00Z'), action: 'won_contest', contestId: 'C273', pointsEarned: 165 },
      { timestamp: new Date('2025-05-01T12:00:00Z'), action: 'won_contest', contestId: 'C274', pointsEarned: 165 },
      { timestamp: new Date('2025-05-15T12:00:00Z'), action: 'won_contest', contestId: 'C275', pointsEarned: 165 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C276', pointsEarned: 165 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C277', pointsEarned: 165 }
    ],
    referralCode: 'SMASHERREF',
    referredUsers: 0,
    notificationsEnabled: false,
    preferredLanguage: 'hi',
    deviceType: 'desktop',
    lastDeposit: { amount: 40.00, date: '2025-06-01T11:00:00Z' },
    bettingHistory: [
      { contestId: 'C267', amount: 10.00, outcome: 'win', date: '2025-06-18', pointsEarned: 180 },
      { contestId: 'C268', amount: 15.00, outcome: 'loss', date: '2025-06-19', pointsEarned: 0 },
      { contestId: 'C269', amount: 10.00, outcome: 'loss', date: '2025-06-19', pointsEarned: 0 }
    ]
  },
  {
    userId: 'U024',
    username: 'PacePredator',
    email: 'predator@fantasy.com',
    registrationDate: '2025-03-15',
    lastLogin: '2025-06-19T18:00:00Z',
    totalDeposits: 650.00, // 400 + 100 + 80 + 70
    totalWithdrawals: 420.00, // 250 + 100 + 70
    balance: 230.00, // 650 - 420
    engagementScore: 0.88,
    gameTime: 520,
    averageSpend: 21.25, // Mean of bettingHistory (25 + 20 + 20 + 20) / 4
    favoriteTeams: ['Delhi Capitals', 'Sunrisers Hyderabad'],
    activeContests: 4,
    completedContests: 16,
    wins: 13, // Adjusted to match totalPoints
    totalPoints: 2800, // 400 from bettingHistory + 2400 from 12 additional wins (200 each)
    journey: [
      { timestamp: new Date('2025-03-15T00:00:00Z'), action: 'deposit', amount: 400.00 },
      { timestamp: new Date('2025-04-01T10:00:00Z'), action: 'deposit', amount: 100.00 },
      { timestamp: new Date('2025-04-15T12:00:00Z'), action: 'withdrawal_request', amount: 250.00 },
      { timestamp: new Date('2025-05-01T09:00:00Z'), action: 'deposit', amount: 80.00 },
      { timestamp: new Date('2025-06-01T11:00:00Z'), action: 'deposit', amount: 70.00 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'withdrawal_request', amount: 100.00 },
      { timestamp: new Date('2025-06-15T12:00:00Z'), action: 'withdrawal_request', amount: 70.00 },
      { timestamp: new Date('2025-06-17T10:00:00Z'), action: 'joined_contest', contestId: 'C278' },
      { timestamp: new Date('2025-06-17T10:30:00Z'), action: 'placed_bet', amount: 25.00, outcome: 'win', pointsEarned: 200, contestId: 'C278' },
      { timestamp: new Date('2025-06-18T10:30:00Z'), action: 'placed_bet', amount: 20.00, outcome: 'win', pointsEarned: 200, contestId: 'C279' },
      { timestamp: new Date('2025-06-19T10:30:00Z'), action: 'placed_bet', amount: 20.00, outcome: 'loss', pointsEarned: 0, contestId: 'C280' },
      { timestamp: new Date('2025-06-19T11:00:00Z'), action: 'placed_bet', amount: 20.00, outcome: 'loss', pointsEarned: 0, contestId: 'C281' },
      { timestamp: new Date('2025-06-19T17:00:00Z'), action: 'login', duration: 250 },
      { timestamp: new Date('2025-06-19T17:30:00Z'), action: 'viewed_leaderboard', rank: 9 },
      { timestamp: new Date('2025-06-19T18:00:00Z'), action: 'logout' },
      { timestamp: new Date('2025-03-20T12:00:00Z'), action: 'won_contest', contestId: 'C282', pointsEarned: 200 },
      { timestamp: new Date('2025-04-01T12:00:00Z'), action: 'won_contest', contestId: 'C283', pointsEarned: 200 },
      { timestamp: new Date('2025-04-15T12:00:00Z'), action: 'won_contest', contestId: 'C284', pointsEarned: 200 },
      { timestamp: new Date('2025-05-01T12:00:00Z'), action: 'won_contest', contestId: 'C285', pointsEarned: 200 },
      { timestamp: new Date ('2025-05-15T12:00:00Z'), action: 'won_contest', contestId: 'C286', pointsEarned: 200 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C287', pointsEarned: 200 },
      { timestamp: new Date('2025-06-05T12:00:00Z'), action: 'won_contest', contestId: 'C288', pointsEarned: 200 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C289', pointsEarned: 200 },
      { timestamp: new Date('2025-06-12T12:00:00Z'), action: 'won_contest', contestId: 'C290', pointsEarned: 200 },
      { timestamp: new Date('2025-06-15T12:00:00Z'), action: 'won_contest', contestId: 'C291', pointsEarned: 200 },
      { timestamp: new Date('2025-06-17T12:00:00Z'), action: 'won_contest', contestId: 'C292', pointsEarned: 200 },
      { timestamp: new Date('2025-06-18T12:00:00Z'), action: 'won_contest', contestId: 'C293', pointsEarned: 200 }
    ],
    referralCode: 'PREDATORREF',
    referredUsers: 3,
    notificationsEnabled: true,
    preferredLanguage: 'en',
    deviceType: 'mobile',
    lastDeposit: { amount: 70.00, date: '2025-06-01T11:00:00Z' },
    bettingHistory: [
      { contestId: 'C278', amount: 25.00, outcome: 'win', date: '2025-06-17', pointsEarned: 200 },
      { contestId: 'C279', amount: 20.00, outcome: 'win', date: '2025-06-18', pointsEarned: 200 },
      { contestId: 'C280', amount: 20.00, outcome: 'loss', date: '2025-06-19', pointsEarned: 0 },
      { contestId: 'C281', amount: 20.00, outcome: 'loss', date: '2025-06-19', pointsEarned: 0 }
    ]
  },
  {
    userId: 'U025',
    username: 'CatchCrafter',
    email: 'crafter@fantasy.com',
    registrationDate: '2025-04-10',
    lastLogin: '2025-06-19T16:00:00Z',
    totalDeposits: 210.00, // 130 + 30 + 50
    totalWithdrawals: 100.00, // 60 + 40
    balance: 110.00, // 210 - 100
    engagementScore: 0.61,
    gameTime: 270,
    averageSpend: 8.33, // Mean of bettingHistory (5 + 10 + 10) / 3
    favoriteTeams: ['Punjab Kings', 'Lucknow Super Giants'],
    activeContests: 1,
    completedContests: 6,
    wins: 6, // Matches completed contests
    totalPoints: 900, // 150 from bettingHistory + 750 from 5 additional wins (150 each)
    journey: [
      { timestamp: new Date('2025-04-10T00:00:00Z'), action: 'deposit', amount: 130.00 },
      { timestamp: new Date('2025-05-01T10:00:00Z'), action: 'deposit', amount: 30.00 },
      { timestamp: new Date('2025-05-15T12:00:00Z'), action: 'withdrawal_request', amount: 60.00 },
      { timestamp: new Date('2025-06-01T09:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-06-10T11:00:00Z'), action: 'withdrawal_request', amount: 40.00 },
      { timestamp: new Date('2025-06-18T10:00:00Z'), action: 'joined_contest', contestId: 'C294' },
      { timestamp: new Date('2025-06-18T10:30:00Z'), action: 'placed_bet', amount: 5.00, outcome: 'win', pointsEarned: 150, contestId: 'C294' },
      { timestamp: new Date('2025-06-19T10:30:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'loss', pointsEarned: 0, contestId: 'C295' },
      { timestamp: new Date('2025-06-19T11:00:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'loss', pointsEarned: 0, contestId: 'C296' },
      { timestamp: new Date('2025-06-19T15:00:00Z'), action: 'login', duration: 150 },
      { timestamp: new Date('2025-06-19T15:30:00Z'), action: 'viewed_leaderboard', rank: 60 },
      { timestamp: new Date('2025-06-19T16:00:00Z'), action: 'logout' },
      { timestamp: new Date('2025-04-15T12:00:00Z'), action: 'won_contest', contestId: 'C297', pointsEarned: 150 },
      { timestamp: new Date('2025-05-01T12:00:00Z'), action: 'won_contest', contestId: 'C298', pointsEarned: 150 },
      { timestamp: new Date('2025-05-15T12:00:00Z'), action: 'won_contest', contestId: 'C299', pointsEarned: 150 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C300', pointsEarned: 150 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C301', pointsEarned: 150 }
    ],
    referralCode: 'CRAFTERREF',
    referredUsers: 0,
    notificationsEnabled: false,
    preferredLanguage: 'hi',
    deviceType: 'desktop',
    lastDeposit: { amount: 50.00, date: '2025-06-01T09:00:00Z' },
    bettingHistory: [
      { contestId: 'C294', amount: 5.00, outcome: 'win', date: '2025-06-18', pointsEarned: 150 },
      { contestId: 'C295', amount: 10.00, outcome: 'loss', date: '2025-06-19', pointsEarned: 0 },
      { contestId: 'C296', amount: 10.00, outcome: 'loss', date: '2025-06-19', pointsEarned: 0 }
    ]
  },
  {
    userId: 'U026',
    username: 'RunRuler',
    email: 'ruler@fantasy.com',
    registrationDate: '2025-05-01',
    lastLogin: '2025-06-19T14:00:00Z',
    totalDeposits: 470.00, // 300 + 70 + 50 + 50
    totalWithdrawals: 260.00, // 150 + 110
    balance: 210.00, // 470 - 260
    engagementScore: 0.79,
    gameTime: 430,
    averageSpend: 16.67, // Mean of bettingHistory (20 + 15 + 15) / 3
    favoriteTeams: ['Royal Challengers Bangalore', 'Gujarat Titans'],
    activeContests: 3,
    completedContests: 14,
    wins: 14, // Matches completed contests
    totalPoints: 2700, // 300 from bettingHistory + 2400 from 13 additional wins (184.62 each)
    journey: [
      { timestamp: new Date('2025-05-01T00:00:00Z'), action: 'deposit', amount: 300.00 },
      { timestamp: new Date('2025-05-10T10:00:00Z'), action: 'deposit', amount: 70.00 },
      { timestamp: new Date('2025-05-15T12:00:00Z'), action: 'withdrawal_request', amount: 150.00 },
      { timestamp: new Date('2025-06-01T09:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-06-10T11:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-06-15T12:00:00Z'), action: 'withdrawal_request', amount: 110.00 },
      { timestamp: new Date('2025-06-17T10:00:00Z'), action: 'joined_contest', contestId: 'C302' },
      { timestamp: new Date('2025-06-17T10:30:00Z'), action: 'placed_bet', amount: 20.00, outcome: 'win', pointsEarned: 150, contestId: 'C302' },
      { timestamp: new Date('2025-06-18T10:30:00Z'), action: 'placed_bet', amount: 15.00, outcome: 'win', pointsEarned: 150, contestId: 'C303' },
      { timestamp: new Date('2025-06-19T10:30:00Z'), action: 'placed_bet', amount: 15.00, outcome: 'loss', pointsEarned: 0, contestId: 'C304' },
      { timestamp: new Date('2025-06-19T13:00:00Z'), action: 'login', duration: 200 },
      { timestamp: new Date('2025-06-19T13:30:00Z'), action: 'viewed_leaderboard', rank: 17 },
      { timestamp: new Date('2025-06-19T14:00:00Z'), action: 'logout' },
      { timestamp: new Date('2025-05-01T12:00:00Z'), action: 'won_contest', contestId: 'C305', pointsEarned: 184.62 },
      { timestamp: new Date('2025-05-15T12:00:00Z'), action: 'won_contest', contestId: 'C306', pointsEarned: 184.62 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C307', pointsEarned: 184.62 },
      { timestamp: new Date('2025-06-05T12:00:00Z'), action: 'won_contest', contestId: 'C308', pointsEarned: 184.62 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C309', pointsEarned: 184.62 },
      { timestamp: new Date('2025-06-12T12:00:00Z'), action: 'won_contest', contestId: 'C310', pointsEarned: 184.62 },
      { timestamp: new Date('2025-06-13T12:00:00Z'), action: 'won_contest', contestId: 'C311', pointsEarned: 184.62 },
      { timestamp: new Date('2025-06-14T12:00:00Z'), action: 'won_contest', contestId: 'C312', pointsEarned: 184.62 },
      { timestamp: new Date('2025-06-15T12:00:00Z'), action: 'won_contest', contestId: 'C313', pointsEarned: 184.62 },
      { timestamp: new Date('2025-06-16T12:00:00Z'), action: 'won_contest', contestId: 'C314', pointsEarned: 184.62 },
      { timestamp: new Date('2025-06-17T12:00:00Z'), action: 'won_contest', contestId: 'C315', pointsEarned: 184.62 },
      { timestamp: new Date('2025-06-18T12:00:00Z'), action: 'won_contest', contestId: 'C316', pointsEarned: 184.62 },
      { timestamp: new Date('2025-06-19T12:00:00Z'), action: 'won_contest', contestId: 'C317', pointsEarned: 184.62 }
    ],
    referralCode: 'RULERREF',
    referredUsers: 2,
    notificationsEnabled: true,
    preferredLanguage: 'en',
    deviceType: 'mobile',
    lastDeposit: { amount: 50.00, date: '2025-06-10T11:00:00Z' },
    bettingHistory: [
      { contestId: 'C302', amount: 20.00, outcome: 'win', date: '2025-06-17', pointsEarned: 150 },
      { contestId: 'C303', amount: 15.00, outcome: 'win', date: '2025-06-18', pointsEarned: 150 },
      { contestId: 'C304', amount: 15.00, outcome: 'loss', date: '2025-06-19', pointsEarned: 0 }
    ]
  },
  {
    userId: 'U027',
    username: 'SwingSultan',
    email: 'swing@fantasy.com',
    registrationDate: '2025-05-15',
    lastLogin: '2025-06-19T12:00:00Z',
    totalDeposits: 250.00, // 160 + 40 + 50
    totalWithdrawals: 140.00, // 80 + 60
    balance: 110.00, // 250 - 140
    engagementScore: 0.67,
    gameTime: 300,
    averageSpend: 10.00, // Mean of bettingHistory (10 + 10 + 10) / 3
    favoriteTeams: ['Kolkata Knight Riders', 'Mumbai Indians'],
    activeContests: 2,
    completedContests: 8,
    wins: 8, // Matches completed contests
    totalPoints: 1400, // 150 from bettingHistory + 1250 from 7 additional wins (178.57 each)
    journey: [
      { timestamp: new Date('2025-05-15T00:00:00Z'), action: 'deposit', amount: 160.00 },
      { timestamp: new Date('2025-06-01T10:00:00Z'), action: 'deposit', amount: 40.00 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'withdrawal_request', amount: 80.00 },
      { timestamp: new Date('2025-06-15T09:00:00Z'), action: 'deposit', amount: 50.00 },
      { timestamp: new Date('2025-06-17T11:00:00Z'), action: 'withdrawal_request', amount: 60.00 },
      { timestamp: new Date('2025-06-18T10:00:00Z'), action: 'joined_contest', contestId: 'C318' },
      { timestamp: new Date('2025-06-18T10:30:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'win', pointsEarned: 150, contestId: 'C318' },
      { timestamp: new Date('2025-06-19T10:30:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'loss', pointsEarned: 0, contestId: 'C319' },
      { timestamp: new Date('2025-06-19T11:00:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'loss', pointsEarned: 0, contestId: 'C320' },
      { timestamp: new Date('2025-06-19T11:00:00Z'), action: 'login', duration: 180 },
      { timestamp: new Date('2025-06-19T11:30:00Z'), action: 'viewed_leaderboard', rank: 38 },
      { timestamp: new Date('2025-06-19T12:00:00Z'), action: 'logout' },
      { timestamp: new Date('2025-05-20T12:00:00Z'), action: 'won_contest', contestId: 'C321', pointsEarned: 178.57 },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C322', pointsEarned: 178.57 },
      { timestamp: new Date('2025-06-05T12:00:00Z'), action: 'won_contest', contestId: 'C323', pointsEarned: 178.57 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C324', pointsEarned: 178.57 },
      { timestamp: new Date('2025-06-12T12:00:00Z'), action: 'won_contest', contestId: 'C325', pointsEarned: 178.57 },
      { timestamp: new Date('2025-06-15T12:00:00Z'), action: 'won_contest', contestId: 'C326', pointsEarned: 178.57 },
      { timestamp: new Date('2025-06-17T12:00:00Z'), action: 'won_contest', contestId: 'C327', pointsEarned: 178.57 }
    ],
    referralCode: 'SWINGREF',
    referredUsers: 1,
    notificationsEnabled: true,
    preferredLanguage: 'en',
    deviceType: 'mobile',
    lastDeposit: { amount: 50.00, date: '2025-06-15T09:00:00Z' },
    bettingHistory: [
      { contestId: 'C318', amount: 10.00, outcome: 'win', date: '2025-06-18', pointsEarned: 150 },
      { contestId: 'C319', amount: 10.00, outcome: 'loss', date: '2025-06-19', pointsEarned: 0 },
      { timestamp: new Date('2025-06-19T11:00:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'loss', pointsEarned: 0, contestId: 'C320' }
    ]
  },
  {
    userId: 'U028',
    username: 'VictoryVoyage',
    email: 'voyage@fantasy.com',
    registrationDate: '2025-06-01',
    lastLogin: '2025-06-19T10:00:00Z',
    totalDeposits: 340.00, // 220 + 60 + 60
    totalWithdrawals: 160.00, // 100 + 60
    balance: 180.00, // 340 - 160
    engagementScore: 0.81,
    gameTime: 350,
    averageSpend: 13.33, // Mean of bettingHistory (15 + 10 + 15) / 3
    favoriteTeams: ['Rajasthan Royals', 'Chennai Super Kings'],
    activeContests: 3,
    completedContests: 11,
    wins: 11, // Matches completed contests
    totalPoints: 2000, // 300 from bettingHistory + 1700 from 10 additional wins (170 each)
    journey: [
      { timestamp: new Date('2025-06-01T00:00:00Z'), action: 'deposit', amount: 220.00 },
      { timestamp: new Date('2025-06-05T10:00:00Z'), action: 'deposit', amount: 60.00 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'withdrawal_request', amount: 100.00 },
      { timestamp: new Date('2025-06-15T09:00:00Z'), action: 'deposit', amount: 60.00 },
      { timestamp: new Date('2025-06-17T11:00:00Z'), action: 'withdrawal_request', amount: 60.00 },
      { timestamp: new Date('2025-06-18T10:00:00Z'), action: 'joined_contest', contestId: 'C328' },
      { timestamp: new Date('2025-06-18T10:30:00Z'), action: 'placed_bet', amount: 15.00, outcome: 'win', pointsEarned: 150, contestId: 'C328' },
      { timestamp: new Date('2025-06-19T10:30:00Z'), action: 'placed_bet', amount: 10.00, outcome: 'win', pointsEarned: 150, contestId: 'C329' },
      { timestamp: new Date('2025-06-19T11:00:00Z'), action: 'placed_bet', amount: 15.00, outcome: 'loss', pointsEarned: 0, contestId: 'C330' },
      { timestamp: new Date('2025-06-19T09:00:00Z'), action: 'login', duration: 200 },
      { timestamp: new Date('2025-06-19T09:30:00Z'), action: 'viewed_leaderboard', rank: 14 },
      { timestamp: new Date('2025-06-19T10:00:00Z'), action: 'logout' },
      { timestamp: new Date('2025-06-01T12:00:00Z'), action: 'won_contest', contestId: 'C331', pointsEarned: 170 },
      { timestamp: new Date('2025-06-05T12:00:00Z'), action: 'won_contest', contestId: 'C332', pointsEarned: 170 },
      { timestamp: new Date('2025-06-10T12:00:00Z'), action: 'won_contest', contestId: 'C333', pointsEarned: 170 },
      { timestamp: new Date('2025-06-12T12:00:00Z'), action: 'won_contest', contestId: 'C334', pointsEarned: 170 },
      { timestamp: new Date('2025-06-13T12:00:00Z'), action: 'won_contest', contestId: 'C335', pointsEarned: 170 },
      { timestamp: new Date('2025-06-14T12:00:00Z'), action: 'won_contest', contestId: 'C336', pointsEarned: 170 },
      { timestamp: new Date('2025-06-15T12:00:00Z'), action: 'won_contest', contestId: 'C337', pointsEarned: 170 },
      { timestamp: new Date('2025-06-16T12:00:00Z'), action: 'won_contest', contestId: 'C338', pointsEarned: 170 },
      { timestamp: new Date('2025-06-17T12:00:00Z'), action: 'won_contest', contestId: 'C339', pointsEarned: 170 },
      { timestamp: new Date('2025-06-18T12:00:00Z'), action: 'won_contest', contestId: 'C340', pointsEarned: 170 }
    ],
    referralCode: 'VOYAGEREF',
    referredUsers: 2,
    notificationsEnabled: true,
    preferredLanguage: 'en',
    deviceType: 'mobile',
    lastDeposit: { amount: 60.00, date: '2025-06-15T09:00:00Z' },
    bettingHistory: [
      { contestId: 'C328', amount: 15.00, outcome: 'win', date: '2025-06-18', pointsEarned: 150 },
      { contestId: 'C329', amount: 10.00, outcome: 'win', date: '2025-06-19', pointsEarned: 150 },
      { contestId: 'C330', amount: 15.00, outcome: 'loss', date: '2025-06-19', pointsEarned: 0 }
    ]
  }
];

module.exports = { users };