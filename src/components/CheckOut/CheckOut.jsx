import { useFormik} from 'Formik'

import { useContext} from 'react';
import { CartContext } from '../../../context/CartContext';
export default function CheckOut() {
  
  let {checkOut}=useContext(CartContext)
  async function handelcheckOut(cartId,url){
    let {data}=await checkOut(cartId,url,formik.values)
    console.log(data.session.url);
    if(data.status == 'success'){
      window.location.href = data.session.url
    }
  }

  let formik=useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:''

    },
    onSubmit:()=> handelcheckOut("6770fd293f3d5ec390424ba3",'http://localhost:3000'), 

  })
  return (
<>
<form className=" mx-auto text-end" onSubmit={formik.handleSubmit}>

  <div className="mb-5 text-start">
    <label htmlFor="floating_details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details</label>
    <input type="text" name="details" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} id="floating_details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
  </div>
  <div className="mb-5 text-start">
    <label htmlFor="floating_phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
    <input type="tel" name="phone" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} id="floating_phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
  </div>
  <div className="mb-5 text-start">
    <label htmlFor="floating_city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
    <input type="text" name="city" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} id="floating_city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
  </div>

  <button type="submit" 
  className="text-gray-500 bg-white font-medium rounded-lg text-lg w-full sm:w-auto px-10 py-3 text-center border-gray-400">Pay Now</button>
</form>

</>
  )}

