import { useFormik} from 'Formik'

export default function ForgetPassword() {
    let formik=useFormik({
        initialValues:{
          email:'',
        },
      })
  return (
    <>
     <div className="text-xl text-start">
     <h2>please enter your verification code</h2>
     <div className="mb-5 text-start">
    <label htmlFor="floating_email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
    <input type="email" name="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id="floating_email" className="bg-gray-50 border py-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Email' required />
    {formik.touched.email && formik.errors.email && (
    <div className="text-red-500 text-sm">{formik.errors.email}</div>)}
  </div>
  <button className='rounded text-green-700 border-green-700'>Verify</button>
     </div>
    </>
  )
}
