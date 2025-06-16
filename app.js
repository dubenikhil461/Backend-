import express from 'express';
import dotenv from 'dotenv';
import db from '../project/src/config/Db.js'
import User from '../project/src/routes/User.route.js'
dotenv.config();

const app = express();
app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For form datadb();
// ✅ Routes
app.get('/', (req, res) => {
  res.send('hello');
});

app.use('/p/user',User)
db()
// ✅ Fix PORT variable name in log
app.listen(process.env.PORT, () => {
  console.log(`Listening on port http://localhost:${process.env.PORT}`);
});
