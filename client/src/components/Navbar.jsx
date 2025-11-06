import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const { user, setUser,  setShowUserLogin, navigate, setSearchQuery, searchQuery, getCartCount } = useAppContext();
  const Logout = async () => {
    setUser(null);
    setOpen(false);
    navigate("/");
  }

  useEffect(() => {
    if(searchQuery.length > 0){
      navigate(`/products?search=${searchQuery}`);
    }
  }, [searchQuery]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img src={assets.logo} alt="logo" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/contact">Contact</NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input onChange={(e)=>setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>

        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
           {getCartCount()}
          </button>
        </div>
{!user ?
          (<button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-secondary transition text-white rounded-full">
            Login
          </button>)
        :
        (
          <div className="relative group">
            <img src={assets.profile_icon} alt="avatar" className="w-10 h-10 rounded-full" />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40" onClick={() => setOpen(false)}>
              <li className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer" onClick={() => navigate("/my-orders")}>
                MyOrders
              </li>
              <li className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer" onClick={Logout}>
                Logout
              </li>
            </ul>
         </div>
        )
        }
      </div>
<div className="flex items-center gap-6 sm:hidden">
  <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
           {getCartCount()}
          </button>
        </div>
         <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden">
        <img src={assets.menu_icon} alt="menu" className="w-6 opacity-80" />
      </button>
</div>
     

      {/* Mobile Menu */}
      {open && (
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start z-40 gap-2 px-5 text-sm md:hidden`}
      >
        <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
        <NavLink to="/products" onClick={() => setOpen(false)}>Products</NavLink>
        {user && <NavLink to="/my-orders" onClick={() => setOpen(false)}>My Orders</NavLink>}
        <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>

        {!user ?
          (<button onClick={()=>{setOpen(false);setShowUserLogin(true)}} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-secondary transition text-white rounded-full text-sm">
            Login
          </button>)
        :
          (<button className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-secondary transition text-white rounded-full text-sm" onClick={ Logout }>
            Logout
          </button>)
        }
      </div>
      )}
    </nav>
  );
};

export default Navbar;
