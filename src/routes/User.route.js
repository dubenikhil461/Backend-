import express from 'express'
import { createUser,deleteuser,getallusers,getuser, updateuser } from '../Controller/User.js'
const router = express.Router()

router
    .post('/u',createUser)
    .get('/users',getallusers)
    .get('/:id',getuser)
    .patch('/:id',updateuser)
    .delete('/:id',deleteuser)

export default router;