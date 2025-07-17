const mongoose =require("mongoose");

const connectDB=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoodb connected successfully");
    } catch (err) {
        console.error("MongoDb  connection failed",err);
    }
}

module.exports=connectDB;