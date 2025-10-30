import { createContext, useState, useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";


export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(true);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);

    const [cartItems, setCartItems] = useState([]);

    const fetchProducts = async () =>{
        setProducts(dummyProducts)
          }

    const addToCart = () => {
        let cartData= structuredClone(cartItems);
        if(cartData[itemId]){

        }
        }


useEffect(()=>{
    fetchProducts();
},[])

    const value = {
        user,
        setUser,
        isSeller,
        setIsSeller,    
        navigate,
        products,
        setProducts,
        
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}