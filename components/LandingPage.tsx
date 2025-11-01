
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-25 rounded-full blur-3xl opacity-30"></div>
      </div>

      {/* Header with Logo */}
      <header className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <img src="/img/logo.svg" alt="Swipe AI Logo" className="h-8 w-auto" />
          <span className="text-2xl font-bold text-gray-900"></span>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
          <span>Features</span>
          <span>Pricing</span>
          <span>Support</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-4">
        
        {/* Hero Section */}
        <div className="text-center max-w-6xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-8 border border-blue-100">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            AI-Powered Invoice Management
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 py-4 leading-tight mb-6">
            Create invoices for free<br />
            <span className="text-blue-600">in 10 seconds</span>
            <span className="inline-block ml-2 text-4xl md:text-6xl">⚡</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-4 leading-relaxed">
            Customize templates, share bills on WhatsApp, collect payments!
          </p>
          
          <p className="text-lg text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed">
            Automate your invoice data entry instantly. Upload any document, and let our AI extract, organize, and manage your financial data with precision.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={onStart}
              className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              Try Now
            </button>
            <div className="flex items-center text-gray-500 text-sm">
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative max-w-5xl mx-auto">
            <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 border border-blue-100 shadow-2xl">
              <img 
                src="/img/hero.webp" 
                alt="Swipe AI Dashboard - Create invoices in seconds" 
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
                10s ⚡
              </div>
            </div>
          </div>
        </div>

        {/* Feature Story Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {/* Quick Creation Feature */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group hover:transform hover:scale-105">
            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast Creation</h3>
            <p className="text-gray-600 leading-relaxed">Create professional invoices in just 10 seconds. Pre-built templates and smart AI make billing effortless and instant.</p>
          </div>

          {/* WhatsApp Sharing Feature */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group hover:transform hover:scale-105">
            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-green-500/25 transition-all duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">WhatsApp Integration</h3>
            <p className="text-gray-600 leading-relaxed">Share bills directly on WhatsApp with one click. Reach your customers instantly and get faster payment responses.</p>
          </div>

          {/* Payment Collection Feature */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group hover:transform hover:scale-105">
            <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Payment Collection</h3>
            <p className="text-gray-600 leading-relaxed">Collect payments seamlessly with multiple payment options. Track payment status and send automated reminders.</p>
          </div>
        </div>

        {/* AI Data Extraction Section */}
        <div className="max-w-6xl mx-auto mb-16 bg-blue-50 rounded-3xl p-12 border border-blue-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">AI-Powered Data Extraction</h2>
            <p className="text-gray-600 text-lg">Transform chaotic paperwork into organized, actionable insights</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Documents</h3>
              <p className="text-gray-600 text-sm">Drop any invoice format - PDF, image, or document</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Processing</h3>
              <p className="text-gray-600 text-sm">Advanced ML extracts data with 99% accuracy</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Organization</h3>
              <p className="text-gray-600 text-sm">Auto-organize into Invoices, Products, Customers</p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="max-w-4xl mx-auto text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">99%</div>
              <div className="text-gray-500 text-sm">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">10s</div>
              <div className="text-gray-500 text-sm">Creation Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-500 text-sm">AI Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">Free</div>
              <div className="text-gray-500 text-sm">Forever Plan</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
