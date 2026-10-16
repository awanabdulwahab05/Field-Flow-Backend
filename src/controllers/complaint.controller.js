import complaintModel from '../models/complaint.model.js'

/**
 * @desc Create a complaint
 * @access Customer
 */
export const createComplaint = async (req, res) => {
    try {
        const { problem, location, urgency } = req.body

        if (!problem || !location?.address || !location?.city) {
            return res.status(400).json({
                message: 'Problem, address and city are required'
            })
        }

        const complaint = await complaintModel.create({
            customer: req.user.id,

            problem,

            location: {
                address: location.address,
                city: location.city,
                latitude: location.latitude,
                longitude: location.longitude
            },

            urgency: urgency || 'normal'
        })

        return res.status(201).json({
            message: 'Complaint submitted successfully',
            complaint
        })

    } catch (error) {
        console.error('Create complaint error:', error)

        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}