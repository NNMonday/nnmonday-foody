import React, { useRef, useEffect } from "react";
import { useCart } from "../contexts/cart.context";

const CartPopup = ({ onClose }) => {
  const popupRef = useRef(null);
  const { cart, updateCart } = useCart();

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
                <p>
                  {item.quantity} x ${item.dish_id.price}
                </p>
              </div>
              <button
                onClick={() => handleRemoveItem(item)}
                className="text-red-500 ml-2"
              >
                X
              </button>
            </div>
          ))}
          <div className="font-bold mt-4">Total: ${totalAmount}</div>
        </>
      )}
    </div>
  );
};

export default CartPopup;