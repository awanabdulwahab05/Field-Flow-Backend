import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to Database')
    } catch (error) {
        console.log('Error in connecting to databases', error)
    }
}

export default connectDB