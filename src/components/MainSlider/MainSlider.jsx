import Music from "../../assets/images/Music.jpg"
import Bags from "../../assets/images/Bags.jpg"
import bag from "../../assets/images/bag.jpg"
import rang from "../../assets/images/rang.jpg"
import seat from "../../assets/images/seat.jpg"
import Slider from "react-slick";
export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
    
  };
  
  return (
    <>
    <div className="row flex justify-center">
      <div className="w-2/5">
      <Slider  {...settings}>
        <img className="w-full h-96" src={bag} alt="" />
        <img className="w-full h-96" src={rang} alt="" />
        <img className="w-full h-96" src={seat} alt="" />
    </Slider>
      </div>
      <div className="w-1/4">
      <img src={Music} alt="" />
      <img src={Bags} alt="" />
      </div>
    </div>
    </>
  )
}