import mongoose from "mongoose";
import env from 'dotenv';

env.config();

async function connectDatabase() {
    try {
        await mongoose.connect(process.env.DATABASE_STRING);
        console.log('✅ Database ON');
    } catch (e) {
        console.log(e);
    }
}


export default connectDatabase;