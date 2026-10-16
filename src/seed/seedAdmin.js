import bcrypt from 'bcrypt'
import adminModel from '../models/admin.model.js'
import connectDB from '../database/db.js'

const seedAdmin = async () => {
    try {
        await connectDB()

        const existingAdmin = await adminModel.findOne({
            email: 'admin@fieldflow.com'
        })

        if (existingAdmin) {
            console.log('Admin already exists')
            process.exit(0)
        }

        const hashedPassword = await bcrypt.hash(
            'Admin@123',
            12
        )

        const admin = await adminModel.create({
            name: 'FieldFlow Admin',
            email: 'admin@fieldflow.com',
            password: hashedPassword,
            role: 'admin'
        })

        console.log('Admin created successfully')
        console.log('Email:', admin.email)
        console.log('Password: Admin@123')

        process.exit(0)

    } catch (error) {
        console.error('Admin seed error:', error)
        process.exit(1)
    }
}

seedAdmin()