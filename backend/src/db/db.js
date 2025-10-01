import mongoose from "mongoose"


const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connected successfully host !!",conn.connection.host );
        
    } catch (error) {
        console.log("mongodb connection failed:",error.message);
        process.exit(1)
    }
}


export {connectDB}
