import React from 'react'
import heroImg from "../../assets/rabbit-hero.webp"
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
    <div className="relative">
    <img src={heroImg} alt="eShop" className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover'/>
        <div className='absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center'>  
            {/* inset-element ke andar ya bahar position set karta hai — yaani top, right, bottom, left se distance. */}
            <div className='text-center text-white p-6'>
                <h1 className='text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4'>Vacation <br/> Ready</h1>
                <p className='text-sm tracking-tighter md:text-lg mb-6'>
                    Explore our vacation-ready outfits with fast worldwide shipping
                </p>
                <Link to="#" className="bg-white text-gray-950 px-6 py-2 rounded-sm text-lg">
                Shop Now
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Hero
