import express from 'express'
const router = express.Router()
import userroute from '../Controller/User.js'; router.use('/p/user', userroute)

export default router