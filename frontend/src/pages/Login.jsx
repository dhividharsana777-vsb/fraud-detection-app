import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from '../hooks/use-toast';
import { Shield, Lock, User, Zap } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

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
      {/* Background Image - Cyber Crime Matrix Code */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=80)',
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      ></div>
      
      {/* Animated overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-blue-900/60 to-cyan-900/50 animate-gradient-shift"></div>
      
      {/* Matrix-style falling code effect */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 text-xs font-mono animate-fall"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${5 + i * 0.5}s`
            }}
          >
            {Array.from({ length: 20 }, () => 
              String.fromCharCode(33 + Math.random() * 94)
            ).join('')}
          </div>
        ))}
      </div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${8 + i}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Animated Circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      
      {/* Glowing lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent animate-slide-down"></div>
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-500/50 to-transparent animate-slide-down" style={{ animationDelay: '2s' }}></div>
      
      {/* Login Card */}
      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl shadow-2xl mb-4 animate-bounce-subtle relative">
            <Shield className="w-10 h-10 text-white" />
            <div className="absolute inset-0 rounded-2xl bg-cyan-400/50 animate-ping"></div>
          </div>
          <h2 className="text-5xl font-bold text-white mb-3 drop-shadow-2xl animate-text-glow">
            Welcome Back
          </h2>
          <p className="text-cyan-100 flex items-center justify-center space-x-2 animate-fade-in">
            <Zap className="w-4 h-4 animate-pulse" />
            <span>Secure Fraud Detection System</span>
            <Zap className="w-4 h-4 animate-pulse" />
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/50 animate-scale-in">
          {/* Scanning line effect */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-scan"></div>
          </div>
          
          <h1 className="text-3xl font-semibold text-white text-center mb-8 flex items-center justify-center space-x-2">
            <Lock className="w-6 h-6 animate-pulse" />
            <span>Login</span>
          </h1>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-400 transition-all duration-200">
                <User className="w-5 h-5" />
              </div>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/95 border-2 border-transparent focus:border-cyan-400 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-cyan-400/50 h-14 rounded-xl pl-12 transition-all duration-200 hover:bg-white hover:scale-[1.02]"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
            
            <div className="relative group">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-400 transition-all duration-200">
                <Lock className="w-5 h-5" />
              </div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/95 border-2 border-transparent focus:border-cyan-400 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-cyan-400/50 h-14 rounded-xl pl-12 transition-all duration-200 hover:bg-white hover:scale-[1.02]"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#00D9C0] to-[#00f5d4] hover:from-[#00c4ad] hover:to-[#00D9C0] text-gray-900 font-bold h-14 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-[1.05] transform relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Login
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-white/80 mb-2">Don't have an account?</p>
            <button
              onClick={() => navigate('/signup')}
              className="text-cyan-300 hover:text-cyan-200 font-semibold underline transition-all duration-200 hover:scale-110 inline-block relative group"
            >
              <span>Create Account</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-300 group-hover:w-full transition-all duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
