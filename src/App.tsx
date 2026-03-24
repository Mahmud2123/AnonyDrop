// src/App.tsx
// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { PublicMessage } from './components/PublicMessage';
import { MessageCircle, Shield, Zap, Lock } from 'lucide-react';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/u/:username" element={<PublicMessage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}


function Landing() {
    
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
              <MessageCircle className="w-8 h-8" />
              <span>NGL Clone</span>
            </Link>
            <Link 
              to="/auth" 
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Get Anonymous Messages
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Create your personal link, share it with friends, and receive anonymous messages. 
          No identities revealed. Pure honesty.
        </p>
        <Link 
          to="/auth" 
          className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 text-lg"
        >
          Get Started — It's Free
        </Link>

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">100% Anonymous</h3>
            <p className="text-gray-600 text-sm">Senders are never identified. Full privacy guaranteed.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Instant Delivery</h3>
            <p className="text-gray-600 text-sm">Messages appear in real-time. No delays.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Anti-Spam</h3>
            <p className="text-gray-600 text-sm">Smart rate limiting keeps your inbox clean.</p>
          </div>
        </div>
      </div>
    </div>

    
  );

  
}

export default App;