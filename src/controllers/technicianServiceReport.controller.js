import complaintModel from '../models/complaint.model.js'

/**
 * @description Get all assigned works
 */
export const getAllComplaints = async (req, res) => {
    try {
        const Complaints = await complaintModel
            .find({ status: 'assigned' })
            .sort({ createdAt: -1 })

        return res.status(200).json({
            message: 'Complaints fetched successfully',
            Complaints
        })
    } catch (error) {
        console.error('Get complaints error:', error)

        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

export const updateServiceReport = async (req, res) => {
    try {
        const { complaintId } = req.params

        const {
            diagnosis,
            workDescription,
            partsUsed,
            laborCost,
            totalCost,
            technicianNotes,
            status
        } = req.body

        const updatedComplaint = await complaintModel.findByIdAndUpdate(
            complaintId,
            {
                diagnosis,
                workDescription,
                partsUsed,
                laborCost,
                totalCost,
                technicianNotes,
                status
            },
            {
                new: true,
                runValidators: true
            }
        )

        if (!updatedComplaint) {
            return res.status(404).json({
                message: 'Complaint not found'
            })
        }

        return res.status(200).json({
            message: 'Service report updated successfully',
            complaint: updatedComplaint
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}