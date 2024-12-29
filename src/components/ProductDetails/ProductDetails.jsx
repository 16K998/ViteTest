import axios from "axios"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Slider from "react-slick";
export default function ProductDetails() {
  var settings = {
    dots: true ,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  
  let {id}=useParams()
  console.log(id);
  const [productInfo,setProductInfo]=useState([])
  function getProductInfo(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then(({data})=>{
      console.log(data.data);
      setProductInfo(data.data)
    })
    .catch(({error})=>{
      console.log(error);
      
    })
  }
  useEffect(()=>{
    getProductInfo(id)
  },[])
  return (
    <div className="row items-center">
      <div className="w-1/4">
        <Slider {...settings}>
          {productInfo?.images?.map((src)=> <><img src={src} alt="" /></>)}
        </Slider>
      </div>
      <div className="w-3/4 text-start">
      <h1>{productInfo.title}</h1>
      <h2>{productInfo.description}</h2>
      <div className="rate flex justify-between my-10">
        <span>{productInfo.price}EGP</span>
        <span><i className="text-yellow-500 fa fa-star"></i>{productInfo.ratingsAverage}</span>
      </div>
      <div className="flex justify-between">
      <button className="bg-green-600 text-white w-5/6 hover:bg-green-800"><i className="fa-solid fa-plus text-white"></i>Add</button>
      <i className="fa-solid fa-heart text-gray-600 text-3xl"></i>
      </div>
      </div>
    </div>
  )}
