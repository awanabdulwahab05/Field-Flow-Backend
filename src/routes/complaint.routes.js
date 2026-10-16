import { Router } from "express"
import { createComplaint } from "../controllers/complaint.controller.js"
import customerAuth from "../middlewares/customerAuth.middleware.js"

const complaintRouter = Router()

//  A complaint created by user.
// /api/complaint/create       POST
complaintRouter.post('/create', customerAuth, createComplaint)

export default complaintRouter