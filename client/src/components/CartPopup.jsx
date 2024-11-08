import React, { useRef, useEffect } from "react";
import { useCart } from "../contexts/cart.context";
import { Link } from "react-router-dom";
import { paths } from "../utils/magic";

const CartPopup = ({ onClose }) => {
  const popupRef = useRef(null);
  const { cart = [], updateCart } = useCart();

  useEffect(() => {
    const handleMouseEnter = () => {
      if (popupRef.current) {
        popupRef.current.style.display = "block";
      }
    };

    const handleMouseLeave = () => {
      onClose();
    };

    if (popupRef.current) {
      popupRef.current.addEventListener("mouseenter", handleMouseEnter);
      popupRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (popupRef.current) {
        popupRef.current.removeEventListener("mouseenter", handleMouseEnter);
        popupRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [onClose]);

  const handleRemoveItem = (itemToRemove) => {
    const updatedCart = cart.filter(
      (item) => item.dish_id._id !== itemToRemove.dish_id._id
    );
    updateCart(updatedCart);
  };

  const handleQuantityChange = (item, delta) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem.dish_id._id === item.dish_id._id
        ? { ...cartItem, quantity: Math.max(1, cartItem.quantity + delta) }
        : cartItem
    );
    updateCart(updatedCart);
  };

  const totalAmount = cart
    .reduce((total, item) => total + item.dish_id.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div
      ref={popupRef}
      className="absolute right-0 w-80 bg-white shadow-lg rounded-lg p-4 z-50 border"
    >
      <h2 className="text-lg font-bold mb-2">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <img
                src={item.dish_id.image}
                alt={item.dish_id.name}
                className="w-16 h-16 rounded-md mr-2"
              />
              <div className="flex-grow">
                <h3 className="font-semibold">{item.dish_id.name}</h3>
                <p>${item.dish_id.price} each</p>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(item, -1)}
                    className="px-2 py-1 bg-gray-200 rounded-full text-gray-700"
                  >
                    -
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item, 1)}
                    className="px-2 py-1 bg-gray-200 rounded-full text-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleRemoveItem(item)}
                className="text-red-500 ml-2"
              >
                X
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center">
            <div className="font-bold">Total: ${totalAmount}</div>
            <Link
              to={paths.customer.url + "/" + paths.customerCreateOrder.url}
              className="rounded-md border bg-primary flex items-center py-1 px-2 text-white"
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPopup;
