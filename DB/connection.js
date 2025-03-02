import mongoose from "mongoose";


const connectDB = () => {
    
    return mongoose.connect(process.env.DB_URL)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.error(`MongoDB connection error: ${err}`));

}



export default connectDB;