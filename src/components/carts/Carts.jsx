import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../../context/CartContext"
import { Link } from "react-router-dom"


export default function Carts() {
  let {getCartInfo,deletSpecificItems,deletItems,updateCart,setCart,cart} = useContext(CartContext)
  let [cartItemInfo,setCartItemInfo]=useState(null)
async function getCartData(){
  let data=await getCartInfo()
  console.log(data);
  setCartItemInfo(data.data)
}

async function deletSpecificProduct(id){
  let data=await deletSpecificItems(id)
  console.log(data);
  setCart(data.data)
  setCartItemInfo(data.data)
}
async function deletCartItems(){
  let data=await deletItems()
  console.log(data);
  setCart(data.data)
  setCartItemInfo(data.data)
}
async function updateCartProduuct(productId,count){
  let data=await updateCart(productId,count)
  console.log(data);
  setCart(data.data)
  setCartItemInfo(data.data)
}
useEffect(()=>{
  getCartData()
},[])

  return (
    <>
<div className="bg-slate-50 p-5 my-10">
<div className="flex justify-between ">
  <div>
    <h2 className="text-4xl">Cart Shop</h2>
    <p className="text-xl font-semibold">Total Price:<span className="text-green-700">{cart?.data?.totalCartPrice}</span></p>
  </div>
  <div>
    <Link to={'/checkout'}><button  className="bg-blue-600 text-white hover:bg-blue-800">Check Out</button ></Link>
    <p className="text-xl font-semibold">total number of items:<span className="text-green-700">{cart?.numOfCartItems}</span></p>
  </div>
  
</div>

{cartItemInfo?.data?.products?.map((product)=><>
  <div className="lg:flex justify-between items-center border-b border-gray-300 my-3 py-2">
<div className="lg:flex">
  <img className="lg:w-40 w-11/12 mx-auto" src={product.product.imageCover} alt="" />
  <div className="text-start lg:flex flex-col justify-center px-7">
<h3 className="font-semibold text-xl">{product.product.title}</h3>
<p className="font-semibold py-2">{product.price} EGP</p>
<span onClick={()=>deletSpecificProduct(product.product.id)} className="text-red-600 cursor-pointer"> <i className="fa-solid fa-trash"></i> Remove</span>
</div>
</div>
<div className="text-end">
  <i onClick={()=>updateCartProduuct(product.product.id, product.count+1)} className="fa-solid fa-plus border border-lime-400 rounded p-2 text-xs cursor-pointer "></i>
<span className="px-2">{product.count}</span>
<i onClick={()=>updateCartProduuct(product.product.id, product.count-1)} className="fa-solid fa-minus border border-lime-400 rounded p-2 text-xs cursor-pointer"></i>
</div>
</div>
</>)}
<button onClick={()=>deletCartItems()} className=" border border-lime-400 text-xl">Clear You cart</button>
</div>

</>

  )}
