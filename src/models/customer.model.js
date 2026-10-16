import mongoose from "mongoose"

const customerSchema = new mongoose.Schema(
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
            enum: ['admin', 'technician', 'customer'],
            default: 'customer'
        }
    },
    {
        timestamps: true
    }
)

const customerModel = mongoose.model('Customer', customerSchema)

export default customerModel