# KrishiSakhi AI Assistant - Full Stack Chatbot

A bilingual (Marathi + English) AI chatbot system for farmers with MongoDB integration and OpenAI GPT-4o-mini.

## 🚀 Features

- **Bilingual Support**: Marathi + English agriculture assistance
- **Real-time Chat**: WebSocket-like experience with instant responses
- **Chat History**: Persistent storage in MongoDB
- **Farmer Profiles**: Registration and profile management
- **Context-Aware**: AI remembers conversation history
- **Mobile Responsive**: Works on all devices

## 📁 Project Structure

```
neww/
├── src/                          # Frontend (React + Vite)
│   ├── components/
│   │   ├── ChatbotSection.jsx    # Main chatbot component
│   │   ├── FarmerDashboard.jsx   # Dashboard with chatbot
│   │   └── ...
│   └── ...
├── server/                       # Backend (Node.js + Express)
│   ├── models/
│   │   ├── Farmer.js            # Farmer schema
│   │   └── ChatHistory.js       # Chat history schema
│   ├── routes/
│   │   ├── farmer.js            # Farmer routes
│   │   └── chatbot.js           # Chatbot routes
│   ├── .env                     # Environment variables
│   ├── server.js                # Main server file
│   └── package.json
└── README.md
```

## 🛠️ Setup Instructions

### 1. Environment Setup

Create `server/.env` file:
```env
OPENAI_API_KEY=your_openai_api_key_here
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/krishisakhi
PORT=5000
```

### 2. Backend Setup

```bash
cd server
npm install
npm run dev
```

### 3. Frontend Setup

```bash
# In root directory
npm install
npm run dev
```

### 4. MongoDB Setup

1. Create MongoDB Atlas account
2. Create cluster and database named `krishisakhi`
3. Get connection string and update `MONGO_URI` in `.env`
4. Collections will be created automatically

### 5. OpenAI Setup

1. Get OpenAI API key from https://platform.openai.com/
2. Add to `OPENAI_API_KEY` in `.env`

## 🔧 API Endpoints

### Farmer Routes
- `POST /api/farmer/register` - Register new farmer
- `GET /api/farmer/:id/history` - Get chat history
- `GET /api/farmer/phone/:phone` - Get farmer by phone

### Chatbot Routes
- `POST /api/chatbot` - Send message to AI assistant

## 💬 Chatbot Features

### System Behavior
- Greets with "Namaskar Farmer Saheb 👋"
- Provides agriculture-focused advice
- Supports Marathi + English
- Remembers conversation context
- Stores all messages in MongoDB

### Supported Topics
- Crop selection and planning
- Pest control and diseases
- Weather-based farming advice
- Soil health and fertilizers
- Farming techniques and best practices

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Render/Railway)
```bash
# Push to GitHub
# Connect to Render/Railway
# Add environment variables
```

## 📱 Usage

1. **Register Farmer**: Use farmer registration form
2. **Start Chat**: Click on "AI Chatbot" in dashboard
3. **Ask Questions**: Type in Marathi or English
4. **View History**: Previous conversations are automatically loaded

## 🔍 Example Conversations

**User**: "मातीची चाचणी कशी करावी?"
**AI**: "नमस्कार! मातीची चाचणी करण्यासाठी: 1) pH मीटर वापरा 2) NPK टेस्ट किट घ्या 3) कृषी केंद्रात नमुना पाठवा. आपल्या शेतीसाठी योग्य खत निवडण्यासाठी हे महत्वाचे आहे 🌱"

**User**: "Best time to plant wheat?"
**AI**: "Wheat planting time in Maharashtra: October-December (Rabi season). Soil temperature should be 15-20°C. Ensure proper irrigation and use certified seeds for better yield 🌾"

## 🛡️ Error Handling

- Fallback responses for API failures
- Graceful handling of network issues
- User-friendly error messages in both languages

## 📊 Database Schema

### Farmer Collection
```javascript
{
  name: String,
  phone: String (unique),
  location: String,
  crops: [String],
  createdAt: Date
}
```

### ChatHistory Collection
```javascript
{
  farmerId: ObjectId,
  question: String,
  answer: String,
  timestamp: Date
}
```

## 🔧 Development

### Adding New Features
1. **Pest Detection**: Add image upload to chatbot
2. **Weather Integration**: Connect OpenWeatherMap API
3. **Voice Support**: Add speech-to-text functionality
4. **Offline Mode**: Cache responses for offline use

### Testing
```bash
# Backend tests
cd server && npm test

# Frontend tests  
npm test
```

## 📞 Support

For technical issues or feature requests, please create an issue in the repository.

---

**Made with ❤️ for Indian Farmers**