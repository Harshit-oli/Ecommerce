import React from 'react'
import { IoMdClose } from 'react-icons/io'
import CartContents from '../Cart/CartContents'
import { useNavigate } from 'react-router-dom'

const CardDrawer = ({drawerOpen,toggleCartDrawer}) => {
  const navigate=useNavigate();
  const handleCheckout=()=>{
    toggleCartDrawer()
    navigate("/checkout");
  }
  return (
    <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? "translate-x-0":"translate-x-full"}`}>
        <div className='flex justify-end p-4'>
            <button onClick={toggleCartDrawer}>
                <IoMdClose className='h-6 w-6 text-gray-600'/>
            </button>
        </div>

        {/* cart content with scrollable area */}

        <div className='flex-grow p-4 overflow-y-auto'>
          <h2 className='text-xl font-semibold mb-4'>Your Cart</h2>
          <CartContents/>
        </div>
        {/* checkout button fixed at the bottom */}
        <div className='p-4 bg-white sticky bottom-0'>
          <button onClick={handleCheckout} className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition'>
            Checkout
          </button>
          <p className='text-sm tracking-tighter text-gray-500 mt-2 text-center'>
            Shipping,taxes,and discount codes calculated at checkout.
          </p>
        </div>
    </div>
  )
}

export default CardDrawer


// Class	                                                       Purpose
// fixed top-0 right-0 	                       =      Sidebar ko screen ke top-right me fix karta hai
// w-3/4 sm:w-1/2 md:w-1/4	                   =      Responsive width: 75% on mobile, 50% on small screens, 25% on medium
// h-full 	                                   =      Full screen height
// bg-white shadow-lg	                         =      Background white + shadow
// transform transition-transform duration-300 =	    Smooth transform transition for animation
// translate-x-0                               =      Sidebar visible (comes into view)
// translate-x-full	                           =      Sidebar hidden (fully outside the screen on the right)
// flex flex-col 	                             =      Content in column layout
// z-50	                                       =      Puts sidebar on top of most elements (layer priority)

