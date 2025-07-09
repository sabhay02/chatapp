import React, { useContext, useState } from 'react';
import assets from '../assets/assets';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [currState, setCurrState] = useState('Sign Up');
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const {login}=useContext(AuthContext);

  const toggleFormState = () => {
    setIsDataSubmitted(!isDataSubmitted);
  };
  const onSubmitHandler = (event) => {
  event.preventDefault();

  // Validate required fields based on form state
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

   login(currState=="Sign Up" ?'signup':'login',{fullName, email, password, bio});



  } else {
    // Login state
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
     login(currState=="Sign Up" ?'signup':'login',{ email, password});


  }
};

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-xl'>
      {/* Left Section */}
      <img 
        src={assets.logo_big} 
        alt="Application Logo" 
        className='w-[min(30vw,250px)] max-sm:mt-10' 
      />

      {/* Right Section - Form */}
      <form onSubmit={onSubmitHandler} className='border-2 bg-white/10 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg w-[90%] max-w-md'>
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currState}
          <img 
            src={assets.arrow_icon} 
            alt="Toggle" 
            className='w-5 h-5 cursor-pointer hover:opacity-80 transition-opacity'
            onClick={toggleFormState}
          />
        </h2>
        
        {currState === "Sign Up" && isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            className="p-2 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Full Name"
            required
          />
        )}

        {isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="p-2 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="p-2 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </>
        )}

        {currState === "Sign Up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className="p-2 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Provide a short bio..."
          ></textarea>
        )}

        {isDataSubmitted && currState === "Sign Up" && (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <p className="text-sm text-gray-300">
              Agree to the terms of use & privacy policy
            </p>
          </div>
        )}

        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md hover:from-purple-500 hover:to-violet-700 transition-colors"
        >
          {currState === "Sign Up" ? "Create Account" : "Login Now"}
        </button>

        <div className="flex flex-col gap-2">
          {currState === "Sign Up" ? (
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrState("Login");
                  setIsDataSubmitted(false);
                }}
                className="font-medium text-violet-400 hover:text-violet-300 cursor-pointer transition-colors"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <span
                onClick={() => setCurrState("Sign Up")}
                className="font-medium text-violet-400 hover:text-violet-300 cursor-pointer transition-colors"
              >
                Sign up here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
