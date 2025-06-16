import express from 'express'
import { createUser,getallusers,getuser } from '../Controller/User.js'
const router = express.Router()

router
    .post('/u',createUser)
    .get('/users',getallusers)
    .get('/:id',getuser)

export default router;