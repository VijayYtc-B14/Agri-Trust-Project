import { useState, useEffect } from 'react'
import { 
  Sun, Cloud, CloudRain, CloudSnow, Thermometer, 
  Droplets, Wind, Eye, Send, Bot, MapPin, RefreshCw
} from 'lucide-react'
import axios from 'axios'

const WeatherAdvisorSection = () => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState({ lat: null, lon: null, city: '' })
  const [aiQuestion, setAiQuestion] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [error, setError] = useState('')

  // ✅ OpenWeather API setup
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "0c7618321c73c1950ac0d31142016ebd";

  // ✅ Weather icons mapping
  const getWeatherIcon = (condition, size = 'h-8 w-8') => {
    const iconClass = `${size} mx-auto mb-2`
    switch (condition?.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return <Sun className={`${iconClass} text-yellow-500`} />
      case 'clouds':
      case 'cloudy':
        return <Cloud className={`${iconClass} text-gray-500`} />
      case 'rain':
      case 'drizzle':
        return <CloudRain className={`${iconClass} text-blue-500`} />
      case 'snow':
        return <CloudSnow className={`${iconClass} text-blue-300`} />
      default:
        return <Sun className={`${iconClass} text-yellow-500`} />
    }
  }

  // ✅ Get weather theme
  const getWeatherTheme = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return 'from-yellow-400 to-orange-500'
      case 'clouds':
      case 'cloudy':
        return 'from-gray-400 to-gray-600'
      case 'rain':
      case 'drizzle':
        return 'from-blue-400 to-blue-600'
      case 'snow':
        return 'from-blue-200 to-blue-400'
      default:
        return 'from-green-400 to-green-600'
    }
  }

  // ✅ Get user location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            city: ''
          })
        },
        (error) => {
          console.error('Location error:', error)
          // Fallback to Mumbai
          setLocation({ lat: 19.0760, lon: 72.8777, city: 'Mumbai' })
        }
      )
    } else {
      // Fallback location
      setLocation({ lat: 19.0760, lon: 72.8777, city: 'Mumbai' })
    }
  }

  // ✅ Fetch weather data
  const fetchWeather = async () => {
    if (!location.lat || !location.lon) return

    try {
      setLoading(true)
      setError('')

      const response = await axios.get(
        `${API_URL}?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`
      )

      setWeather(response.data)
      setLocation(prev => ({ ...prev, city: response.data.name }))
    } catch (error) {
      console.error('Weather API error:', error)
      setError('Unable to fetch weather data')
      // Mock fallback data
      setWeather({
        name: 'Pune',
        main: { temp: 28, humidity: 65, feels_like: 30 },
        weather: [{ main: 'Clear', description: 'clear sky' }],
        wind: { speed: 3.2 },
        visibility: 10000
      })
    } finally {
      setLoading(false)
    }
  }

  // ✅ Ask AI Advisor (mock for demo)
  const askAIAdvisor = async () => {
    if (!aiQuestion.trim()) return
    setAiLoading(true)

    try {
      const weatherContext = weather 
        ? `Current weather: ${weather.main.temp}°C, ${weather.weather[0].description}, humidity ${weather.main.humidity}%, wind ${weather.wind.speed} m/s`
        : 'Weather data unavailable'

      // Simulated AI response
      setTimeout(() => {
        const mockResponse = generateMockAIResponse(aiQuestion, weatherContext)
        setAiResponse(mockResponse)
        setAiLoading(false)
      }, 2000)
    } catch (error) {
      console.error('AI API error:', error)
      setAiResponse('🌾 कृपया थोड्या वेळाने पुन्हा प्रयत्न करा / Please try again later.')
      setAiLoading(false)
    }
  }

  // ✅ Mock AI responses
  const generateMockAIResponse = (question) => {
    const lower = question.toLowerCase()
    if (lower.includes('crop') || lower.includes('पीक')) {
      return '🌾 सध्याच्या हवामानानुसार भात आणि मका लागवड योग्य आहे.\nBased on current weather, rice and maize cultivation is suitable.'
    } else if (lower.includes('weather') || lower.includes('हवामान')) {
      return '☀️ आजचे हवामान शेतीसाठी चांगले आहे. सकाळी 6-8 वाजता सिंचन करा.\nToday’s weather is good for farming.'
    } else if (lower.includes('pest') || lower.includes('कीड')) {
      return '🐛 कीड नियंत्रणासाठी नीम तेलाचा वापर करा.\nUse neem oil spray for pest control.'
    }
    return '🌱 सध्याचे हवामान शेतीसाठी अनुकूल आहे.\nCurrent weather is favorable for farming.'
  }

  // ✅ Effects
  useEffect(() => { getUserLocation() }, [])
  useEffect(() => { if (location.lat && location.lon) fetchWeather() }, [location.lat, location.lon])

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
        <p className="animate-pulse text-gray-500">Fetching weather data...</p>
      </div>
    )
  }

  // ✅ Main UI
  return (
    <div className="space-y-6">
      {/* Weather Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Sun className="h-6 w-6 text-yellow-500 mr-2" />
            Live Weather & Crop Advisor
          </h3>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            {location.city || 'Loading...'}
            <button 
              onClick={fetchWeather}
              className="ml-2 p-1 hover:bg-gray-100 rounded"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error} - Showing demo data
          </div>
        )}

        <div className={`mb-6 p-6 rounded-xl bg-gradient-to-r ${getWeatherTheme(weather?.weather[0]?.main)} text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-2xl font-bold">{Math.round(weather?.main?.temp || 28)}°C</h4>
              <p className="text-lg opacity-90">{weather?.weather[0]?.description || 'Clear sky'}</p>
              <p className="text-sm opacity-75">Feels like {Math.round(weather?.main?.feels_like || 30)}°C</p>
            </div>
            {getWeatherIcon(weather?.weather[0]?.main, 'h-16 w-16')}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <Thermometer className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">{Math.round(weather?.main?.temp || 28)}°C</div>
            <div className="text-sm text-gray-600">Temperature</div>
          </div>

          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Droplets className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{weather?.main?.humidity || 65}%</div>
            <div className="text-sm text-gray-600">Humidity</div>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Wind className="h-8 w-8 text-gray-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-600">{Math.round((weather?.wind?.speed || 3.2) * 3.6)} km/h</div>
            <div className="text-sm text-gray-600">Wind Speed</div>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Eye className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{Math.round((weather?.visibility || 10000) / 1000)} km</div>
            <div className="text-sm text-gray-600">Visibility</div>
          </div>
        </div>
      </div>

      {/* AI Crop Advisor */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Bot className="h-6 w-6 text-green-500 mr-2" /> AI Crop Advisor
        </h3>

        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={aiQuestion}
            onChange={(e) => setAiQuestion(e.target.value)}
            placeholder="पिकाविषयी प्रश्न विचारा... / Ask about crops..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            disabled={aiLoading}
            onKeyPress={(e) => e.key === 'Enter' && askAIAdvisor()}
          />
          <button
            onClick={askAIAdvisor}
            disabled={aiLoading || !aiQuestion.trim()}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition disabled:opacity-50 flex items-center"
          >
            {aiLoading ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </button>
        </div>

        {(aiResponse || aiLoading) && (
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 text-gray-800 whitespace-pre-wrap">
                {aiLoading ? 'KrishiSakhi is thinking...' : aiResponse}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WeatherAdvisorSection
