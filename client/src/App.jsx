import React from "react";
import Navbar from "./components/Navbar";
import { Routes,Route } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {

  //const isSellerPath = useLocation().pathname.includes("seller")
  return (
    <div>
      <Navbar />
      <div className = "px-6 md:px-16 lg:px-24 xl:px-32 py-6 ">
        <Routes>
<Route path="/" element={<Home/>} /> 


        </Routes>
      </div>
    </div>
  );
};

export default App;
