import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AxiosInstance } from "../configs";
import { toastSuccess } from "../utils/toastify";

const CartContext = createContext();
export const useCart = () => {
  return useContext(CartContext);
};
export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCart = useCallback(async () => {
    try {
      setLoading(true);
      const res = await AxiosInstance.get("/api/customers/cart");
      setCart(res.data.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCart = useCallback(async (newCart) => {
    try {
      const res = await AxiosInstance.post("/api/customers/cart", {
        newCart,
      });
      console.log(res.data);

      toastSuccess(res.data.message);
      setCart(res.data.data);
    } catch (error) {}
  }, []);

  useEffect(() => {
    getCart();
  }, [getCart]);

  const value = {
    cart,
    setCart,
    getCart,
    updateCart,
  };
  return (
    <CartContext.Provider value={value}>
      {!loading && children}
    </CartContext.Provider>
  );
}
