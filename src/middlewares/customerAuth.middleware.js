import jwt from 'jsonwebtoken'
import customerModel from '../models/customer.model.js'

const customerAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                message: 'Authentication required'
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        const customer = await customerModel.findById(decoded.id)

        if (!customer) {
            return res.status(401).json({
                message: 'Customer not found'
            })
        }

        if (customer.role !== 'customer') {
            return res.status(403).json({
                message: 'Access denied'
            })
        }

        req.user = customer

        next()

    } catch (error) {
        console.error('Customer authentication error:', error)

        return res.status(401).json({
            message: 'Invalid or expired token'
        })
    }
}

export default customerAuth