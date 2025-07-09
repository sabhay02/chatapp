import React, { useContext, useState } from 'react';
import assets from '../assets/assets';
import { AuthContext } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, MessageCircle } from 'lucide-react';

const LoginPage = () => {
  const [currState, setCurrState] = useState('Sign Up');
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);

  const toggleFormState = () => {
    setIsDataSubmitted(!isDataSubmitted);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (currState === 'Sign Up') {
      if (!isDataSubmitted) {
        setIsDataSubmitted(true);
        return;
      }

      if (!fullName || !email || !password) {
        alert('Please fill in all required fields');
        return;
      }

      if (!agreeToTerms) {
        alert('Please agree to the terms and conditions');
        return;
      }

      login(currState == "Sign Up" ? 'signup' : 'login', { fullName, email, password, bio });
    } else {
      if (!email || !password) {
        alert('Please enter both email and password');
        return;
      }
      login(currState == "Sign Up" ? 'signup' : 'login', { email, password });
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center gap-12 sm:justify-evenly max-lg:flex-col p-6 page-transition'>
      {/* Enhanced Left Section */}
      <div className="flex flex-col items-center space-y-8 max-lg:mt-12">
        <div className="relative group">
          <img 
            src={assets.logo_big} 
            alt="QuickChat Logo" 
            className='w-[min(35vw,320px)] transition-all duration-500 group-hover:scale-110 drop-shadow-2xl float-animation' 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl lg:text-5xl font-black gradient-text">Welcome to QuickChat</h1>
          <p className="text-gray-300 text-lg lg:text-xl text-premium max-w-md">
            Connect with friends instantly and securely in a beautiful, modern interface
          </p>
          
          <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-400" />
              <span>Real-time messaging</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-green-400 flex items-center justify-center">
                <span className="text-white text-xs">🔒</span>
              </div>
              <span>End-to-end encrypted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Right Section - Form */}
      <form 
        onSubmit={onSubmitHandler} 
        className='glass-effect border border-white/20 p-8 lg:p-10 flex flex-col gap-6 rounded-3xl shadow-2xl w-[90%] max-w-lg card-premium'
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className='font-black text-3xl lg:text-4xl gradient-text'>
            {currState}
          </h2>
          <button
            type="button"
            onClick={toggleFormState}
            className='p-3 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110 card-premium'
          >
            <img 
              src={assets.arrow_icon} 
              alt="Toggle" 
              className='w-6 h-6 opacity-70 hover:opacity-100 transition-opacity'
            />
          </button>
        </div>
        
        {currState === "Sign Up" && isDataSubmitted && (
          <div className="space-y-2">
            <label className="text-sm text-gray-300 font-semibold flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name
            </label>
            <input
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              type="text"
              className="input-premium w-full"
              placeholder="Enter your full name"
              required
            />
          </div>
        )}

        {isDataSubmitted && (
          <>
            <div className="space-y-2">
              <label className="text-sm text-gray-300 font-semibold flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter your email"
                required
                className="input-premium w-full"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-300 font-semibold flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  className="input-premium w-full pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </>
        )}

        {currState === "Sign Up" && isDataSubmitted && (
          <div className="space-y-2">
            <label className="text-sm text-gray-300 font-semibold">Bio (Optional)</label>
            <textarea
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              rows={3}
              className="input-premium w-full resize-none"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>
        )}

        {isDataSubmitted && currState === "Sign Up" && (
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="mt-1 h-5 w-5 rounded border-white/20 bg-white/10 text-blue-600 focus:ring-blue-500 focus:ring-2"
            />
            <p className="text-sm text-gray-300 leading-relaxed">
              I agree to the{' '}
              <span className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors font-semibold">
                terms of use
              </span>{' '}
              &{' '}
              <span className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors font-semibold">
                privacy policy
              </span>
            </p>
          </div>
        )}

        <button
          type="submit"
          className="btn-premium w-full py-4 text-lg font-bold"
        >
          {currState === "Sign Up" ? "Create Account" : "Sign In"}
        </button>

        <div className="text-center">
          {currState === "Sign Up" ? (
            <p className="text-sm text-gray-300">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrState("Login");
                  setIsDataSubmitted(false);
                }}
                className="font-semibold gradient-text-alt cursor-pointer transition-colors"
              >
                Sign in here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-300">
              Don't have an account?{" "}
              <span
                onClick={() => setCurrState("Sign Up")}
                className="font-semibold gradient-text-alt cursor-pointer transition-colors"
              >
                Create one here
              </span>
            </p>
          )}
        </div>

        {/* Enhanced Social login options */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 glass-effect text-gray-300 rounded-full">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="flex items-center justify-center px-6 py-3 glass-effect border border-white/20 rounded-2xl text-sm font-semibold text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 card-premium"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center px-6 py-3 glass-effect border border-white/20 rounded-2xl text-sm font-semibold text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 card-premium"
          >
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;