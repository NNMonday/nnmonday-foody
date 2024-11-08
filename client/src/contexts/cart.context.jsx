import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AxiosInstance } from "../configs";
import { toastError, toastSuccess } from "../utils/toastify";
import { useAuth } from "./auth.context";

const CartContext = createContext();
export const useCart = () => {
  return useContext(CartContext);
};
export default function CartProvider({ children }) {
  const { currentUser } = useAuth();
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
      const updatedCart = newCart.map((i) => ({
        dish_id: i.dish_id,
        quantity: i.quantity,
      }));

      const res = await AxiosInstance.post("/api/customers/cart", {
        newCart: updatedCart,
      });

      newCart.length !== 0 && toastSuccess("Cart updated successfully");
      setCart(res.data.data);
    } catch (error) {
      toastError(error.response.data.message);
    }
  }, []);

  useEffect(() => {
    if (currentUser?.role.name === "customer") {
      getCart();
    }
  }, [getCart, currentUser]);

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
