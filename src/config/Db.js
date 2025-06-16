import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const db = async () => {
    try {
        const dbUrl = process.env.MONGODB_URL.replace('<db_password>', process.env.DB_PASSWORD);
        const connect = await mongoose.connect(`${dbUrl}`);
        console.log('MongoDB connected:', connect.connection.host);
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1)
    }
}
export default db;