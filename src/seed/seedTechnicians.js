import bcrypt from 'bcrypt'
import technicianModel from '../models/technician.model.js'
import connectDB from '../database/db.js'

const seedTechnicians = async () => {
    try {
        await connectDB()

        const technicians = [
            {
                name: 'Ali Raza',
                email: 'ali@fieldflow.com',
                password: 'Technician@123',
                role: 'technician'
            },
            {
                name: 'Usman Khan',
                email: 'usman@fieldflow.com',
                password: 'Technician@123',
                role: 'technician'
            },
            {
                name: 'Hamza Ahmed',
                email: 'hamza@fieldflow.com',
                password: 'Technician@123',
                role: 'technician'
            }
        ]

        for (const technician of technicians) {
            const existingTechnician = await technicianModel.findOne({
                email: technician.email
            })

            if (existingTechnician) {
                console.log(
                    `${technician.email} already exists`
                )
                continue
            }

            const hashedPassword = await bcrypt.hash(
                technician.password,
                12
            )

            await technicianModel.create({
                name: technician.name,
                email: technician.email,
                password: hashedPassword,
                role: technician.role
            })

            console.log(
                `${technician.name} created successfully`
            )
        }

        console.log('Technician seeding completed')

        process.exit(0)

    } catch (error) {
        console.error('Technician seed error:', error)
        process.exit(1)
    }
}

seedTechnicians()