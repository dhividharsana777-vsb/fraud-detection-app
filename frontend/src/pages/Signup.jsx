import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from '../hooks/use-toast';
import { UserPlus, Lock, User, Sparkles, Shield } from 'lucide-react';

const Signup = () => {
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

  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);

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
      {/* Background Image - Hacker with Laptop */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/5240545/pexels-photo-5240545.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      ></div>
      
      {/* Animated overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-teal-900/65 to-cyan-900/55 animate-gradient-shift"></div>
      
      {/* Digital rain effect */}
      <div className="absolute inset-0 opacity-15">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute text-teal-400 text-xs font-mono animate-fall"
            style={{
              left: `${i * 4}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${6 + i * 0.4}s`
            }}
          >
            {Array.from({ length: 25 }, () => 
              ['0', '1'][Math.floor(Math.random() * 2)]
            ).join('')}
          </div>
        ))}
      </div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-teal-400/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${10 + i}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Animated Circles */}
      <div className="absolute top-10 right-20 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 left-20 w-96 h-96 blur-3xl animate-float-delayed rounded-full bg-cyan-500/10"></div>
      <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      
      {/* Glowing lines */}
      <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-teal-500/50 to-transparent animate-slide-down"></div>
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent animate-slide-down" style={{ animationDelay: '1.5s' }}></div>
      
      {/* Signup Card */}
      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-2xl shadow-2xl mb-4 animate-bounce-subtle relative">
            <UserPlus className="w-10 h-10 text-white" />
            <div className="absolute inset-0 rounded-2xl bg-teal-400/50 animate-ping"></div>
          </div>
          <h2 className="text-5xl font-bold text-white mb-3 drop-shadow-2xl animate-text-glow">
            Join Us Today
          </h2>
          <p className="text-teal-100 flex items-center justify-center space-x-2 animate-fade-in">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Start protecting your transactions</span>
            <Sparkles className="w-4 h-4 animate-pulse" />
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-teal-400/30 hover:border-teal-400/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-teal-500/50 animate-scale-in">
          {/* Scanning line effect */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-teal-400/50 to-transparent animate-scan"></div>
          </div>
          
          <h1 className="text-3xl font-semibold text-white text-center mb-8 flex items-center justify-center space-x-2">
            <Shield className="w-6 h-6 animate-pulse" />
            <span>Create Account</span>
          </h1>
          
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-teal-400 transition-all duration-200">
                <User className="w-5 h-5" />
              </div>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/95 border-2 border-transparent focus:border-teal-400 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-teal-400/50 h-14 rounded-xl pl-12 transition-all duration-200 hover:bg-white hover:scale-[1.02]"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400/0 via-teal-400/10 to-teal-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
            
            <div className="relative group">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-teal-400 transition-all duration-200">
                <Lock className="w-5 h-5" />
              </div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/95 border-2 border-transparent focus:border-teal-400 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-teal-400/50 h-14 rounded-xl pl-12 transition-all duration-200 hover:bg-white hover:scale-[1.02]"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400/0 via-teal-400/10 to-teal-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#00D9C0] to-[#0d9488] hover:from-[#00c4ad] hover:to-[#0f766e] text-white font-bold h-14 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-teal-500/50 hover:scale-[1.05] transform relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Create Account
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-white/80 mb-2">Already have an account?</p>
            <button
              onClick={() => navigate('/')}
              className="text-teal-300 hover:text-teal-200 font-semibold underline transition-all duration-200 hover:scale-110 inline-block relative group"
            >
              <span>Login</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-300 group-hover:w-full transition-all duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
