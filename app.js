import express from 'express';
import dotenv from 'dotenv';
import db from './src/config/Db.js'
import User from './src/routes/User.route.js'
dotenv.config();

const app = express();
app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For form datadb();

app.get('/', (req, res) => {
  res.send('api is working...');
});
 db()
app.use('/p/user',User)

app.all('*',(req,res,next)=>{
  res.status(404).json({
    status : 'failed',
    message : `can't find ${req.originalUrl} on this server`
  });
  // next()
})
app.listen(process.env.PORT, () => {
  console.log(`Listening on port http://localhost:${process.env.PORT}`);
});
