const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const connectDB=require("./config/db");
const userRoutes=require("./routes/userRoutes");
const productRoute=require("./routes/productRoute");
const cartRoute=require("./routes/cartRoute");
const checkoutRoutes=require("./routes/checkoutRoutes");
const orderRoutes=require("./routes/OrderRoute");

const app=express();
app.use(express.json());
app.use(cors());

dotenv.config();    
const PORT=process.env.PORT || 8000;
connectDB();

console.log(PORT);


app.get("/",(req,res)=>{
    res.send("welcome to eShop API!");
})

//API Routes
app.use("/api/users",userRoutes);
app.use("/api/products",productRoute);
app.use("/api/cart",cartRoute);
app.use("/api/checkout",checkoutRoutes);
app.use("/api/order",orderRoutes);


app.listen(PORT,()=>{
    console.log("this port run on port 8000");
})