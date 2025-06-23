import express from 'express';
import dotenv from 'dotenv';
import db from './src/config/Db.js';
// import Tour from './src/routes/Tour.route.js';
import approute from './src/routes/route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For form datadb();
app.use(cookieParser());

db()
app.get('/', (req, res) => {
  res.send('api is working...');
});
// app.use('/p/tour',Tour)
app.use('/o',approute);

app.listen(process.env.PORT, () => {``
  console.log(`Listening on port http://localhost:${process.env.PORT}`);
});
