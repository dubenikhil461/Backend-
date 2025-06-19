import express from 'express'
import { createUser,deleteuser,getallusers,getuser, getuserstat, updateuser } from '../Controller/User.js'
const router = express.Router()

router
    .post('/u',createUser)
    .get('/users',getallusers) // dynamic route should came after static
    .get('/stat',getuserstat) 
    .get('/:id',getuser)
    .patch('/:id',updateuser)
    .delete('/:id',deleteuser)
export default router;