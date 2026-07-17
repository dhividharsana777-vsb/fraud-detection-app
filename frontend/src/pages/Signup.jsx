import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from '../hooks/use-toast';
import { UserPlus, Lock, User, Mail } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate signup with mock data
    setTimeout(() => {
      if (username && password) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', username);
        toast({
          title: "Account Created",
          description: "Your account has been created successfully!",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Signup Failed",
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
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0d9488] animate-gradient-shift"></div>
      
      {/* Animated Circles */}
      <div className="absolute top-10 right-20 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float-delayed"></div>
      <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      
      {/* Signup Card */}
      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-2xl shadow-lg mb-4 animate-bounce-subtle">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Join Us Today</h2>
          <p className="text-cyan-100">Start protecting your transactions</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-teal-500/20 transition-all duration-300 hover:scale-[1.02]">
          <h1 className="text-3xl font-semibold text-white text-center mb-8">Create Account</h1>
          
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors duration-200">
                <User className="w-5 h-5" />
              </div>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/95 border-0 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-teal-400 h-14 rounded-xl pl-12 transition-all duration-200 hover:bg-white"
              />
            </div>
            
            <div className="relative group">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors duration-200">
                <Lock className="w-5 h-5" />
              </div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/95 border-0 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-teal-400 h-14 rounded-xl pl-12 transition-all duration-200 hover:bg-white"
              />
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#00D9C0] to-[#0d9488] hover:from-[#00c4ad] hover:to-[#0f766e] text-white font-bold h-14 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-teal-500/50 hover:scale-[1.02] transform"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : 'Create Account'}
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-white/80 mb-2">Already have an account?</p>
            <button
              onClick={() => navigate('/')}
              className="text-teal-300 hover:text-teal-200 font-semibold underline transition-all duration-200 hover:scale-105 inline-block"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
