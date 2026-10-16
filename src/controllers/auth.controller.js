import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import customerModel from '../models/customer.model.js'
import adminModel from '../models/admin.model.js'
import technicianModel from '../models/technician.model.js'

/**
 * @desc Login Admin
 * @access Public
 */
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            })
        }

        const admin = await adminModel.findOne({ email })

        if (!admin) {
            return res.status(401).json({
                message: 'Invalid email'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            admin.password
        )

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: 'Invalid password'
            })
        }

        const token = jwt.sign(
            {
                id: admin._id,
                role: admin.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        })

        return res.status(200).json({
            message: 'Admin login successful',
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        })

    } catch (error) {
        console.error('Admin login error:', error)

        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

/**
 * @desc Register Customer
 */
export const registerCustomer = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Name, email and password are required'
            })
        }

        const existingCustomer = await customerModel.findOne({ email })

        if (existingCustomer) {
            return res.status(409).json({
                message: 'Customer already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const customer = await customerModel.create({
            name,
            email,
            password: hashedPassword,
            role: 'customer'
        })

        const token = jwt.sign(
            {
                id: customer._id,
                role: customer.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        })

        return res.status(201).json({
            message: 'Registration successful',
            customer: {
                id: customer._id,
                name: customer.name,
                email: customer.email,
                role: customer.role
            }
        })

    } catch (error) {
        console.error('Register error:', error)

        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}


/**
 * @desc Login Customer
 */
export const loginCustomer = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            })
        }

        const customer = await customerModel.findOne({ email })

        if (!customer) {
            return res.status(401).json({
                message: 'Invalid email!'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            customer.password
        )

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: 'Invalid password'
            })
        }

        const token = jwt.sign(
            {
                id: customer._id,
                role: customer.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        })

        return res.status(200).json({
            message: 'Login successful',
            customer: {
                id: customer._id,
                name: customer.name,
                email: customer.email,
                role: customer.role
            }
        })

    } catch (error) {
        console.error('Login error:', error)

        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

// Get Current Customer
export const getCurrentCustomer = async (req, res) => {
    try {
        return res.status(200).json({
            customer: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role
            }
        })

    } catch (error) {
        console.error('Get customer error:', error)

        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

/**
 * @desc Login Technician
 * @access Public
 */
export const loginTechnician = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            })
        }

        const technician = await technicianModel.findOne({
            email
        })

        if (!technician) {
            return res.status(401).json({
                message: 'Invalid email'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            technician.password
        )

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: 'Invalid password'
            })
        }

        const token = jwt.sign(
            {
                id: technician._id,
                role: technician.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        })

        return res.status(200).json({
            message: 'Technician login successful',
            technician: {
                id: technician._id,
                name: technician.name,
                email: technician.email,
                role: technician.role
            }
        })

    } catch (error) {
        console.error('Technician login error:', error)

        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}
