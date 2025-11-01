
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import MainApp from './components/MainApp';

const App: React.FC = () => {
  // Set to true to show splash screen on app opening
  const [showSplash, setShowSplash] = useState(true);
  const [showMainApp, setShowMainApp] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Initialize AOS on component mount
    if (typeof window !== 'undefined' && (window as any).AOS) {
      (window as any).AOS.init({
        duration: 1000,
        once: false,
        mirror: true,
      });
    }

    // Hide splash screen after animation completes (3 seconds)
    const splashTimer = setTimeout(() => {
      console.log('Hiding splash screen');
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(splashTimer);
  }, []);

  const handleStart = () => {
    console.log('Try Now button clicked!');
    setIsTransitioning(true);
    setTimeout(() => {
      console.log('Showing main app');
      setShowMainApp(true);
      setIsTransitioning(false);
    }, 500);
  };

  // Splash Screen Component
  if (showSplash) {
    return (
      <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center overflow-hidden">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
          
          * {
            font-family: 'Poppins', sans-serif;
          }
          
          @keyframes swipe-mask {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(105%);
            }
          }

          @keyframes reveal-text {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(0);
            }
          }

          @keyframes fade-in {
            0% {
              opacity: 0;
              transform: translateY(10px);
            }
            100% {
              opacity: 0.7;
              transform: translateY(0);
            }
          }

          @keyframes progress-fill {
            0% {
              width: 0%;
            }
            100% {
              width: 100%;
            }
          }

          .logo-text {
            font-size: 6rem;
            font-weight: 700;
            margin: 0;
            line-height: 1.1;
            position: relative;
            overflow: hidden;
            display: inline-block;
          }

          .logo-text span {
            display: block;
            position: relative;
            color: #111;
            animation: reveal-text 1.5s cubic-bezier(0.77, 0, 0.175, 1) forwards;
          }

          .logo-text::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #007bff;
            z-index: 2;
            animation: swipe-mask 1.5s cubic-bezier(0.77, 0, 0.175, 1) forwards;
          }

          .tagline {
            font-size: 1.25rem;
            font-weight: 400;
            margin: 0;
            color: #111;
            opacity: 0;
            transform: translateY(10px);
            animation: fade-in 1s ease-out 1s forwards;
          }

          .progress-fill {
            height: 100%;
            background: #007bff;
            border-radius: 9999px;
            width: 0%;
            animation: progress-fill 2.5s ease-out 0.5s forwards;
          }

          @media (max-width: 768px) {
            .logo-text {
              font-size: 4rem;
            }
            .tagline {
              font-size: 1rem;
            }
          }
        `}</style>
        
        <div className="text-left">
          <h1 className="logo-text">
            <span>Swipe AI</span>
          </h1>
          <p className="tagline">Simple Billing & Payments App</p>
          <div className="w-full max-w-3xl bg-gray-700 rounded-full h-2 mt-12 mx-auto">
            <div className="progress-fill"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Page Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center">
          <div className="text-center">
            <div className="relative mb-6">
              <div className="w-24 h-24 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
              <i className="fas fa-rocket absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Preparing Your Dashboard</h2>
            <p className="text-gray-300">Just a moment...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {showMainApp ? <MainApp /> : <LandingPage onStart={handleStart} />}
      </div>
    </div>
  );
};

export default App;
