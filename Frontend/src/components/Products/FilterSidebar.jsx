import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const FilterSidebar = () => {
  const [searchParams,setSearchParams]=useSearchParams();
  const navigate=useNavigate();
  const [filters,setFilters]=useState({
    category:"",
    gender:"",
    color:"",
    size:[],
    material:[],
    brand:[],
    minPrice:0,
    maxPrice:100,
  });
  const [priceRange,setPriceRange]=useState([0,100]);
  const categories=["Top Wear", "Bottom Wear"];
  const colors=[
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy",
  ];

  const sizes=["XS","S","M","L","XL","XXL"];
  const materials=[
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];

  const brands=[
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Fashionista",
    "ChicStyle",
  ];
  const genders= ["Men","Women"];

  useEffect(()=>{
    const params=Object.fromEntries([...searchParams]);
    // Object.fromEntries() array ko object mein convert karta hai — lekin sirf un arrays ko jo key-value pairs (2-element sub-arrays) ka format rakhte hain

    setFilters({
      category:params.category || "",
      gender:params.gender || "",
      color:params.color || "",
      size:params.size ? params.size.split(",") : [],
      material:params.material ? params.material.split(",") : [],
      brand:params.brand ? params.brand.split(",") : [],
      minPrice:params.minPrice || 0,
      maxPrice:params.maxPrice || 100,
    });
    setPriceRange([0,params.maxPrice || 100]);
  },[searchParams]);

  const handleFilterChange=(e)=>{
    const {name,value,checked,type}=e.target;
    // console.log({name,value,checked,type})
    let newFilters={...filters};

    if(type==="checkbox"){
      if(checked){
        newFilters[name]=[...(newFilters[name] || []),value];
      }else{
        newFilters[name]=newFilters[name].filter((item)=>item !== value);
      }
    }else{
      newFilters[name]=value;
    }
    setFilters(newFilters);
    updateURLParams(newFilters);
  }


  const updateURLParams=(newFilters)=>{
    const params=new URLSearchParams();
    Object.keys(newFilters).forEach((key)=>{
      if(Array.isArray(newFilters[key]) && newFilters[key].length>0){
        params.append(key,newFilters[key].join(","));
      } else if(newFilters[key]){
        params.append(key,newFilters[key]);
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`);
  }

  const handlePriceChange=(e)=>{
    const newPrice=e.target.value;
    setPriceRange([0,newPrice])
    const newFilters={...filters,minPrice:0,maxPrice:newPrice};
    setFilters(filters);
    updateURLParams(newFilters);
  }
  return (
    <div className='p-4'>
      <h3 className='text-xl font-medium text-gray-800 mb-4 '>Filter</h3>

      {/* category filter */}
      <div className='mb-6'>
        <label className='block text-gray-600 font-medium mb-2 '>Category</label>
        {
          categories.map((category)=>(
            <div key={category} className='flex items-center mb-1'>
              <input type="radio"
                     name="category"
                     value={category}
                     onChange={handleFilterChange}
                     checked={filters.category===category}
                     className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'/>
                     <span className='text-gray-700'>{category}</span>
            </div>
          ))}
      </div>
      {/* Genders filter */}
      <div className='mb-6'>
        <label className='block text-gray-600 font-medium mb-2 '>Gender</label>
        {
          genders.map((gender)=>(
            <div key={gender} className='flex items-center mb-1'>
              <input type="radio"
                     name="gender"
                     value={gender}
                     onChange={handleFilterChange}
                      checked={filters.gender===gender}
                     className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'/>
                     <span className='text-gray-700'>{gender}</span>
            </div>
          ))}
      </div>

      {/* color filter */}
      <div className='mb-6'>
        <label className='block text-gray-600 font-medium mb-2'>Color</label>
        <div className='flex flex-wrap gap-2'>
         { colors.map((color)=>(
            <button  key={color}
            name="color"
            value={color}
            onClick={handleFilterChange}
            className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer  transition hover:scale-105
         ${filters.color===color ? "ring-2 ring-blue-500": ""}`}
            style={{backgroundColor:color.toLocaleLowerCase()}}
            >

            </button>
          ))}
        </div>
      </div>

      {/* size filter  */}
      <div className='mb-6'>
        <label className='block text-gray-600 font-medium mb-2'>Size</label>
        {sizes.map((size)=>(
          <div key={size} className='flex items-center mb-1'>
            <input type="checkbox"
            name="size"
            value={size}
            onChange={handleFilterChange}
            checked={filters.size.includes(size)}
            className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'/>
            <span className='text-gray-700'>{size}</span>
          </div>
        ))}
      </div>
      
       {/* material filter  */}
      <div className='mb-6'>
        <label className='block text-gray-600 font-medium mb-2'>Material</label>
        {materials.map((material)=>(
          <div key={material} className='flex items-center mb-1'>
            <input type="checkbox"
            name="material"
            value={material}
            onChange={handleFilterChange}
            checked={filters.material.includes(material)}
            className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'/>
            <span className='text-gray-700'>{material}</span>
          </div>
        ))}
      </div>

       {/* brands filter  */}
      <div className='mb-6'>
        <label className='block text-gray-600 font-medium mb-2'>Brands</label>
        {brands.map((brand)=>(
          <div key={brand} className='flex items-center mb-1'>
            <input type="checkbox"
            name="brand"
             value={brand }
             onChange={handleFilterChange}
             checked={filters.brand.includes(brand)}
            className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'/>
            <span className='text-gray-700'>{brand}</span>
          </div>
        ))}
      </div>

      {/* Price range Filter */}

      <div className='mb-8'>
        <label className='block text-gray-600 font-medium mb-2'>
          Price Range
        </label>
        <input type="range"
         name="priceRange"
         min={0}
         max={100}
         value={priceRange[1]}
         onChange={handlePriceChange}
         className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer' />
        <div className='flex justify-between text-gray-600 mt-2'>
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  )
}

export default FilterSidebar















// const handleFilterChange = (e) => {
// 🔹 handleFilterChange → function ka naam hai, jo input (radio/checkbox) ke change hone par chalega.

// 🔹 e → event object hota hai jo browser deta hai jab user kisi input pe click/change karta hai.

// js
// Copy code
// const { name, value, checked, type } = e.target;
// 🧠 e.target → jis input element pe user ne click ya change kiya, uska reference.

// Property	Meaning
// name	HTML input ka name attribute (e.g., "size", "category")
// value	Us input ka value (e.g., "M" ya "Top Wear")
// checked	Agar input type checkbox/radio hai to yeh batata hai wo selected hai ya nahi (true/false)
// type	Input ka type (e.g., "checkbox" ya "radio")

// js
// Copy code
// let newFilters = { ...filters };
// 📌 Tumne filters state ka ek copy banaya hai jiska naam hai newFilters.

// 🔹 Spread operator {...filters} ka matlab hai:
// Purani filters ki sari key-value pair newFilters me aa jaayegi.

// ❗Direct filters ko mutate nahi karna chahiye, isliye copy banate hain — React best practice.

// js
// Copy code
// if (type === "checkbox") {
// 🔍 Agar current input checkbox type ka hai, to yeh if chalega.
// Jaise ki "size", "brand", "material" waale filters.

// js
// Copy code
// if (checked) {
//   newFilters[name] = [...(newFilters[name] || []), value];
// }
// ✅ Jab checkbox check kiya gaya ho (✅):
// 🔹 newFilters[name]:

// name = "size" → newFilters["size"]

// Pehle se size me kuch hai to use lo, warna empty array lo || []

// 🔹 Spread operator se purani values copy ki, aur value (jaise "M") ko add kiya:

// js
// Copy code
// ["XS", "S"] + "M" → ["XS", "S", "M"]
// 🔹 Result: "M" checkbox checked hone pe add ho jaata hai.

// js
// Copy code
// else {
//   newFilters[name] = newFilters[name].filter((item) => item !== value);
// }
// ❌ Jab checkbox uncheck kiya gaya ho:
// Pehle ki list me se value ko remove kar diya.

// 🧠 Example:

// js
// Copy code
// ["M", "L"].filter(item => item !== "M") → ["L"]
// js
// Copy code
// } else {
//   newFilters[name] = value;
// }
// 🔁 Agar input checkbox nahi hai (yaani radio button, select, etc):
// Direct value assign kar dete hain.

// Example:
// name = "gender", value = "Men"
// → newFilters["gender"] = "Men"

// ✅ Useful for: "gender", "category" type ke inputs.

// js
// Copy code
// setFilters(newFilters);
// 📌 Yeh line tumhare updated newFilters ko React ke state me set kar deti hai.

// React fir se render karega, aur tumhara UI update ho jaayega.

// js
// Copy code
// console.log(newFilters);
// 🧪 Debugging ke liye — tum dekh sakte ho ki filter me kya kya values select ho chuki hain.

// 🔚 Final Summary — Pura Flow:
// User koi checkbox ya radio click karta hai → event trigger hota hai.

// Tum e.target se us input ka name, value, type, checked lete ho.

// Tum purani filters ka ek naya copy banaate ho (newFilters).

// Agar checkbox hai:

// Agar checked hai → value add karo

// Agar unchecked hai → value remove karo

// Agar radio/select hai → direct assign karo

// Fir updated filters ko state me daal do via setFilters()

// 🧠 Real Example:
// Agar tum "size" me "M" and "L" select karte ho, to:

// js
// Copy code
// newFilters = {
//   ...,
//   size: ["M", "L"]
// }
// Agar tum "gender" radio me "Men" select karte ho, to:

// js
// Copy code
// newFilters = {
//   ...,
//   gender: "Men"
// }


