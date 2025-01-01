/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext=createContext()
export default function CartContextProvider(props){
    let [cart , setCart]=useState(null)
    let headers={
        token:localStorage.getItem('userToken')
    }
    function addToCart(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
        {productId:productId},
        {headers:headers}
    ).then((response)=>response)
    .catch((error)=>error)
    }
    
    function getCartInfo(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers
        }).then((response)=>response)
        .catch((error)=>error)
    }
    function deletSpecificItems(proId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${proId}`,{
            headers
        }).then((response)=>response)
        .catch((error)=>error)
    }
    function deletItems(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers
        }).then((response)=>response)
        .catch((error)=>error)
    }
    function updateCart(proId,count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${proId}`,{
            count
        },{
            headers
        }).then((response)=>response)
        .catch((error)=>error)
    }
    async function getCart(){
        let response=await getCartInfo()
        console.log(response);
        setCart(response.data);
    } 
    function checkOut(cartId,url,formValues){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{
            shippingAddress:formValues 
        },{
            headers
        }).then((response)=>response)
        .catch((error)=>error)
    }
    function addToList(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        {productId:productId},
        {headers:headers}
    ).then((response)=>response)
    .catch((error)=>error)
    }
    function getListInfo(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            headers
        }).then((response)=>response)
        .catch((error)=>error)
    }
    function removeFromList(proID){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${proID}`,{
            headers
        }).then((response)=>response)
        .catch((error)=>error)
    }
    useEffect(()=>{
        getCart()
    },[])
return<>
<CartContext.Provider value={{addToList,getListInfo,removeFromList,addToCart,getCartInfo,deletSpecificItems,deletItems,updateCart,cart,setCart,checkOut}}>
{props.children}
</CartContext.Provider>
</>
}