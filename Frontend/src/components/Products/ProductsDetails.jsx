import React, { useEffect, useState } from 'react'
import {toast} from "sonner"
import ProductGrid from './ProductGrid';


const selectProducts={
  name:"Stylish Jacket",
  price:120,
  originalPrice:150,
  description:"This is a stylish Jacket perfect for any occasion",
  brand:"FashionBrand",
  material:"Leather",
  sizes:["S","M","L","XL"],
  colors:["Red","Black"],
  images:[
    {
      url:"https://picsum.photos/500/500?random=1",
      altText:"Stylish Jacket 1",
    },
    {
      url:"https://picsum.photos/500/500?random=2",
      altText:"Stylish Jacket 2",
    }
  ],
};

const ProductsDetails = () => {
  const [mainImage,setMainImage]=useState(null);
  const [selectedSize,setSelectedSize]=useState("");
  const [selectedColor,setSelectedColor]=useState("");
  const [quantity,setQuantity]=useState(1);
  const [isButtonDisabled,setIsButtonDisabled]=useState(false);

  useEffect(()=>{    //humne yha useEffect isliye use kiya hai kyuki first time jab ui pe kuch render ksrna hoga kyuki {mainImge} jo hai vo empty hai to uski jagah hum first render pe ek image show karte hai
    if(selectProducts?.images?.length>0){
      setMainImage(selectProducts.images[0].url);
    }
  },[selectProducts]);



  const handleQualityChange=(action)=>{
    if(action==="plus") setQuantity((prev)=>prev+1);
    if(action==="minus" && quantity>1) setQuantity((prev)=>prev-1);
  }


  const handleAddToCart=()=>{
    if(!selectedSize || !selectedColor){
      toast.error("please select a size and color before adding to cart.",{
        duration:1000,
      });
      return;
    }
    setIsButtonDisabled(true);

    setTimeout(()=>{
      toast.success("Product added to cart!",{
        duration:1000,
      });
      setIsButtonDisabled(false);
    },500);
  }

  const similarProducts=[
    {
      _id:1,
      name:"Product 1",
      price:100,
      images:[{url: "https://picsum.photos/500/500?random=2"}],
    },
     {
      _id:3,
      name:"Product 2",
      price:100,
      images:[{url: "https://picsum.photos/500/500?random=3"}],
    },
     {
      _id:5,
      name:"Product 3",
      price:100,
      images:[{url: "https://picsum.photos/500/500?random=5"}],
    },
     {
      _id:7,
      name:"Product 4",
      price:100,
      images:[{url: "https://picsum.photos/500/500?random=7"}],
    },
  ]

  return (
    <div className='p-6'>
      <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
        <div className='flex flex-col md:flex-row'>
          {/* Left thumbnails */}
          <div className='hidden md:flex flex-col space-y-4 mr-6'>
              {selectProducts.images.map((image,index)=>(
                <img 
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`} 
                
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black" :"border-gray-300"}`}
                onClick={()=>setMainImage(image.url)}
                />
              ))}
          </div>
          {/* Main Image  */}
          <div className='md:w-1/2'>
          <div className='mb-4'>
            <img src={mainImage} alt="Main Product" className='w-full h-auto object-cover rounded-lg' />
          </div>
          </div>
          <div className='flex overscroll-x-scroll space-x-4 mb-4 md:hidden'>
             {selectProducts.images.map((image,index)=>(
                <img 
                key={index} 
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`} 
                 className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black" :"border-gray-300"}`}
                 onClick={()=>setMainImage(image.url)}/>
              ))}
          </div>

          {/* Right side */}
          <div className='md:w-1/2 md:ml-10'>
          <h1 className='text-2xl md:text-3xl font-semibold mb-2'>
            {selectProducts.name}
          </h1>
          <p className='text-lg text-gray-600 mb-1 line-through'>
            {selectProducts.originalPrice && `${selectProducts.originalPrice}`}
          </p>
          <p className='text-xl text-gray-500 mb-2'>
            ${selectProducts.price}
          </p>
          <p className='text-gray-600 mb-4'>{selectProducts.description}</p>

          <div className='mb-4'>
            <p className='text-gray-700 '> color:</p>
            <div className='flex gap-2 mt-2'>
              {selectProducts.colors.map((color)=>(
                <button key={color}
                onClick={()=>setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border ${selectedColor===color ? "border-4 border-black" :"border-gray-300"}`}
                style={{backgroundColor:color.toLocaleLowerCase(),
                  filter:"brightness(0.5)",
                }}
                ></button>
              ))}
            </div>
          </div>
          <div className='mb-4'>
            <p className='text-gray-700'>Size:</p>
            <div className='flex gap-2 mt-2'>
              {selectProducts.sizes.map((size)=>(
                <button key={size}
                onClick={()=>setSelectedSize(size)}
                 className={`px-4 py-2 rounded border ${selectedSize===size ? "bg-black text-white" : ""}`}>
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className='mb-6'>
            <p className='text-gray-700'>Quantity:</p>
            <div className='flex items-center space-x-4 mt-2'>
              <button onClick={()=>handleQualityChange("minus")} className='px-2 py-1 bg-gray-200 rounded text-lg'>
                -
              </button>
              <span className='text-lg'>{quantity}</span>
              <button onClick={()=>handleQualityChange("plus")} className='px-2 py-1 bg-gray-200 rounded text-lg'>
                +
              </button>
            </div>
          </div>
          <button onClick={handleAddToCart} disabled={isButtonDisabled} className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${isButtonDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-900"}`}>
           {isButtonDisabled ? "Adding..." : "Add To CART"}
          </button>

          <div className='mt-10 text-gray-700'>
            <h3 className='text-xl font-bold mb-4'>Characterstics:</h3>
            <table className='w-full text-left text-sm text-gray-600'>
              <tbody>
                <tr>
                  <td className='py-1'>Brand</td>
                  <td className='py-1'>{selectProducts.brand}</td>
                </tr>
                <tr>
                  <td className='py-1'>Material</td>
                  <td className='py-1'>{selectProducts.material}</td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
        </div>

        <div className='mt-20'>
          <h2 className='text-2xl text-center font-medium mb-4'>You May Also Like</h2>
          <ProductGrid products={similarProducts}/>
        </div>
      </div>
      
    </div>
  )
}

export default ProductsDetails
