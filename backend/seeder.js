const mongoose=require("mongoose");
const dotenv=require("dotenv");
const Product=require("./models/Product");
const User=require("./models/User");
const products=require("./data/products");
const Cart=require("./models/Cart");

dotenv.config();

//connect to mongodb

mongoose.connect(process.env.MONGO_URI);

//function to seed data

const seedData=async ()=>{
    try {
        //clear existing data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();
        //create a default admin user
        const createdUser=await User.create({
            name:"Admin User",
            email:"admin@gmail.com",
            password:"123456",
            role:"admin",
        });

        //Assign the default user ID to each Product
      const userID=createdUser._id;

      const sampleProducts=products.map((product)=>{
        return {...product,user:userID};
      });

      //Insert the product in to the database
      await Product.insertMany(sampleProducts);
      console.log("Product data seeded successfully");
      process.exit();
    } catch (error) {
        console.error("Error seeding the data",error);
        process.exit(1);
    }
}
seedData();