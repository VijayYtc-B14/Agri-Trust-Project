import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  Wheat, 
  Link, 
  ShoppingCart, 
  DollarSign, 
  MessageCircle, 
  Settings, 
  Search,
  Filter,
  Send,
  Menu,
  X,
  TrendingUp,
  Users,
  Package,
  CheckCircle
} from 'lucide-react'
import Navbar from './Navbar'

const RetailerDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [orderFilter, setOrderFilter] = useState('all')
  const [verificationHash, setVerificationHash] = useState('')
  const [verificationResult, setVerificationResult] = useState(null)
  const [selectedFarmer, setSelectedFarmer] = useState('farmer1')
  const [messageInput, setMessageInput] = useState('')

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'crops', label: 'Available Crops', icon: Wheat },
    { id: 'blockchain', label: 'Blockchain Verification', icon: Link },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'predictor', label: 'AI Price Predictor', icon: DollarSign },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const mockCrops = [
    { id: 1, name: 'Wheat', quantity: '500 kg', price: '₹30/kg', farmer: 'Rajesh Kumar', location: 'Punjab', quality: 'Premium' },
    { id: 2, name: 'Rice', quantity: '300 kg', price: '₹40/kg', farmer: 'Suresh Patel', location: 'Gujarat', quality: 'Grade A' },
    { id: 3, name: 'Corn', quantity: '200 kg', price: '₹25/kg', farmer: 'Amit Singh', location: 'UP', quality: 'Standard' },
    { id: 4, name: 'Sugarcane', quantity: '1000 kg', price: '₹35/kg', farmer: 'Mohan Reddy', location: 'AP', quality: 'Premium' }
  ]

  const mockOrders = [
    { id: 'ORD001', crop: 'Wheat', quantity: '500 kg', farmer: 'Rajesh Kumar', status: 'Delivered', date: '2024-01-15' },
    { id: 'ORD002', crop: 'Rice', quantity: '300 kg', farmer: 'Suresh Patel', status: 'Shipped', date: '2024-01-18' },
    { id: 'ORD003', crop: 'Corn', quantity: '200 kg', farmer: 'Amit Singh', status: 'Pending', date: '2024-01-20' }
  ]

  const mockMessages = {
    farmer1: [
      { id: 1, text: "Hello! I have fresh wheat available for sale.", sender: 'farmer', time: '10:30 AM' },
      { id: 2, text: "What's the quality grade?", sender: 'retailer', time: '10:32 AM' },
      { id: 3, text: "Premium grade, just harvested last week.", sender: 'farmer', time: '10:35 AM' }
    ],
    farmer2: [
      { id: 1, text: "Rice shipment is ready for pickup.", sender: 'farmer', time: '2:15 PM' }
    ]
  }

  const handleVerification = () => {
    if (!verificationHash.trim()) return
    
    // Mock verification logic
    const isValid = verificationHash.length > 10
    setVerificationResult({
      valid: isValid,
      message: isValid ? '✅ Transaction verified on blockchain' : '❌ Invalid transaction hash'
    })
  }

  const DashboardSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Total Orders</h3>
          <ShoppingCart className="h-8 w-8 text-blue-500" />
        </div>
        <p className="text-3xl font-bold text-blue-600">24</p>
        <p className="text-sm text-gray-500">This month</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Crops Purchased</h3>
          <Package className="h-8 w-8 text-green-500" />
        </div>
        <p className="text-3xl font-bold text-green-600">1,200 kg</p>
        <p className="text-sm text-gray-500">Total quantity</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Verified Deals</h3>
          <CheckCircle className="h-8 w-8 text-purple-500" />
        </div>
        <p className="text-3xl font-bold text-purple-600">18</p>
        <p className="text-sm text-gray-500">Blockchain verified</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Active Farmers</h3>
          <Users className="h-8 w-8 text-orange-500" />
        </div>
        <p className="text-3xl font-bold text-orange-600">45</p>
        <p className="text-sm text-gray-500">Connected farmers</p>
      </div>
    </div>
  )

  const CropsSection = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <Wheat className="h-6 w-6 text-green-500 mr-2" />
          Available Crops
        </h3>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search crops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2">Crop</th>
              <th className="text-left py-3 px-2">Quantity</th>
              <th className="text-left py-3 px-2">Price</th>
              <th className="text-left py-3 px-2">Farmer</th>
              <th className="text-left py-3 px-2">Location</th>
              <th className="text-left py-3 px-2">Quality</th>
              <th className="text-left py-3 px-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockCrops.map((crop) => (
              <tr key={crop.id} className="border-b border-gray-100">
                <td className="py-3 px-2 font-medium">{crop.name}</td>
                <td className="py-3 px-2">{crop.quantity}</td>
                <td className="py-3 px-2 text-green-600 font-semibold">{crop.price}</td>
                <td className="py-3 px-2">{crop.farmer}</td>
                <td className="py-3 px-2">{crop.location}</td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    crop.quality === 'Premium' ? 'bg-green-100 text-green-800' : 
                    crop.quality === 'Grade A' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {crop.quality}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-600">
                    Request Deal
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const BlockchainSection = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
        <Link className="h-6 w-6 text-purple-500 mr-2" />
        Blockchain Verification
      </h3>
      
      <div className="max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Transaction Hash
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={verificationHash}
            onChange={(e) => setVerificationHash(e.target.value)}
            placeholder="Enter transaction hash..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            onClick={handleVerification}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
          >
            Verify
          </button>
        </div>
        
        {verificationResult && (
          <div className={`mt-4 p-4 rounded-lg ${
            verificationResult.valid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <p className={`text-sm ${verificationResult.valid ? 'text-green-700' : 'text-red-700'}`}>
              {verificationResult.message}
            </p>
          </div>
        )}
      </div>
      
      <div className="mt-8">
        <h4 className="font-medium text-gray-800 mb-4">Recent Verifications</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="text-sm font-mono">0x1a2b3c4d5e6f...</span>
            <span className="text-green-600 text-sm">✅ Verified</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="text-sm font-mono">0x9f8e7d6c5b4a...</span>
            <span className="text-green-600 text-sm">✅ Verified</span>
          </div>
        </div>
      </div>
    </div>
  )

  const OrdersSection = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <ShoppingCart className="h-6 w-6 text-blue-500 mr-2" />
          Orders
        </h3>
        <select
          value={orderFilter}
          onChange={(e) => setOrderFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2">Order ID</th>
              <th className="text-left py-3 px-2">Crop</th>
              <th className="text-left py-3 px-2">Quantity</th>
              <th className="text-left py-3 px-2">Farmer</th>
              <th className="text-left py-3 px-2">Date</th>
              <th className="text-left py-3 px-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100">
                <td className="py-3 px-2 font-mono text-xs">{order.id}</td>
                <td className="py-3 px-2">{order.crop}</td>
                <td className="py-3 px-2">{order.quantity}</td>
                <td className="py-3 px-2">{order.farmer}</td>
                <td className="py-3 px-2">{order.date}</td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const PredictorSection = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
        <DollarSign className="h-6 w-6 text-green-500 mr-2" />
        AI Price Predictor
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Crop Name</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                <option>Wheat</option>
                <option>Rice</option>
                <option>Corn</option>
                <option>Sugarcane</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (kg)</label>
              <input
                type="number"
                placeholder="Enter quantity"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
              Predict Price
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">AI Prediction</h4>
            <p className="text-2xl font-bold text-green-600">₹32/kg</p>
            <p className="text-sm text-green-700">Predicted price for wheat</p>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-4">Price Trend</h4>
          <div className="h-40 flex items-end justify-between space-x-2">
            {[25, 28, 30, 32, 29, 31, 33].map((price, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="bg-green-500 w-6 rounded-t"
                  style={{ height: `${(price / 35) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-600 mt-1">{price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const MessagesSection = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-[600px] flex">
      <div className="w-1/3 border-r border-gray-200 pr-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Farmers</h3>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedFarmer('farmer1')}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              selectedFarmer === 'farmer1' ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'
            }`}
          >
            <div className="font-medium">Rajesh Kumar</div>
            <div className="text-sm text-gray-500">Wheat Farmer</div>
          </button>
          <button
            onClick={() => setSelectedFarmer('farmer2')}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              selectedFarmer === 'farmer2' ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'
            }`}
          >
            <div className="font-medium">Suresh Patel</div>
            <div className="text-sm text-gray-500">Rice Farmer</div>
          </button>
        </div>
      </div>
      
      <div className="flex-1 pl-4 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {mockMessages[selectedFarmer]?.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'retailer' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                message.sender === 'retailer' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <p>{message.text}</p>
                <p className="text-xs opacity-75 mt-1">{message.time}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
            <Send className="h-5 w-5" />
          </button>
        </div>
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
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-4">Profile Details</h4>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Company Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        
        <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
          Logout
        </button>
      </div>
    </div>
  )

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard': return <DashboardSection />
      case 'crops': return <CropsSection />
      case 'blockchain': return <BlockchainSection />
      case 'orders': return <OrdersSection />
      case 'predictor': return <PredictorSection />
      case 'messages': return <MessagesSection />
      case 'settings': return <SettingsSection />
      default: return <DashboardSection />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showLogout={true} />
      
      <div className="flex">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed top-20 left-4 z-50 bg-white p-2 rounded-lg shadow-lg"
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <div className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="text-2xl mr-2">💼</span>
              AgroTrust-AI Retailer
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
                      ? 'bg-blue-100 text-blue-700'
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

      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default RetailerDashboard