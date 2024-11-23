import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

class genaiController {
    // Static method to generate content
    static generate = async (req, res) => {
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const question = req.body.question; // Extract question from the request body

        // Check if question is provided
        if (!question) {
            return res.status(400).json({ error: 'question is required' });
        }

        try {
            // Generate content using the model
            const result = await model.generateContent(question);
            // Send the generated content as a response
            return res.json({ response: result.response.text() });
        } catch (error) {
            console.error('Error generating content:', error);
            return res.status(500).json({ error: 'Failed to generate content' });
        }
    }
}







export default genaiController