import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <div className="relative pt-16 w-full">
      <img src={assets.main_banner_bg} alt="main banner" className="w-full hidden md:block" />
      <img src={assets.main_banner_bg_sm} alt="main banner" className="w-full block md:hidden" />
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center p-6 md:p-12 lg:p-16">
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105
        leading-tight lg:leading-15"
        >
          Freshness You can trust, Saving you will love
        </h1>

        <div className="mt-6 flex items-center font-medium gap-4">
          <Link
            to="/products"
            className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-secondary transition rounded text-white cursor-pointer"
          >
            ShopNow
            <img
              className="md:hidden transition group-focus:translate-x-1"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>

          <Link
            to="/products"
            className="group hidden md:flex items-center gap-2 px-7 md:px-9 py-3 hover:bg-secondary transition rounded cursor-pointer"
          >
            Explore Deals
            <img
              className=" transition group-hover:translate-x-1"
              src={assets.black_arrow_icon}
              alt="arrow"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
