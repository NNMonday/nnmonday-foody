import React, { useCallback, useEffect, useState } from "react";
import { useCart } from "../../contexts/cart.context";
import { AxiosInstance } from "../../configs";
import { toastError, toastSuccess } from "../../utils/toastify";
import { useNavigate } from "react-router-dom";
import { paths } from "../../utils/magic";

const CreateOrder = () => {
  const [loading, setLoading] = useState(false);
  const { cart, updateCart } = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    if (cart.length === 0) {
      toastError("Your cart is empty");
      navigate("/menu");
      return;
    }
  }, [navigate]);

  const [restaurant, setRestaurant] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await AxiosInstance.get(
          "/api/restaurants/" + cart[0]?.dish_id.restaurant_id
        );

        setRestaurant(res.data.data);
      } catch (error) {}
    })();
  }, []);

  const [customerAddresses, setCustomerAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const res = await AxiosInstance.get("/api/addresses/user");
        setCustomerAddresses(res.data.data);
        setSelectedAddress(res.data.data[0]);
      } catch (error) {}
    })();
  }, []);

  const [note, setNote] = useState("");

  const handleSubmitOrder = useCallback(async () => {
    const orderData = {
      restaurant_id: restaurant?._id,
      dishes: cart.map((item) => ({
        dish_id: item.dish_id._id,
        quantity: item.quantity,
      })),
      address: {
        detail: selectedAddress.detail,
        ward_id: selectedAddress.ward_id._id,
        district_id: selectedAddress.district_id._id,
        city_id: selectedAddress.city_id._id,
      },
    };

    try {
      setLoading(true);
      const response = await AxiosInstance.post("/api/orders", orderData);

      toastSuccess(response.data.message);
      updateCart([]);
      navigate(paths.menu.url);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [cart, restaurant, selectedAddress, updateCart, navigate, note]);

  return (
    <div className="flex justify-center">
      <div className="create-order mt-16 w-1/2 border-2 rounded-md p-10">
        <h2 className="text-lg font-bold mb-4">
          Order from {restaurant?.user_id.name}
        </h2>

        <div className="address-section mb-4">
          <h3 className="font-semibold">Delivery Address</h3>
          <select
            className="border-2 rounded-md p-2 w-full"
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.target.value)}
          >
            {customerAddresses.map((address, index) => (
              <option key={index} value={address}>
                {address.detail}, {address.ward_id.name},
                {address.district_id.name}, {address.city_id.name}
              </option>
            ))}
          </select>
        </div>

        <div className="cart-summary mb-4">
          <h3 className="font-semibold">Order Summary</h3>
          {cart.map((item, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              <span>{item.dish_id.name}</span>
              <span>
                {item.quantity} x ${item.dish_id.price}
              </span>
            </div>
          ))}
          <div className="font-bold mt-4">
            Total: $
            {cart
              .reduce(
                (total, item) => total + item.dish_id.price * item.quantity,
                0
              )
              .toFixed(2)}
          </div>
        </div>

        <div>
          <label htmlFor="note">Note</label>
          <textarea
            id="note"
            className="border-2 rounded-md p-2 w-full"
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmitOrder}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Loading..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
