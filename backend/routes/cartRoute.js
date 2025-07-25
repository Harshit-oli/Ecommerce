const express=require("express");
const Cart=require("../models/Cart");
const Product=require("../models/Product");
const {protect}=require("../middleware/authMiddleware");

const router=express.Router();


//Helper function to get a cart by user Id or guest ID

const getCart=async (userId,guestId)=>{
    if(userId){
        return await Cart.findOne({user:userId});
    }
    else if(guestId){
        return await Cart.findOne({guestId});
    }
    return null;
}


// Add a product to the cart for a guest or logged in user
//bhai simple sa humne yha cart create kiya hai jo shoppingcart nhi h uski tarah dikhta hai jo 🛒->-> ye wala

router.post("/",async(req,res)=>{
    const {productId, quantity, size, color, guestId, userId}=req.body;

    try {
        const product=await Product.findById(productId);
        if(!product) return res.status(404).json({message:"product not found"});

        //determine if the user is logged in or guest

        let cart=await getCart(userId,guestId);
        //if the cart exists ,update it

        // yha agar phle se cart present hai to ye chlega cart present ka matlab ji phle se cart ke andar product present hoga
        if(cart){
            const productIndex=cart.products.findIndex(
                (p)=>
                    p.productId.toString()=== productId && p.size === size && p.color === color
            );

            if(productIndex > -1){
                // if the product already exists, update the quntity
                cart.products[productIndex].quantity +=quantity;
            }
            else{
                // add new product
                cart.products.push({
                    productId,
                    name:product.name,
                    image:product.images[0].url,
                    price:product.price,
                    size,
                    color,
                    quantity,
                })
            }
            //Recalculate the total price
            cart.totalPrice=cart.products.reduce(
                (acc,item)=>acc + item.price * item.quantity,
                0
            );
            await cart.save();
            return res.status(200).json(cart);
        }
        else{
            //create a new cart for the guest or user
            const newCart=await Cart.create({
                user:userId ? userId :undefined,
                guestId:guestId ? guestId : "guest_"+ new Date().getTime(),
                products:[
                    {
                        productId,
                        name:product.name,
                        image:product.images[0].url,
                        price:product.price,
                        size,
                        color,
                        quantity,
                    }
                ],
                totalPrice: product.price * quantity,
            });
            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"server error"})
    }
})

// update product quantity in the cart for a guest or logged in user
router.put("/",async(req,res)=>{
    const {productId,quantity,size,color,guestId,userId}=req.body;
    try {
        let cart=await getCart(userId,guestId);
        if(!cart) return res.status(404).json({message:"Cart not found"});

        const productIndex=cart.products.findIndex(
            (p)=>p.productId.toString()===productId && p.size===size && p.color===color
        );

        if(productIndex>-1){
            if(quantity>0){
                cart.products[productIndex].quantity=quantity; //ye update karne ke kaam aata hai agar increase karna ho to +1 updation agar - to -1 updation
            } 
            else{
                cart.products.splice(productIndex,1);   //---ye tab usi time chlega jab product ji quantity 1 se 0 ho jayegi or us produt ko htane ke liye hum splice ka use karte h---//
            }
            cart.totalPrice=cart.products.reduce(
            (acc, item)=>acc+item.price * item.quantity,0
        );
        await cart.save();
        return res.status(200).json(cart);
        }
        else{
            return res.status(404).json({message:"product not found"});
        }
    } catch (error) {
        res.status(500).send("server error");
    }
})

// remove a product from cart

router.delete("/",async(req,res)=>{
     const {productId,quantity,size,color,guestId,userId}=req.body;
     try {
        const cart=await getCart(userId,guestId);
     if(!cart){
        return res.status(400).json({message:"cart not found"});
     }
    const productIndex=cart.products.findIndex(
            (p)=>p.productId.toString()===productId && p.size===size && p.color===color
        );

     if(productIndex>-1){
        cart.products.splice(productIndex,1);

        cart.totalPrice=cart.products.reduce((acc,item)=>acc+item.price* item.quantity,0);
        await cart.save();
        return res.status(200).json(cart);
     }
     else{
        return res.status(404).json({message:"Product not found in cart"});
     }
     } catch (error) {
        console.error(error);
        return res.status(500).json({message:"server error"});
     }
})

//get logged-in user's or guest user's cart
router.get("/", async(req,res)=>{
    const {userId,guestId}=req.query;

    try {
        const cart=await getCart(userId,guestId);
        if(cart){
            res.json(cart);
        }
        else{
            res.status(404).json({message:"cart not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({message:"server error"});
    }
})

//merge guest cart into user cart on login
router.post("/merge",protect,async (req,res)=>{
    const {guestId}=req.body;

    try {
        //find thr guest card and user cart
        const guestCart=await Cart.findOne({guestId});
        const userCart=await Cart.findOne({user: req.user._id});

        if(guestCart){
            if(guestCart.products.length===0){
                return res.status(400).json({message:"Guest cart is empty"});
            }
            if(userCart)
                {
                //merge guest cart into user cart
                guestCart.products.forEach((guestItem)=>{
                    const productIndex=userCart.products.findIndex(
                        (item)=>
                            item.productId.toString()===guestItem.productId.toString() &&
                        item.size===guestItem.size && 
                        item.color === guestItem.color
                    );
                    if(productIndex>-1){
                       //If the items exists in the user cart,update the quality
                       userCart.products[productIndex].quantity+=guestItem.quantity;
                    } else{
                        //Otherwise,add the guest the item to the cart
                        userCart.products.push(guestItem);
                    }
                });
                userCart.totalPrice=userCart.products.reduce((acc,item)=>acc + item.price * item.quantity);
                await userCart.save();

                //Remove the guest cart after merging
                
                try {
                    await Cart.findOneAndDelete({guestId});
                } catch (error) {
                    console.error("Error deleting guest cart",error);
                }
                res.status(200).json(userCart);
            }
            else{
                //If the user has no existing cart,assign the guest cart to the user
                guestCart.user=req.user._id;
                guestCart.guestId=undefined;

                await guestCart.save();

                res.status(200).json(guestCart);
            }
        }
        else{
            if(userCart){
                // Guest cart has already been merged, return user cart
                return res.status(200).json(userCart);
            }
            res.status(404).json({message:"guest cart not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"server error"});
    }
})



module.exports= router;