import { Router } from 'express'
import {
    getAllComplaints,
    updateServiceReport
} from '../controllers/technicianServiceReport.controller.js'
import technicianAuth from '../middlewares/technicianAuth.middleware.js'

const technicianRouter = Router()

//      /api/technician/complaints      GET
technicianRouter.get('/complaints', technicianAuth, getAllComplaints)


//      /api/technician/:comlpaintId
technicianRouter.patch('/:complaintId', technicianAuth, updateServiceReport)

export default technicianRouter