import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
export default function CategorieSlider() {

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 6, 
    slidesToScroll: 1,
    speed: 500,
    responsive: [
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 6, 
        },
      },
      {
        breakpoint:768 , 
        settings: {
          slidesToShow: 2, 
        },
      },
    ],
  };
    const [categorieSlider,setCategorieSlider]=useState(null)
    function getProductInfo() {
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({data})=>{
        setCategorieSlider(data.data)
        console.log(data.data)
      })
      .catch(({error})=>{
        console.log(error);
        
      })
    }
    useEffect(()=>{
      getProductInfo()
    },[])
  return (
    <>
     <Slider className="py-7 mt-6  w-10/12 lg:w-full mx-auto" {...settings}>
      {categorieSlider?.map((product)=><>
      <img className="h-60 w-full" src={product?.image}></img>
      <h2>{product?.title}</h2>
      </>)}
    </Slider>
    </>
  )
}

