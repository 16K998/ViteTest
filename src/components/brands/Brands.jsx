import axios from "axios"
import { useEffect, useState } from "react";

export default function Brands() {
  const [brand,setBrand]=useState([])
  function getAllProduct() {
  axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  .then(({data})=>{
    console.log(data.data);
    setBrand(data.data)
    
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
    <div className="row mt-24">
      {brand.map((product)=> <>
      <div key={product.id} className="lg:w-1/4 w-full p-4">
      <div className="product border-gray-400 border">
        <img className="w-full" src={product.image} alt="" />
      </div>
      </div>
    </>
    )}
    </div>
    </>
  )
}
