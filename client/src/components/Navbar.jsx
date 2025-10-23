import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const { user, setUser, navigate } = useAppContext();
  const Logout = () => {
    setUser(null);
    setOpen(false);
    navigate("/");
  }
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
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>

        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            3
          </button>
        </div>
{!user ?
          (<button className="cursor-pointer px-8 py-2 bg-primary hover:bg-secondary transition text-white rounded-full">
            Login
          </button>)
        :
        (
          <div className="flex items-center gap-2">
            <img src={assets.profile_icon} alt="avatar" className="w-10 h-10 rounded-full" />
            <ul className="flex flex-col gap-2" onClick={() => setOpen(false)}>
              <li className="text-sm font-medium">
                {user.name}
              </li>
              <li className="text-sm text-gray-500">
                {user.email}
              </li>
            </ul>
            <button className="cursor-pointer px-8 py-2 bg-primary hover:bg-secondary transition text-white rounded-full" onClick={Logout}>
              Logout
            </button>
          </div>
        )
        }
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <img src={assets.menu_icon} alt="menu" className="w-6 opacity-80" />
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
        <NavLink to="/products" onClick={() => setOpen(false)}>Products</NavLink>
        {user && <NavLink to="/my-orders" onClick={() => setOpen(false)}>My Orders</NavLink>}
        <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>

        {!user ?
          (<button className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-secondary transition text-white rounded-full text-sm" onClick={() => setOpen(false)}>
            Login
          </button>)
        :
          (<button className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-secondary transition text-white rounded-full text-sm" onClick={() => setOpen(false)}>
            Logout
          </button>)
        }
      </div>
    </nav>
  );
};

export default Navbar;
