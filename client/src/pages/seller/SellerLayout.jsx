import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { NavLink,Link, Outlet } from "react-router-dom";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const {  axios, navigate } = useAppContext();

  const sidebarLinks = [
    { name: "AddProduct", path: "/seller", icon: assets.add_icon },
    { name: "ProductList", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Order", path: "/seller/order", icon: assets.order_icon },
  ];

  const logout = async () => {
    try{

      const {data} = await axios.get('/api/seller/logout');
      if(data.success){
        toast.success(data.message);
        navigate('/');
      }else{
        toast.error(data.message);
      }
    }catch(error){
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <Link to="/" >
          <img
            className="h-9"
            src={assets.logo}
            alt="logo"
          />
      </Link>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button onClick={logout} className="border cursor-pointer rounded-full text-sm px-4 py-1">Logout</button>
        </div>
      </div>

      <div className="flex">
      <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col">
        {sidebarLinks.map((item, index) => (
          <NavLink to={item.path} key={item.name} end={item.path === "/seller"}
            className={({isActive})=>`flex items-center py-3 px-4 gap-3 
                            ${
                              isActive ? 
                                 "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                                : "hover:bg-gray-100/90 border-white "
                            }`}
          >
          <img src={item.icon} className="w-7 h-7" alt=""/>
            <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>
        ))}
      </div>
      <Outlet />
      </div>
      
    </>
  );
};
export default SellerLayout;
