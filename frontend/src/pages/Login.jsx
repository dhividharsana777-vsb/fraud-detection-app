import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from '../hooks/use-toast';
import { Shield, Lock, User } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login with mock data
    setTimeout(() => {
      if (username && password) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', username);
        toast({
          title: "Login Successful",
          description: "Welcome back!"
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter both username and password",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#06b6d4] animate-gradient-shift"></div>
      
      {/* Animated Circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      
      {/* Login Card */}
      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl shadow-lg mb-4 animate-bounce-subtle">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Welcome Back</h2>
          <p className="text-blue-100">Secure Fraud Detection System</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02]">
          <h1 className="text-3xl font-semibold text-white text-center mb-8">Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors duration-200">
                <User className="w-5 h-5" />
              </div>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/95 border-0 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-cyan-400 h-14 rounded-xl pl-12 transition-all duration-200 hover:bg-white" />
              
            </div>
            
            <div className="relative group">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors duration-200">
                <Lock className="w-5 h-5" />
              </div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/95 border-0 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-cyan-400 h-14 rounded-xl pl-12 transition-all duration-200 hover:bg-white" />
              
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#00D9C0] to-[#00f5d4] hover:from-[#00c4ad] hover:to-[#00D9C0] text-gray-900 font-bold h-14 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-[1.02] transform">
              
              {isLoading ?
              <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span> :
              'Login'}
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-white/80 mb-2">Don't have an account?</p>
            <button
              onClick={() => navigate('/signup')}
              className="text-cyan-300 hover:text-cyan-200 font-semibold underline transition-all duration-200 hover:scale-105 inline-block">
              
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>);

};

export default Login;