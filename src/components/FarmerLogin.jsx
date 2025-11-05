import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const FarmerLogin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await axios.post('http://localhost:5000/api/farmers/login', formData)
      alert(res.data.message)

      // Save login data
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('farmer', JSON.stringify(res.data.farmer))

      navigate('/farmer-dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transition-all duration-500 hover:shadow-green-200">
        <h2 className="text-3xl font-extrabold text-center text-green-700 mb-6">
          👨‍🌾 Farmer Login
        </h2>

        {error && (
          <p className="text-center text-red-600 font-medium mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-lg text-white transition-all duration-200 ${
              loading
                ? 'bg-green-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 transform hover:scale-[1.02]'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don’t have an account?{' '}
          <span
            onClick={() => navigate('/farmer-register')}
            className="text-green-600 hover:text-green-700 font-semibold cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  )
}

export default FarmerLogin
