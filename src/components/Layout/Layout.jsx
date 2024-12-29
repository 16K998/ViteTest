import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
  return (
    <>
    <Navbar/>
    <div className="container lg:p-20 text-center">
    <Outlet></Outlet>
    </div>
    </>
  )}
