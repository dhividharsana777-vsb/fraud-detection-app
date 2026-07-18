import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { mockTransactions, mockStats, mockAlerts } from '../mockData';
import { toast } from '../hooks/use-toast';
import { 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  DollarSign, 
  Activity,
  Search,
  Filter,
  LogOut,
  Shield,
  Eye,
  Clock,
  MapPin,
  Plus,
  CreditCard,
  Store,
  Sparkles
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [newTransaction, setNewTransaction] = useState({
    merchant: '',
    amount: '',
    location: '',
    cardLast4: '',
    category: 'Shopping'
  });

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');
    if (!isAuth) {
      navigate('/');
    } else {
      setTimeout(() => setIsLoaded(true), 100);
    }

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    navigate('/');
  };

  const getRiskColor = (score) => {
    if (score >= 80) return 'text-red-600 bg-red-100';
    if (score >= 50) return 'text-orange-600 bg-orange-100';
    if (score >= 30) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'approved': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'flagged': return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'blocked': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return null;
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      approved: 'bg-green-100 text-green-700 hover:bg-green-100',
      flagged: 'bg-orange-100 text-orange-700 hover:bg-orange-100',
      blocked: 'bg-red-100 text-red-700 hover:bg-red-100'
    };
    return variants[status] || 'bg-gray-100 text-gray-700';
  };

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = txn.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          txn.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || txn.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const username = localStorage.getItem('username') || 'User';

  // Function to analyze transaction and calculate risk
  const analyzeTransaction = (txn) => {
    let riskScore = 0;
    let fraudType = null;

    // High amount check
    if (txn.amount > 5000) {
      riskScore += 40;
      fraudType = 'High Value Transaction';
    }

    // Suspicious location check
    const suspiciousLocations = ['nigeria', 'russia', 'unknown'];
    if (suspiciousLocations.some(loc => txn.location.toLowerCase().includes(loc))) {
      riskScore += 35;
      fraudType = 'Suspicious Location';
    }

    // Crypto/Wire transfer check
    if (txn.merchant.toLowerCase().includes('crypto') || txn.merchant.toLowerCase().includes('wire')) {
      riskScore += 25;
      fraudType = fraudType || 'High Risk Merchant';
    }

    // Random variation
    riskScore += Math.floor(Math.random() * 20);

    // Determine status
    let status = 'approved';
    if (riskScore >= 90) {
      status = 'blocked';
    } else if (riskScore >= 60) {
      status = 'flagged';
    }

    return { riskScore: Math.min(riskScore, 99), status, fraudType };
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    setIsAnalyzing(true);

    setTimeout(() => {
      const analysis = analyzeTransaction(newTransaction);
      
      const transaction = {
        id: `TXN${String(transactions.length + 1).padStart(3, '0')}`,
        merchant: newTransaction.merchant,
        amount: parseFloat(newTransaction.amount),
        location: newTransaction.location,
        cardLast4: newTransaction.cardLast4,
        category: newTransaction.category,
        timestamp: new Date().toISOString(),
        ...analysis
      };

      setTransactions([transaction, ...transactions]);
      setIsAnalyzing(false);
      setShowAddTransaction(false);
      
      // Show the result
      setSelectedTransaction(transaction);
      
      // Reset form
      setNewTransaction({
        merchant: '',
        amount: '',
        location: '',
        cardLast4: '',
        category: 'Shopping'
      });

      toast({
        title: "Transaction Analyzed",
        description: `Risk Score: ${analysis.riskScore}% - Status: ${analysis.status}`,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Animated Background Cyber Elements */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-blue-600 text-xs font-mono animate-fall"
            style={{
              left: `${i * 6}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${8 + i * 0.6}s`
            }}
          >
            {Array.from({ length: 15 }, () => 
              ['0', '1', 'X'][Math.floor(Math.random() * 3)]
            ).join('')}
          </div>
        ))}
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-cyan-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${10 + i}s`
            }}
          ></div>
        ))}
      </div>

      {/* Animated Background Elements */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-float"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
        }}
      ></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-200/15 to-pink-200/15 rounded-full blur-3xl animate-float-delayed"></div>
      
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-lg relative z-10 animate-fade-in">
        {/* Scanning line effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-scan"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 animate-slide-in-right">
              <div className="bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-3 rounded-2xl shadow-lg hover:scale-110 transition-transform duration-300 animate-bounce-subtle relative">
                <Shield className="w-7 h-7 text-white" />
                <div className="absolute inset-0 rounded-2xl bg-cyan-400/30 animate-ping"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent animate-text-glow">Fraud Detection</h1>
                <p className="text-sm text-slate-600 flex items-center space-x-1">
                  <Activity className="w-3 h-3 animate-pulse text-green-500" />
                  <span>Real-time Transaction Monitoring</span>
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 animate-fade-in">
              <div className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-2 rounded-xl border border-blue-200/50 hover:scale-105 transition-transform duration-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-600">Welcome, <span className="font-bold text-slate-900">{username}</span></span>
              </div>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200 hover:scale-105"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Stats Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 stagger-children ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Transactions</CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{mockStats.totalTransactions}</div>
              <p className="text-xs text-slate-600 mt-2 flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>Last 24 hours</span>
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-orange-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Flagged</CardTitle>
              <div className="p-2 bg-orange-100 rounded-lg animate-pulse">
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-orange-600">{mockStats.flaggedTransactions}</div>
              <p className="text-xs text-slate-600 mt-2 flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>Requires review</span>
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-red-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Blocked</CardTitle>
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-red-600">{mockStats.blockedTransactions}</div>
              <p className="text-xs text-slate-600 mt-2 flex items-center space-x-1">
                <Shield className="w-3 h-3" />
                <span>Fraud prevented</span>
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-green-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Fraud Prevented</CardTitle>
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600">${mockStats.fraudPrevented.toLocaleString()}</div>
              <p className="text-xs text-slate-600 mt-2">Potential loss saved</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Transaction Button */}
        <div className="mb-8 animate-fade-in">
          <Button
            onClick={() => setShowAddTransaction(true)}
            className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-6 px-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-3 relative overflow-hidden group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            <span>Analyze New Transaction</span>
            <Sparkles className="w-5 h-5 animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Button>
        </div>

        {/* Alerts Section */}
        <Card className="border-0 shadow-xl mb-8 bg-white/80 backdrop-blur-sm animate-fade-in hover:shadow-2xl transition-all duration-300">
          <CardHeader className="border-b border-orange-100 bg-gradient-to-r from-orange-50 to-red-50">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-orange-600 animate-pulse" />
              </div>
              <span className="text-lg">Recent Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {mockAlerts.map((alert, index) => (
                <div 
                  key={alert.id} 
                  className="flex items-start space-x-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`p-2 rounded-lg ${alert.severity === 'critical' ? 'bg-red-100' : 'bg-orange-100'}`}>
                    <AlertCircle className={`w-5 h-5 ${alert.severity === 'critical' ? 'text-red-600' : 'text-orange-600'}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">{alert.message}</p>
                    <p className="text-xs text-slate-600 mt-1 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(alert.timestamp).toLocaleString()}</span>
                    </p>
                  </div>
                  <Badge className={`${alert.severity === 'critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'} hover:scale-110 transition-transform duration-200`}>
                    {alert.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transactions Section */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm animate-fade-in hover:shadow-2xl transition-all duration-300">
          <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-blue-50 to-cyan-50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-lg">Recent Transactions</span>
              </CardTitle>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64 group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                  <Input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <Filter className="w-4 h-4 text-slate-600" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto hover:border-blue-400 transition-all duration-200"
                  >
                    <option value="all">All Status</option>
                    <option value="approved">Approved</option>
                    <option value="flagged">Flagged</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b-2 border-slate-200 bg-slate-50">
                  <tr className="text-left">
                    <th className="pb-4 pt-2 px-4 text-sm font-bold text-slate-700">Transaction ID</th>
                    <th className="pb-4 pt-2 px-4 text-sm font-bold text-slate-700">Merchant</th>
                    <th className="pb-4 pt-2 px-4 text-sm font-bold text-slate-700">Amount</th>
                    <th className="pb-4 pt-2 px-4 text-sm font-bold text-slate-700">Location</th>
                    <th className="pb-4 pt-2 px-4 text-sm font-bold text-slate-700">Risk Score</th>
                    <th className="pb-4 pt-2 px-4 text-sm font-bold text-slate-700">Status</th>
                    <th className="pb-4 pt-2 px-4 text-sm font-bold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTransactions.map((txn, index) => (
                    <tr 
                      key={txn.id} 
                      className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-200 animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <td className="py-4 px-4 text-sm font-mono font-medium text-slate-900">{txn.id}</td>
                      <td className="py-4 px-4 text-sm text-slate-700 font-medium">{txn.merchant}</td>
                      <td className="py-4 px-4 text-sm font-bold text-slate-900">${txn.amount.toLocaleString()}</td>
                      <td className="py-4 px-4 text-sm text-slate-600 flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{txn.location}</span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={`${getRiskColor(txn.riskScore)} font-bold px-3 py-1 hover:scale-110 transition-transform duration-200`}>
                          {txn.riskScore}%
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(txn.status)}
                          <Badge className={`${getStatusBadge(txn.status)} font-semibold hover:scale-110 transition-transform duration-200`}>
                            {txn.status}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedTransaction(txn)}
                          className="text-xs font-semibold hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-200"
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Add Transaction Modal */}
        {showAddTransaction && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in" onClick={() => setShowAddTransaction(false)}>
            <Card className="w-full max-w-2xl border-0 shadow-2xl animate-scale-in bg-white" onClick={(e) => e.stopPropagation()}>
              <CardHeader className="border-b border-slate-200 bg-gradient-to-r from-cyan-50 to-blue-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold">Analyze Transaction for Fraud</CardTitle>
                  </div>
                  <button
                    onClick={() => setShowAddTransaction(false)}
                    className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-all duration-200"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleAddTransaction} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center space-x-2">
                        <Store className="w-4 h-4" />
                        <span>Merchant Name *</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g., Amazon, Starbucks, Wire Transfer"
                        value={newTransaction.merchant}
                        onChange={(e) => setNewTransaction({ ...newTransaction, merchant: e.target.value })}
                        required
                        className="h-12 border-slate-300 focus:border-cyan-500 focus:ring-cyan-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center space-x-2">
                        <DollarSign className="w-4 h-4" />
                        <span>Amount *</span>
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={newTransaction.amount}
                        onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                        required
                        className="h-12 border-slate-300 focus:border-cyan-500 focus:ring-cyan-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center space-x-2">
                        <CreditCard className="w-4 h-4" />
                        <span>Card Last 4 Digits *</span>
                      </label>
                      <Input
                        type="text"
                        maxLength="4"
                        placeholder="1234"
                        value={newTransaction.cardLast4}
                        onChange={(e) => setNewTransaction({ ...newTransaction, cardLast4: e.target.value.replace(/\D/g, '') })}
                        required
                        className="h-12 border-slate-300 focus:border-cyan-500 focus:ring-cyan-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>Location *</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g., New York, NY or Moscow, Russia"
                        value={newTransaction.location}
                        onChange={(e) => setNewTransaction({ ...newTransaction, location: e.target.value })}
                        required
                        className="h-12 border-slate-300 focus:border-cyan-500 focus:ring-cyan-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 flex items-center space-x-2">
                        <Filter className="w-4 h-4" />
                        <span>Category *</span>
                      </label>
                      <select
                        value={newTransaction.category}
                        onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                        required
                        className="w-full h-12 border border-slate-300 rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      >
                        <option value="Shopping">Shopping</option>
                        <option value="Food & Dining">Food & Dining</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Wire Transfer">Wire Transfer</option>
                        <option value="Cryptocurrency">Cryptocurrency</option>
                        <option value="Luxury Goods">Luxury Goods</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-cyan-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-slate-900">AI-Powered Fraud Detection</p>
                        <p className="text-xs text-slate-600 mt-1">
                          Our system will analyze this transaction for suspicious patterns, unusual amounts, high-risk locations, and merchant categories to calculate a real-time fraud risk score.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddTransaction(false)}
                      disabled={isAnalyzing}
                      className="hover:bg-slate-100"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isAnalyzing}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold px-8 hover:scale-105 transition-all duration-200"
                    >
                      {isAnalyzing ? (
                        <span className="flex items-center space-x-2">
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Analyzing...</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-2">
                          <Sparkles className="w-5 h-5" />
                          <span>Analyze Transaction</span>
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Transaction Detail Modal */}
        {selectedTransaction && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in" onClick={() => setSelectedTransaction(null)}>
            <Card className="w-full max-w-2xl border-0 shadow-2xl animate-scale-in bg-white" onClick={(e) => e.stopPropagation()}>
              <CardHeader className="border-b border-slate-200 bg-gradient-to-r from-blue-50 to-cyan-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold">Transaction Details</CardTitle>
                  <button
                    onClick={() => setSelectedTransaction(null)}
                    className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-all duration-200"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-600">Transaction ID</label>
                    <p className="text-base text-slate-900 font-mono bg-slate-50 px-3 py-2 rounded-lg">{selectedTransaction.id}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-600">Amount</label>
                    <p className="text-base text-slate-900 font-bold bg-green-50 px-3 py-2 rounded-lg">${selectedTransaction.amount.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-600">Merchant</label>
                    <p className="text-base text-slate-900 bg-slate-50 px-3 py-2 rounded-lg">{selectedTransaction.merchant}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-600">Location</label>
                    <p className="text-base text-slate-900 bg-slate-50 px-3 py-2 rounded-lg flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedTransaction.location}</span>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-600">Card Last 4</label>
                    <p className="text-base text-slate-900 font-mono bg-slate-50 px-3 py-2 rounded-lg">****{selectedTransaction.cardLast4}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-600">Category</label>
                    <p className="text-base text-slate-900 bg-slate-50 px-3 py-2 rounded-lg">{selectedTransaction.category}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-600">Risk Score</label>
                    <div className="mt-1">
                      <Badge className={`${getRiskColor(selectedTransaction.riskScore)} font-bold text-base px-4 py-2`}>
                        {selectedTransaction.riskScore}%
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-600">Status</label>
                    <div className="mt-1">
                      <Badge className={`${getStatusBadge(selectedTransaction.status)} text-base px-4 py-2 font-bold`}>
                        {selectedTransaction.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="col-span-2 space-y-1">
                    <label className="text-sm font-bold text-slate-600">Timestamp</label>
                    <p className="text-base text-slate-900 bg-slate-50 px-3 py-2 rounded-lg flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(selectedTransaction.timestamp).toLocaleString()}</span>
                    </p>
                  </div>
                  {selectedTransaction.fraudType && (
                    <div className="col-span-2 space-y-1">
                      <label className="text-sm font-bold text-slate-600">Fraud Type Detected</label>
                      <div className="mt-2 p-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl">
                        <p className="text-base text-red-900 font-bold flex items-center space-x-2">
                          <AlertCircle className="w-5 h-5" />
                          <span>{selectedTransaction.fraudType}</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-8 flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedTransaction(null)}
                    className="hover:bg-slate-100"
                  >
                    Close
                  </Button>
                  {selectedTransaction.status === 'flagged' && (
                    <>
                      <Button className="bg-green-600 hover:bg-green-700 text-white hover:scale-105 transition-transform duration-200">
                        Approve
                      </Button>
                      <Button className="bg-red-600 hover:bg-red-700 text-white hover:scale-105 transition-transform duration-200">
                        Block
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
