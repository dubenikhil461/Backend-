import express from 'express'
import { createTour,deletetour,getalltours,gettour, gettourplan, gettourstat, updatetour } from '../Controller/Tour.js'
const router = express.Router()

router
    .post('/u',createTour)
    .get('/tours',getalltours) // dynamic route should came after static
    .get('/stat',gettourstat) 
    .get('/:role',gettourplan)
    .get('/:id',gettour)
    .patch('/:id',updatetour)
    .delete('/:id',deletetour)
export default router;