import app from './app.js'
import connectDatabase from './src/config/database.js';
import { connectToWhatsApp } from './src/services/whatssapService.js';

async function connectServer() {
    try {
        await connectDatabase();
        // await connectToWhatsApp();
        app.listen(3000, () => console.log('✅ Server ON'));
    } catch (e) {
        console.log(e);
    }
}

connectServer()