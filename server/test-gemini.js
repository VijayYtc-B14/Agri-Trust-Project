import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

async function testGemini() {
  try {
    console.log('🧪 Testing Gemini API...');
    
    const prompt = "You are KrishiSakhi AI Assistant. A farmer asks: 'मातीची चाचणी कशी करावी?' Respond in Marathi and English mix, under 50 words.";
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Gemini API Response:');
    console.log(text);
    console.log('\n🎉 Gemini API is working correctly!');
    
  } catch (error) {
    console.error('❌ Gemini API Error:', error.message);
    
    if (error.message.includes('API_KEY_INVALID')) {
      console.log('💡 Please check your GEMINI_API_KEY in .env file');
    }
  }
}

testGemini();