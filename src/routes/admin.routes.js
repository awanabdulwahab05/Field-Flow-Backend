import { Router } from "express"
import { approveComplaint, getAllComplaints, getAllTechnicians } from "../controllers/adminComplaints.controller.js"
import adminAuth from "../middlewares/adminAuth.middleware.js"

const adminRouter = Router()

//  /api/admin/complaints       GET 
adminRouter.get('/complaints', adminAuth, getAllComplaints)

// /api/admin/get-technicians   GET
adminRouter.get('/get-technicians', adminAuth, getAllTechnicians)

// /api/admin/:id/approve     PATCH
adminRouter.patch('/:complaintId/approve', adminAuth, approveComplaint)

export default adminRouter