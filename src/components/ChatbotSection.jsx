import { useState, useEffect, useRef } from 'react'
import { Bot, Send, User, Clock } from 'lucide-react'
import axios from 'axios'

const ChatbotSection = () => {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [farmer, setFarmer] = useState(null)
  const messagesEndRef = useRef(null)

  // Mock farmer data - in real app, get from auth context
  const mockFarmer = {
    _id: '507f1f77bcf86cd799439011',
    name: 'राजेश कुमार',
    phone: '9876543210',
    location: 'पुणे, महाराष्ट्र',
    crops: ['गहू', 'भात', 'मका']
  }

  useEffect(() => {
    // Initialize with welcome message
    setFarmer(mockFarmer)
    setMessages([
      {
        id: 1,
        text: `🌾 नमस्कार ${mockFarmer.name} साहेब 👋\nमी KrishiSakhi AI Assistant आहे. ${mockFarmer.location} मधील शेतकऱ्यांना मदत करतो.\nI am KrishiSakhi AI Assistant helping farmers in ${mockFarmer.location}.\n\n💡 टिप: तुमच्या ${mockFarmer.crops.join(', ')} पिकांविषयी प्रश्न विचारा!`,
        sender: 'bot',
        timestamp: new Date()
      }
    ])
    
    // Load chat history
    loadChatHistory()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadChatHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/farmer/${mockFarmer._id}/history`)
      const history = response.data.map(chat => ([
        {
          id: `q-${chat._id}`,
          text: chat.question,
          sender: 'user',
          timestamp: new Date(chat.timestamp)
        },
        {
          id: `a-${chat._id}`,
          text: chat.answer,
          sender: 'bot',
          timestamp: new Date(chat.timestamp)
        }
      ])).flat()
      
      if (history.length > 0) {
        setMessages(prev => [...prev, ...history.reverse()])
      }
    } catch (error) {
      console.error('Error loading chat history:', error)
    }
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await axios.post('http://localhost:5000/api/chatbot', {
        message: inputMessage,
        farmerId: farmer._id
      })

      const botMessage = {
        id: Date.now() + 1,
        text: response.data.reply,
        sender: 'bot',
        timestamp: new Date(response.data.timestamp)
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = {
        id: Date.now() + 1,
        text: '🔧 तांत्रिक समस्या: मी तपासून सांगतो. कृपया थोडा वेळ थांबा 🙏\nTechnical Issue: Let me check that. Please wait a moment.\n💡 टिप: पुन्हा प्रयत्न करा किंवा सोपा प्रश्न विचारा.',
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg h-[700px] flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bot className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">KrishiSakhi AI Assistant</h3>
              <p className="text-sm text-gray-500">तुमचा शेती सल्लागार</p>
            </div>
          </div>
          {farmer && (
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">{farmer.name}</p>
              <p className="text-xs text-gray-500">{farmer.location}</p>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
              <div className={`flex items-start space-x-2 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' ? 'bg-green-500' : 'bg-blue-500'
                }`}>
                  {message.sender === 'user' ? 
                    <User className="h-4 w-4 text-white" /> : 
                    <Bot className="h-4 w-4 text-white" />
                  }
                </div>
                <div className={`px-4 py-2 rounded-2xl ${
                  message.sender === 'user' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  <div className={`flex items-center mt-1 text-xs ${
                    message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                  }`}>
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="p-6 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="शेतीविषयक प्रश्न विचारा... / Ask farming questions..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        
        {/* Quick suggestions */}
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            { text: 'मातीची चाचणी', emoji: '🌱' },
            { text: 'कीड नियंत्रण', emoji: '🐛' },
            { text: 'हवामान सल्ला', emoji: '🌦️' },
            { text: 'पीक निवड', emoji: '🌾' },
            { text: 'खत सल्ला', emoji: '🌿' },
            { text: 'पाणी व्यवस्थापन', emoji: '💧' }
          ].map((suggestion) => (
            <button
              key={suggestion.text}
              onClick={() => setInputMessage(suggestion.text)}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors flex items-center gap-1"
              disabled={isLoading}
            >
              <span>{suggestion.emoji}</span>
              <span>{suggestion.text}</span>
            </button>
          ))}
        </div>
      </form>
    </div>
  )
}

export default ChatbotSection