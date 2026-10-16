import { Router } from 'express'
import { getCustomerReports } from '../controllers/customerServiceReport.controller.js'
import customerAuth from '../middlewares/customerAuth.middleware.js'

const customerServiceRouter = Router()

//      /api/customer/report     GET
customerServiceRouter.get(
    '/report',
    customerAuth,
    getCustomerReports
)

export default customerServiceRouter