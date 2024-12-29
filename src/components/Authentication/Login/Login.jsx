import { useFormik} from 'Formik'
import axios from 'axios';
import * as Yup from 'yup'
import {Link, useNavigate} from 'react-router-dom'
import { useContext, useState } from 'react';
import { userContext } from '../../../../context/userContext';
export default function Register() {
  let {setUserLogin}=useContext(userContext)
  let Navigate=useNavigate()
  const [apiError,setApiError]=useState('')
  const [loading, setLoading]=useState(false)
  let validationSchema=Yup.object().shape({
    email: Yup.string().email('E-mail invalid').required('E-mail is required'),
    password: Yup.string().matches(/^[A-Z][a-z]{4,10}$/,'Pass is invaild')
  })
  function handelRegister(values){
    setLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
    .then((apiResp) => {
      localStorage.setItem('userToken',apiResp.data.token)
      setUserLogin(apiResp.data.token)
        Navigate('/')
        setLoading(false)
    })
    .catch((apiResp) => {
      setApiError(apiResp.response.data.message);
      console.log(apiResp.response.data.message);
      setLoading(false)
    });

  }
  let formik=useFormik({
    initialValues:{
      email:'',
      password:''
    },
    onSubmit: handelRegister, 
    validationSchema

  })
  return (
<>
<h2 className='text-start mt-10 mb-5 text-4xl'>Login</h2>
<form className=" mx-auto text-end" onSubmit={formik.handleSubmit}>
{apiError?<div className="p-4 mb-4 text-center text-3xl text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium text-center">{apiError} , Plaese Login</span>
</div>: null}
  <div className="mb-5 text-start">
    <label htmlFor="floating_email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" name="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id="floating_email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
    {formik.touched.email && formik.errors.email && (
    <div className="text-red-500 text-sm">{formik.errors.email}</div>)}
  </div>
  <div className="mb-5 text-start">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" id="floating_password" name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
    {formik.touched.password && formik.errors.password && (
    <div className="text-red-500 text-sm">{formik.errors.password}</div>)}
  </div>  
  <div className='text-start flex justify-between'>
    <Link to={'/forgetPassword'} className=' text-black text-2xl hover:text-green-700'><span>Forget Password ?</span></Link>
    <button type="submit" className="text-gray-500 bg-white font-medium rounded-lg text-lg  text-center border-gray-400"  disabled={!formik.isValid || !formik.dirty} style={{
            cursor: formik.isValid && formik.dirty ? 'pointer' : ''}}>
              {loading? <i className='fas fa-spinner fa-spin'></i>:'Login now'}
              </button>
  </div>
</form>

</>
  )}

