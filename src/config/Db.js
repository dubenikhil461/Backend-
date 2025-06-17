import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import User from '../models/User.js';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

 const db = async () => {
  try {
    const dbUrl = process.env.MONGODB_URL.replace('<db_password>', process.env.DB_PASSWORD);
    const connect = await mongoose.connect(dbUrl);
    console.log('MongoDB connected:', connect.connection.host);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const user = JSON.parse(fs.readFileSync(join(__dirname, 'import-data.json'), 'utf-8'));

const importData = async () => {
  try {
    await User.create(user);
    console.log('Users added successfully');
  } catch (error) {
    console.error(error);
  }
//   process.exit();
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log('Users deleted successfully');
  } catch (error) {
    console.error(error);
  }
//   process.exit();
};

if(process.argv[2]==='--import') importData()
if(process.argv[2]==='--delete') deleteData()

 export default db
