// Mock data for fraud detection app

export const mockTransactions = [
  {
    id: "TXN001",
    amount: 1250.50,
    merchant: "Amazon.com",
    location: "Seattle, WA",
    timestamp: "2026-07-17T10:30:00Z",
    status: "approved",
    riskScore: 15,
    cardLast4: "4532",
    category: "Shopping",
    fraudType: null
  },
  {
    id: "TXN002",
    amount: 5420.00,
    merchant: "Unknown Merchant",
    location: "Lagos, Nigeria",
    timestamp: "2026-07-17T09:15:00Z",
    status: "flagged",
    riskScore: 92,
    cardLast4: "8765",
    category: "Wire Transfer",
    fraudType: "Suspicious Location"
  },
  {
    id: "TXN003",
    amount: 45.99,
    merchant: "Starbucks",
    location: "New York, NY",
    timestamp: "2026-07-17T08:45:00Z",
    status: "approved",
    riskScore: 8,
    cardLast4: "4532",
    category: "Food & Dining",
    fraudType: null
  },
  {
    id: "TXN004",
    amount: 9999.99,
    merchant: "Crypto Exchange XYZ",
    location: "Unknown",
    timestamp: "2026-07-17T07:20:00Z",
    status: "blocked",
    riskScore: 98,
    cardLast4: "2341",
    category: "Cryptocurrency",
    fraudType: "High Risk Amount"
  },
  {
    id: "TXN005",
    amount: 129.00,
    merchant: "Netflix",
    location: "Los Angeles, CA",
    timestamp: "2026-07-17T06:00:00Z",
    status: "approved",
    riskScore: 5,
    cardLast4: "4532",
    category: "Entertainment",
    fraudType: null
  },
  {
    id: "TXN006",
    amount: 3500.00,
    merchant: "Wire Transfer",
    location: "Moscow, Russia",
    timestamp: "2026-07-17T05:30:00Z",
    status: "flagged",
    riskScore: 87,
    cardLast4: "7890",
    category: "Wire Transfer",
    fraudType: "Unusual Pattern"
  },
  {
    id: "TXN007",
    amount: 78.50,
    merchant: "Target",
    location: "Chicago, IL",
    timestamp: "2026-07-17T04:15:00Z",
    status: "approved",
    riskScore: 12,
    cardLast4: "4532",
    category: "Shopping",
    fraudType: null
  },
  {
    id: "TXN008",
    amount: 15000.00,
    merchant: "Luxury Watches Ltd",
    location: "Dubai, UAE",
    timestamp: "2026-07-17T03:00:00Z",
    status: "flagged",
    riskScore: 75,
    cardLast4: "1234",
    category: "Luxury Goods",
    fraudType: "High Value Transaction"
  },
  {
    id: "TXN009",
    amount: 32.99,
    merchant: "Uber",
    location: "San Francisco, CA",
    timestamp: "2026-07-17T02:30:00Z",
    status: "approved",
    riskScore: 10,
    cardLast4: "4532",
    category: "Transportation",
    fraudType: null
  },
  {
    id: "TXN010",
    amount: 2250.00,
    merchant: "International Wire",
    location: "Unknown",
    timestamp: "2026-07-17T01:00:00Z",
    status: "blocked",
    riskScore: 95,
    cardLast4: "5678",
    category: "Wire Transfer",
    fraudType: "Account Takeover Suspected"
  }
];

export const mockStats = {
  totalTransactions: 1247,
  flaggedTransactions: 89,
  blockedTransactions: 23,
  approvedTransactions: 1135,
  totalAmount: 1543298.50,
  averageRiskScore: 24.5,
  fraudPrevented: 234500.00
};

// Currency conversion rate (1 USD = 83 INR approximately)
export const USD_TO_INR = 83;

// Helper function to format currency in both USD and INR
export const formatDualCurrency = (usdAmount) => {
  const inrAmount = usdAmount * USD_TO_INR;
  return {
    usd: `$${usdAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    inr: `₹${inrAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    usdValue: usdAmount,
    inrValue: inrAmount
  };
};

export const mockAlerts = [
  {
    id: "ALT001",
    type: "high_risk",
    message: "Multiple high-value transactions detected from unusual location",
    timestamp: "2026-07-17T09:45:00Z",
    severity: "critical"
  },
  {
    id: "ALT002",
    type: "velocity",
    message: "Transaction velocity exceeded normal pattern",
    timestamp: "2026-07-17T08:30:00Z",
    severity: "warning"
  },
  {
    id: "ALT003",
    type: "location",
    message: "Geolocation mismatch detected",
    timestamp: "2026-07-17T07:15:00Z",
    severity: "warning"
  }
];
