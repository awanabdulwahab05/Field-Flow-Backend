import complaintModel from '../models/complaint.model.js'
import technicianModel from '../models/technician.model.js'

/**
 * @desc Get all complaints
 * @access Admin
 */
export const getAllComplaints = async (req, res) => {
    try {
        const complaints = await complaintModel
            .find({ status: 'pending' })
            .populate('customer', 'name email')
            .sort({ createdAt: -1 })

        return res.status(200).json({
            message: 'Complaints fetched successfully',
            complaints
        })

    } catch (error) {
        console.error('Get complaints error:', error)

        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}


/**
 * @desc Fetch all technicians
 * @access Admin
 */
export const getAllTechnicians = async (req, res) => {
    try {
        const technicians = await technicianModel
            .find()
            .select('name email')

        return res.status(200).json({
            message: 'Technicians fetched successfully',
            technicians
        })

    } catch (error) {
        console.error('Get technicians error:', error)

        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}


/**
 * @desc Approve complaint and assign technician
 * @access Admin
 */
export const approveComplaint = async (req, res) => {
    try {
        const { complaintId } = req.params
        const { technicianId } = req.body

        if (!technicianId) {
            return res.status(400).json({
                message: 'Technician is required'
            })
        }

        // Check technician
        const technician = await technicianModel.findById(
            technicianId
        )

        if (!technician) {
            return res.status(404).json({
                message: 'Technician not found'
            })
        }

        const updatedComplaint = await complaintModel.findByIdAndUpdate(
            complaintId,
            {
                status: 'assigned',
                technician: technicianId
            },
            { new: true, runValidators: true }
        )

        return res.status(200).json({
            message: 'Complaint updated successfully',
            complaint: updatedComplaint
        })

    } catch (error) {
        console.error('Approve complaint error:', error)

        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}