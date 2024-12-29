import './App.css'
import {RouterProvider ,createBrowserRouter } from 'react-router-dom'
import Home from './components/Home/Home'
import Logout from './components/Authentication/Logout/Logout'
import Products from './components/Products/Products'
import Carts from './components/carts/Carts'
import WishList from './components/wishList/WishList'
import Login from './components/Authentication/Login/Login'
import Register from './components/Authentication/Register/Register'
import Brands from './components/brands/Brands'
import Layout from './components/Layout/Layout'
import CounterContextProvider from '../context/CounterContext'
import UserContextProvider from '../context/userContext'
import ProtectedRouting from './components/protectedRouting/protectedRouting'
import Categories from './components/Categories/Categories'
import ProductDetails from './components/ProductDetails/ProductDetails'
import CartContextProvider from '../context/CartContext'
import { Toaster } from 'react-hot-toast';
import CheckOut from './components/CheckOut/CheckOut'
import ForgetPassword from './components/Authentication/ForgetPassword/ForgetPassword'
import NotFound from './components/NotFound/NotFound'

export default function App() {
  let router=createBrowserRouter([
    {path:'',element:<Layout/>,children:[
      {index: true,element:<ProtectedRouting><Home/></ProtectedRouting>},
      {path:'wishList',element:<ProtectedRouting><WishList/></ProtectedRouting>},
      {path:'products',element:<ProtectedRouting><Products/></ProtectedRouting>},
      {path:'productDetails/:id',element:<ProtectedRouting><ProductDetails/></ProtectedRouting>},
      {path:'Carts',element:<ProtectedRouting><Carts/></ProtectedRouting>},
      {path:'checkout',element:<ProtectedRouting><CheckOut/></ProtectedRouting>},
      {path:'brands',element:<ProtectedRouting><Brands/></ProtectedRouting>},
      {path:'categories',element:<ProtectedRouting><Categories/></ProtectedRouting>},
      {path:'logout',element:<Logout/>},
      {path:'login',element:<Login/>},
      {path:'forgetpassword',element:<ForgetPassword/>},
      {path:'register',element:<Register/>},
      {path:'*',element:<NotFound/>}
  ]}
  ])
  return (
    <>
    
    <CartContextProvider>
    <UserContextProvider>
    <CounterContextProvider>
        <RouterProvider router={router}></RouterProvider>
        <Toaster/>
      </CounterContextProvider>
    </UserContextProvider>
    </CartContextProvider>
    
    </>
  )
}