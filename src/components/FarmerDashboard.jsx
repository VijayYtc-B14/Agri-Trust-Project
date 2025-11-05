import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  Bot, 
  Bug, 
  Leaf, 
  Sun, 
  DollarSign, 
  Settings, 
  Send, 
  Upload, 
  TrendingUp,
  Thermometer,
  Droplets,
  Wind,
  Menu,
  X
} from 'lucide-react'
import Navbar from './Navbar'
import ChatbotSection from './ChatbotSection'
import WeatherAdvisorSection from './WeatherAdvisorSection'

const FarmerDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)


  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'chatbot', label: 'AI Chatbot', icon: Bot },
    { id: 'pest', label: 'Pest Detection', icon: Bug },
    { id: 'health', label: 'Crop Health', icon: Leaf },
    { id: 'weather', label: 'Weather & Advisor', icon: Sun },
    { id: 'market', label: 'Blockchain Market', icon: DollarSign },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]



  const DashboardSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Total Crops</h3>
          <Leaf className="h-8 w-8 text-green-500" />
        </div>
        <p className="text-3xl font-bold text-green-600">12</p>
        <p className="text-sm text-gray-500">Active plantations</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Health Score</h3>
          <TrendingUp className="h-8 w-8 text-blue-500" />
        </div>
        <p className="text-3xl font-bold text-blue-600">85%</p>
        <p className="text-sm text-gray-500">Overall crop health</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Revenue</h3>
          <DollarSign className="h-8 w-8 text-yellow-500" />
        </div>
        <p className="text-3xl font-bold text-yellow-600">₹45,000</p>
        <p className="text-sm text-gray-500">This month</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 md:col-span-2 lg:col-span-3">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <Leaf className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-700">Wheat crop health analyzed - Good condition</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <Bot className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-gray-700">AI recommendation received for fertilizer application</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
            <DollarSign className="h-5 w-5 text-yellow-500" />
            <span className="text-sm text-gray-700">Blockchain transaction completed - Rice sale</span>
          </div>
        </div>
      </div>
    </div>
  )



  const PestDetectionSection = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
        <Bug className="h-6 w-6 text-red-500 mr-2" />
        Pest Detection System
      </h3>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
        <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h4 className="text-lg font-medium text-gray-700 mb-2">Upload Crop Image</h4>
        <p className="text-gray-500 mb-4">Drag and drop or click to select an image of your crop</p>
        <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
          Choose File
        </button>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">How it works:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Upload a clear image of your crop leaves or affected areas</li>
          <li>• Our AI will analyze the image for pest detection</li>
          <li>• Get instant recommendations for treatment</li>
        </ul>
      </div>
    </div>
  )

  const CropHealthSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
          <Leaf className="h-6 w-6 text-green-500 mr-2" />
          Crop Health Analysis
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">92%</div>
            <div className="text-sm text-gray-600">Wheat Health</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">78%</div>
            <div className="text-sm text-gray-600">Rice Health</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">85%</div>
            <div className="text-sm text-gray-600">Corn Health</div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Wheat Field A</span>
              <span className="text-green-600 font-semibold">Excellent</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{width: '92%'}}></div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Rice Field B</span>
              <span className="text-yellow-600 font-semibold">Good</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{width: '78%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const WeatherSection = () => <WeatherAdvisorSection />

  const MarketSection = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
        <DollarSign className="h-6 w-6 text-green-500 mr-2" />
        Blockchain Market Transactions
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2">Transaction ID</th>
              <th className="text-left py-3 px-2">Crop</th>
              <th className="text-left py-3 px-2">Quantity</th>
              <th className="text-left py-3 px-2">Price</th>
              <th className="text-left py-3 px-2">Buyer</th>
              <th className="text-left py-3 px-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-2 font-mono text-xs">#TX001</td>
              <td className="py-3 px-2">Wheat</td>
              <td className="py-3 px-2">500 kg</td>
              <td className="py-3 px-2">₹15,000</td>
              <td className="py-3 px-2">ABC Traders</td>
              <td className="py-3 px-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Verified</span>
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-2 font-mono text-xs">#TX002</td>
              <td className="py-3 px-2">Rice</td>
              <td className="py-3 px-2">300 kg</td>
              <td className="py-3 px-2">₹12,000</td>
              <td className="py-3 px-2">XYZ Mills</td>
              <td className="py-3 px-2">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span>
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-2 font-mono text-xs">#TX003</td>
              <td className="py-3 px-2">Corn</td>
              <td className="py-3 px-2">200 kg</td>
              <td className="py-3 px-2">₹8,000</td>
              <td className="py-3 px-2">Local Market</td>
              <td className="py-3 px-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Verified</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )

  const SettingsSection = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
        <Settings className="h-6 w-6 text-gray-500 mr-2" />
        Settings
      </h3>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-800">Dark Mode</h4>
            <p className="text-sm text-gray-500">Toggle dark/light theme</p>
          </div>
          <button className="bg-gray-200 rounded-full w-12 h-6 flex items-center px-1">
            <div className="bg-white w-4 h-4 rounded-full shadow-sm"></div>
          </button>
        </div>
        
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-800">Notifications</h4>
            <p className="text-sm text-gray-500">Receive alerts and updates</p>
          </div>
          <button className="bg-green-500 rounded-full w-12 h-6 flex items-center justify-end px-1">
            <div className="bg-white w-4 h-4 rounded-full shadow-sm"></div>
          </button>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">Language</h4>
          <select className="w-full p-2 border border-gray-300 rounded-lg">
            <option>English</option>
            <option>Hindi</option>
            <option>Bengali</option>
            <option>Tamil</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard': return <DashboardSection />
      case 'chatbot': return <ChatbotSection />
      case 'pest': return <PestDetectionSection />
      case 'health': return <CropHealthSection />
      case 'weather': return <WeatherSection />
      case 'market': return <MarketSection />
      case 'settings': return <SettingsSection />
      default: return <DashboardSection />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showLogout={true} />
      
      <div className="flex">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed top-20 left-4 z-50 bg-white p-2 rounded-lg shadow-lg"
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Sidebar */}
        <div className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="text-2xl mr-2">🌾</span>
              KrishiSakhi AI
            </h1>
          </div>
          
          <nav className="p-4">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id)
                    setIsSidebarOpen(false)
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors mb-2 ${
                    activeSection === item.id
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default FarmerDashboard