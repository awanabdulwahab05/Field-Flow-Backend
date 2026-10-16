import jwt from 'jsonwebtoken'
import technicianModel from '../models/technician.model.js'

const technicianAuth = async (req, res, next) => {
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

        const technician = await technicianModel.findById(
            decoded.id
        )

        if (!technician) {
            return res.status(401).json({
                message: 'Technician not found'
            })
        }

        if (technician.role !== 'technician') {
            return res.status(403).json({
                message: 'Access denied'
            })
        }

        req.user = technician

        next()

    } catch (error) {
        console.error(
            'Technician authentication error:',
            error
        )

        return res.status(401).json({
            message: 'Invalid or expired token'
        })
    }
}

export default technicianAuth