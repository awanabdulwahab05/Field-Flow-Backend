import jwt from 'jsonwebtoken'
import adminModel from '../models/admin.model.js'

const adminAuth = async (req, res, next) => {
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

        const admin = await adminModel.findById(decoded.id)

        if (!admin) {
            return res.status(401).json({
                message: 'Admin not found'
            })
        }

        if (admin.role !== 'admin') {
            return res.status(403).json({
                message: 'Access denied'
            })
        }

        req.user = admin

        next()

    } catch (error) {
        console.error('Admin authentication error:', error)

        return res.status(401).json({
            message: 'Invalid or expired token'
        })
    }
}

export default adminAuth