import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

async function simpleTest() {
  try {
    console.log('🔑 API Key:', process.env.GEMINI_API_KEY ? 'Present' : 'Missing');
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Try different model names
    const modelNames = ['gemini-pro', 'models/gemini-pro', 'gemini-1.5-pro', 'models/gemini-1.5-pro'];
    
    for (const modelName of modelNames) {
      try {
        console.log(`\n🧪 Testing model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello");
        const response = await result.response;
        console.log(`✅ ${modelName} works!`);
        console.log('Response:', response.text());
        break;
      } catch (error) {
        console.log(`❌ ${modelName} failed:`, error.message.split('\n')[0]);
      }
    }
    
  } catch (error) {
    console.error('❌ General Error:', error.message);
  }
}

simpleTest();