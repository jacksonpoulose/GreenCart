import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";
import axios from "axios";
import { set } from "mongoose";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;


export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);

  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);

  //fetch seller status
  const fetchSeller = async ()=>{
    try{
      const {data} = await axios.get('/api/seller/is-auth');
      if(data.success){
        setIsSeller(true);
    }else{
      setIsSeller(false);
    }
  }catch(error){
    console.log(error);
    setIsSeller(false);
  }
  }
  //fetch products from backend
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  //add to cart function
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Item added to cart");
  };

  //Update cart item quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart updated");
  };

  //Fetch products from cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    setCartItems(cartData);
    toast.success("Item removed from cart");
  };

// get cart item count

const getCartCount = ()=>{
  let count = 0;
  for(const key in cartItems){
    count += cartItems[key];
  }
  return count;
}

const getCartAmount = ()=>{
  let totalAmount = 0;
  for (const itemId in cartItems){
    const product = products.find((item)=> item._id === itemId);
    if (product){
      totalAmount += cartItems[itemId] * product.offerPrice;
    }
  }
  return totalAmount;
}

  useEffect(() => {
    fetchSeller();
    fetchProducts();
  }, []);

  const value = {
    user,
    setUser,
    isSeller,
    setIsSeller,
    navigate,
    products,
    setProducts,
    showUserLogin,
    setShowUserLogin,
    currency,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    updateCartItem,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
    axios


  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
