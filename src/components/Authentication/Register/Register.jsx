import { useFormik} from 'Formik'
import axios from 'axios';
import * as Yup from 'yup'
import {useNavigate} from 'react-router-dom'
import { useContext, useState } from 'react';
import { userContext } from '../../../../context/userContext';
export default function Register() {
  let {setUserLogin}=useContext(userContext)
  let Navigate=useNavigate()
  const [apiError,setApiError]=useState('')
  const [loading, setLoading]=useState(false)
  let validationSchema=Yup.object().shape({
    name: Yup.string().min(3).max(10).required('Name is required'),
    email: Yup.string().email('E-mail invalid').required('E-mail is required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/,'Phone is invalid'),
    password: Yup.string().matches(/^[A-Z][a-z]{4,10}$/,'Pass is invaild'),
    rePassword: Yup.string().oneOf([Yup.ref('password')],'repass not match')
  })
  function handelLogin(values){
    setLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
    .then((apiRsp) => {
      
      localStorage.setItem('userToken',apiRsp.data.token)
      setUserLogin(apiRsp.data.token)
        Navigate('/Login')
        setLoading(false)
    })
    .catch((apiRsp) => {
      setApiError(apiRsp.response.data.message);
      console.log(apiRsp.response.data.message);
      setLoading(false)
    });

  }
  let formik=useFormik({
    initialValues:{
      name:'',
      email:'',
      phone:'',
      password:'',
      rePassword:''
    },
    onSubmit: handelLogin, 
    validationSchema

  })
  return (
<>
<h2 className='text-start mt-10 mb-5 text-4xl'>Register Now</h2>
<form className=" mx-auto text-end" onSubmit={formik.handleSubmit}>
{apiError?<div className="p-4 mb-4 text-center text-3xl text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium text-center">{apiError} , Plaese Login</span>
</div>: null}
  
  <div className="mb-5 text-start">
    <label htmlFor="floating_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
    <input type="text" name="name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} id="floating_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
    {formik.touched.name && formik.errors.name && (
    <div className="text-red-500 text-sm">{formik.errors.name}</div>)}
  </div>
  <div className="mb-5 text-start">
    <label htmlFor="floating_email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" name="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id="floating_email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
    {formik.touched.email && formik.errors.email && (
    <div className="text-red-500 text-sm">{formik.errors.email}</div>)}
  </div>
  <div className="mb-5 text-start">
    <label htmlFor="floating_phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone</label>
    <input type="phone" name="phone" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} id="floating_phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
    {formik.touched.phone && formik.errors.phone && (
    <div className="text-red-500 text-sm">{formik.errors.phone}</div>)}
  </div>
  <div className="mb-5 text-start">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" id="floating_password" name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
    {formik.touched.password && formik.errors.password && (
    <div className="text-red-500 text-sm">{formik.errors.password}</div>)}
  </div>
  <div className="mb-5 text-start">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> RePassword</label>
    <input type="password" id="floating_rePassword" name='rePassword' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
    {formik.touched.rePassword && formik.errors.rePassword && (
    <div className="text-red-500 text-sm">{formik.errors.rePassword}</div>)}
  </div>
  <button type="submit" className="text-gray-500 bg-white font-medium rounded-lg text-lg w-full sm:w-auto px-10 py-3 text-center border-gray-400"  disabled={!formik.isValid || !formik.dirty} style={{
            cursor: formik.isValid && formik.dirty ? 'pointer' : ''}}>

              {loading? <i className='fas fa-spinner fa-spin'></i>:'Submit'}
              
              </button>
</form>

</>
  )}
