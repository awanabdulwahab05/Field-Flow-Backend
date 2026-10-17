import express from 'express'
import connectDB from './src/database/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './src/routes/auth.routes.js'
import complaintRouter from './src/routes/complaint.routes.js'
import adminRouter from './src/routes/admin.routes.js'
import technicianRouter from './src/routes/technicain.routes.js'
import customerServiceRouter from './src/routes/customerServiceReport.routes.js'

const PORT = process.env.PORT
const app = express()

// Middlewares
app.use(express.json())
app.use(cookieParser())

// Database Connection
connectDB()

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://field-flow-self.vercel.app"
    ],
    credentials: true
}));

// Routes
app.use('/api', authRouter)
app.use('/api/complaint', complaintRouter)
app.use('/api/admin', adminRouter)
app.use('/api/technician', technicianRouter)
app.use('/api/customer', customerServiceRouter)

app.listen(PORT, () => console.log(`Server is running on port ${8000}`))