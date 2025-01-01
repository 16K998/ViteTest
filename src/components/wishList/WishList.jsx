import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import toast from 'react-hot-toast';
export default function WishList() {
    let {getListInfo,addToCart,setCart,removeFromList} = useContext(CartContext)
    let [listData,setListData]=useState(null)
    async function getListData(){
      let data=await getListInfo()
      // localStorage.setItem('wishlist',JSON.stringify(data.data))
      setListData(data.data)
    }
    async function addProduct(proId) {
      console.log(proId);
      let data = await addToCart(proId);
        setCart(data.data);
        if (data.data.status === 'success') {
          toast.success('Successfully Added to Cart');
      } else {
        toast.error('Cannot add');
      }
    }
    // async function deletItem(id) {
    //   let data= await removeFromList(id);
    //   let old_data_wishlist = JSON.parse(localStorage.getItem('wishlist'));
    //   let item = await old_data_wishlist['data'].filter((dt,key)=> {dt.id == id ? old_data_wishlist['data'].splice(key, 1) : console.log('no thing')});
    //   localStorage.setItem('wishlist', JSON.stringify(old_data_wishlist));
    //   setListData(old_data_wishlist);
    // }
    async function deletItem(id) {
      await removeFromList(id);
      let wishlist_data = await getListInfo();
      setListData(wishlist_data.data);
    }
    useEffect(()=>{
      getListData()
    },[])
  return (
    <div className="bg-gray-100 p-5">
      {listData?.data?.map((pro)=><>
        <div className="lg:flex justify-between items-center border-b border-gray-300 my-3 py-2">
<div className="lg:flex">
  <img className="lg:w-40 w-11/12 mx-auto" src={pro.imageCover} alt="" />
  <div className="text-start lg:flex flex-col justify-center px-7">
<h3 className="font-semibold text-xl">{pro.title}</h3>
<p className="font-semibold py-2">{pro.price} EGP</p>
<span onClick={()=>deletItem(pro.id)} className="text-red-600 cursor-pointer"> <i className="fa-solid fa-trash"></i> Remove</span>
</div>
</div>
<button onClick={()=>addProduct(pro.id)} className="bg-gray-100 border border-lime-400">Add To Cart</button>
</div>
      </>)}
    </div>
  )
}
