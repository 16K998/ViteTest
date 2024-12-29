import RecentProduct from "../RecentProduct/RecentProduct";
import CategorieSlider from "../CategorieSlider/CategorieSlider";
import MainSlider from "../mainSlider/mainSlider";

export default function Home() {
   return (
     <>
     <div className="mt-7" >
    <MainSlider/>
     <CategorieSlider/>
      <RecentProduct/>
      </div>
     </>
   )}
