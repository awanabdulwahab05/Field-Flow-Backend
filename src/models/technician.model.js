import mongoose from 'mongoose'

const technicianSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ['technician'],
            default: 'technician'
        }
    },
    {
        timestamps: true
    }
)

const technicianModel = mongoose.model('Technician', technicianSchema)

export default technicianModel