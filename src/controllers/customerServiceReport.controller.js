import complaintModel from "../models/complaint.model.js"

export const getCustomerReports = async (req, res) => {
    try {
        const customerId = req.user.id

        const reports = await complaintModel.find({
            customer: customerId
        }).populate('technician', 'name')

        return res.status(200).json({
            message: 'Reports fetched successfully',
            reports
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}