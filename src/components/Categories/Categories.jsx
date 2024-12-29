import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories,setCategories]=useState([])
  function getAllProduct() {
  axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  .then(({data})=>{
    console.log(data.data);
    setCategories(data.data)
    
  })
  .catch((error)=>{
    console.log(error);
    
  })
 }
 useEffect(()=>{
  getAllProduct()
 },[])
  return (
    <>
    <div className="row mt-20">
      {categories.map((product)=> <><div key={product.id} className="lg:w-3/12 w-11/12  border border-gray-300 rounded mx-auto lg:mx-0 my-4 hover:shadow-md hover:shadow-sky-300">
      <Link to={`ProductDetails/${product.id}`}>
      
      <div className="product">
        <img className="w-full lg:h-96" src={product.image} alt="" />
        <h2 className="text-blue-700 text-2xl p-7">{product.name}</h2>
      </div>
      
      </Link>
      </div>
    </>
    )}
    </div>
    </>
  )
}
