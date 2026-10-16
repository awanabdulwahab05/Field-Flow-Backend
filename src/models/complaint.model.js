import mongoose, { trusted } from 'mongoose'

const complaintSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true
        },

        problem: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            address: {
                type: String,
                required: true,
                trim: true
            },

            city: {
                type: String,
                required: true,
                trim: true
            },

            street: String,
            houseNumber: String
        },

        urgency: {
            type: String,
            enum: ['normal', 'urgent'],
            default: 'normal'
        },

        mobileNumber: {
            type: String,
            trim: trusted
        },

        status: {
            type: String,
            enum: ['pending', 'assigned', 'rejected', 'working', 'completed'],
            default: 'pending'
        },

        technician: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Technician',
            default: null
        },

        diagnosis: String,

        workDescription: String,

        partsUsed: [
            {
                name: {
                    type: String,
                    trim: true
                },

                quantity: {
                    type: Number,
                    default: 1
                },

                price: {
                    type: Number,
                    default: 0
                }
            }
        ],

        laborCost: {
            type: Number,
            default: 0
        },

        totalCost: {
            type: Number,
            default: 0
        },

        technicianNotes: {
            type: String,
            trim: true
        },

    },
    {
        timestamps: true
    }
)

const complaintModel = mongoose.model('Complaint', complaintSchema)

export default complaintModel