import { Router } from "express"
import { getCurrentCustomer, loginAdmin, loginCustomer, loginTechnician, registerCustomer } from "../controllers/auth.controller.js"
import customerAuth from "../middlewares/customerAuth.middleware.js"

const authRouter = Router()

// Register_Customer     /api/customer/register     POST
authRouter.post('/customer/register', registerCustomer)

// Login_Customer    /api/customer/login    POST
authRouter.post('/customer/login', loginCustomer)

// Get_Customer_Info    /api/customer/me     GET
authRouter.get('/customer/me', customerAuth, getCurrentCustomer)

// Admin_login  /api/admin/login    POST
authRouter.post('/admin/login', loginAdmin)

// Tech...Login     api/technician/login    POST
authRouter.post('/technnician/login', loginTechnician)


export default authRouter