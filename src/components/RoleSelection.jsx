import { useNavigate } from 'react-router-dom'
import { UserIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline'
import Navbar from './Navbar'

const RoleSelection = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-4xl mr-2">🌾</span>
            AgroTrust AI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering Farmers with AI & Blockchain Transparency
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Farmer Card */}
          <div 
            className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 hover:shadow-xl cursor-pointer transform hover:scale-105 transition-all duration-300"
            onClick={() => navigate('/farmer-login')}
          >
            <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600"></div>
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <UserIcon className="h-16 w-16 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">Farmer</h3>
            <p className="text-gray-600 text-center mb-6">
              Access AI-powered crop advisory and manage your blockchain-verified transactions
            </p>
            <button className="w-full bg-green-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 transform hover:scale-105">
              Continue as Farmer
            </button>
          </div>

          {/* Retailer Card */}
          <div 
            className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 hover:shadow-xl cursor-pointer transform hover:scale-105 transition-all duration-300"
            onClick={() => navigate('/retailer-login')}
          >
            <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <BuildingStorefrontIcon className="h-16 w-16 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">Retailer</h3>
            <p className="text-gray-600 text-center mb-6">
              Track supply chain transparency and verify product authenticity
            </p>
            <button className="w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105">
              Continue as Retailer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoleSelection