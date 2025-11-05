import { useState, useEffect } from 'react'
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye,
  Send,
  Bot,
  MapPin,
  RefreshCw
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

  // API Keys - Replace with your actual keys
  const WEATHER_API_KEY = "395ca1231bc84165a6c141054252710"
  const AI_API_KEY = "YOUR_AI_API_KEY"

  // Weather icons mapping
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

  // Get weather color theme
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

  // Get user location
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
          // Fallback to default location (Mumbai)
          setLocation({ lat: 19.0760, lon: 72.8777, city: 'Mumbai' })
        }
      )
    } else {
      // Fallback location
      setLocation({ lat: 19.0760, lon: 72.8777, city: 'Mumbai' })
    }
  }

  // Fetch weather data
  const fetchWeather = async () => {
    if (!location.lat || !location.lon) return

    try {
      setLoading(true)
      setError('')
      
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${WEATHER_API_KEY}&units=metric`
      )
      
      setWeather(response.data)
      setLocation(prev => ({ ...prev, city: response.data.name }))
    } catch (error) {
      console.error('Weather API error:', error)
      setError('Unable to fetch weather data')
      // Mock data for demo
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

  // Ask AI Advisor
  const askAIAdvisor = async () => {
    if (!aiQuestion.trim()) return

    setAiLoading(true)
    try {
      // Mock AI response for demo - replace with actual AI API call
      const weatherContext = weather ? 
        `Current weather: ${weather.main.temp}°C, ${weather.weather[0].description}, humidity ${weather.main.humidity}%, wind ${weather.wind.speed} m/s` : 
        'Weather data unavailable'

      // Simulate AI API call
      setTimeout(() => {
        const mockResponse = generateMockAIResponse(aiQuestion, weatherContext)
        setAiResponse(mockResponse)
        setAiLoading(false)
      }, 2000)

      // Actual AI API call would be:
      /*
      const response = await axios.post('YOUR_AI_ENDPOINT', {
        prompt: `Weather context: ${weatherContext}\nFarmer question: ${aiQuestion}\nProvide agricultural advice:`,
        max_tokens: 200
      }, {
        headers: { 'Authorization': `Bearer ${AI_API_KEY}` }
      })
      setAiResponse(response.data.choices[0].text)
      */

    } catch (error) {
      console.error('AI API error:', error)
      setAiResponse('🌾 मी तपासून सांगतो. कृपया थोडा वेळ थांबा 🙏 / Let me check that for you. Please try again.')
    }
  }

  // Generate mock AI response
  const generateMockAIResponse = (question, weatherContext) => {
    const responses = {
      'crop': '🌾 सध्याच्या हवामानानुसार भात आणि मका लागवड योग्य आहे. तापमान 28°C आणि आर्द्रता 65% असल्याने सिंचनाची योग्य वेळ आहे.\n\nBased on current weather (28°C, 65% humidity), rice and maize cultivation is suitable. Good time for irrigation.',
      'weather': '☀️ आजचे हवामान शेतीसाठी चांगले आहे. सकाळी 6-8 वाजता सिंचन करा. दुपारी थेट सूर्यप्रकाशापासून पिके संरक्षित करा.\n\nToday\'s weather is good for farming. Irrigate between 6-8 AM. Protect crops from direct sunlight in afternoon.',
      'pest': '🐛 सध्याच्या आर्द्रतेमुळे कीड लागण्याची शक्यता आहे. नीम तेलाचे फवारणी करा आणि पिकांची नियमित तपासणी करा.\n\nCurrent humidity may cause pest issues. Use neem oil spray and regularly inspect crops.',
      'default': '🌱 सध्याचे हवामान शेतीसाठी अनुकूल आहे. योग्य सिंचन करा आणि पिकांची काळजी घ्या. काही विशिष्ट प्रश्न असल्यास विचारा.\n\nCurrent weather is favorable for farming. Maintain proper irrigation and crop care. Ask specific questions if needed.'
    }

    const lowerQuestion = question.toLowerCase()
    if (lowerQuestion.includes('crop') || lowerQuestion.includes('पीक')) return responses.crop
    if (lowerQuestion.includes('weather') || lowerQuestion.includes('हवामान')) return responses.weather
    if (lowerQuestion.includes('pest') || lowerQuestion.includes('कीड')) return responses.pest
    return responses.default
  }

  useEffect(() => {
    getUserLocation()
  }, [])

  useEffect(() => {
    if (location.lat && location.lon) {
      fetchWeather()
    }
  }, [location.lat, location.lon])

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Weather Cards */}
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

        {/* Weather Overview */}
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

        {/* Weather Details Grid */}
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

        {/* Quick Weather Recommendations */}
        <div className="p-4 bg-green-50 rounded-lg">
          <h4 className="font-medium text-green-800 mb-2">🌾 Today's Weather-Based Recommendations:</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• {weather?.main?.temp > 30 ? 'High temperature - increase irrigation frequency' : 'Moderate temperature - normal irrigation schedule'}</li>
            <li>• {weather?.main?.humidity > 70 ? 'High humidity - monitor for fungal diseases' : 'Good humidity levels for crop growth'}</li>
            <li>• {weather?.wind?.speed > 5 ? 'Windy conditions - secure young plants' : 'Calm conditions - good for spraying treatments'}</li>
          </ul>
        </div>
      </div>

      {/* AI Crop Advisor */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Bot className="h-6 w-6 text-green-500 mr-2" />
          AI Crop Advisor
        </h3>

        {/* Input Section */}
        <div className="mb-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              placeholder="पिकाविषयी प्रश्न विचारा... / Ask about crops based on current weather..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              disabled={aiLoading}
              onKeyPress={(e) => e.key === 'Enter' && askAIAdvisor()}
            />
            <button
              onClick={askAIAdvisor}
              disabled={aiLoading || !aiQuestion.trim()}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {aiLoading ? (
                <RefreshCw className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </div>
          
          {/* Quick Questions */}
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              'What crop should I plant this week?',
              'मातीची चाचणी कशी करावी?',
              'Best irrigation schedule?',
              'कीड नियंत्रण कसे करावे?'
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setAiQuestion(suggestion)}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                disabled={aiLoading}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* AI Response */}
        {(aiResponse || aiLoading) && (
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                {aiLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-sm text-gray-600">KrishiSakhi is thinking...</span>
                  </div>
                ) : (
                  <div className="text-gray-800 whitespace-pre-wrap">{aiResponse}</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WeatherAdvisorSection