import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'
import { useContext } from 'react'
import { counterContext } from '../../../context/CounterContext'
import { userContext } from '../../../context/userContext'
import { CartContext } from '../../../context/CartContext'
import { useState } from 'react'

export default function Navbar() {
  let { userLogin, setUserLogin } = useContext(userContext)
  let { cart } = useContext(CartContext)
  let navigate = useNavigate()
  const [isNavOpen, setIsNavOpen] = useState(false)

  function logOut() {
    localStorage.removeItem('userToken')
    setUserLogin(null)
    navigate('/Login')
  }

  let { counter } = useContext(counterContext)
  console.log(counter)

  function toggleNavbar() {
    setIsNavOpen(!isNavOpen)
  }

  return (
    <>
      <nav className="bg-gray-50 p-2 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
          <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="Logo" />
          </a>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <ul className="flex flex-col my-3 lg:flex-row">
              {userLogin == null ? (
                <>
                  <li className="mx-3">
                    <NavLink to={'login'}>Login</NavLink>
                  </li>
                  <li className="mx-3">
                    <NavLink to={'register'}>Register</NavLink>
                  </li>
                </>
              ) : (
                <li className="mx-3 cursor-pointer text-red-600">
                  <NavLink
                    to={'carts'}
                    type="button"
                    className="relative inline-flex items-center p-3 mx-5 text-sm font-medium text-center text-white rounded-lg focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <i className="fa-solid fa-cart-shopping text-2xl text-gray-700"></i>
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-md font-bold text-white bg-green-600 border-2 border-white rounded-lg -top-2 -end-2 dark:border-gray-900">
                      {cart?.numOfCartItems}
                    </div>
                  </NavLink>
                  <span onClick={logOut}>Logout</span>
                </li>
              )}
            </ul>

          
            <button
              onClick={toggleNavbar}
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 mt-4 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isNavOpen ? 'true' : 'false'} 
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>

          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isNavOpen ? 'block' : 'hidden'}`}
            id="navbar-sticky"
          >
            <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {userLogin !== null ? (
                <>
                  <li className="mx-3 my-1">
                    <NavLink to={''}>Home</NavLink>
                  </li>
                  <li className="lg:mx-3 my-1">
                    <NavLink to={'carts'}>Carts</NavLink>
                  </li>
                  <li className="lg:mx-3 my-1">
                    <NavLink to={'wishlist'}>Wish list</NavLink>
                  </li>
                  <li className="lg:mx-3 my-1">
                    <NavLink to={'products'}>Products</NavLink>
                  </li>
                  <li className="lg:mx-3 my-1">
                    <NavLink to={'Categories'}>Categories</NavLink>
                  </li>
                  <li className="lg:mx-3 my-1">
                    <NavLink to={'Brands'}>Brands</NavLink>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
