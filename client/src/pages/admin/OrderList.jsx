import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../configs";
import "../../styles/OrderList.css"; 

export default function OrderList() {
  const [order, setOrder] = useState([]); // Ensure order starts as an empty array

  useEffect(() => {
    (async () => {
      try {
        const response = await AxiosInstance.get("/api/orders/list");
        setOrder(response.data.data); 
      } catch (error) {
        console.error("Error fetching orders:", error); 
      }
    })();
  }, []);

  return (
    <div className="order-list">
      <h1>Order List</h1>
      {order.map((order) => (
        <div key={order._id} className="order-item">
          <h2>Order ID: {order._id}</h2>

          <div className="order-status">
            <p>Status: {order.status.name}</p>
          </div>

          <div className="customer-info">
            <h3>Customer Info</h3>
            <p>Name: {order.customer.name}</p>
            <p>Email: {order.customer.email}</p>
            <p>Phone: {order.customer.phone}</p>
          </div>

          <div className="address-info">
            <h3>Delivery Address</h3>
            <p>
              {order.address.detail}, {order.address.ward_id.name},{" "}
              {order.address.district_id.name}, {order.address.city_id.name}
            </p>
          </div>

          <div className="order-items">
            <h3>Items Ordered</h3>
            {order.dishes.map((dish, index) => (
              <div key={index} className="dish-item">
                <img src={dish.dish_id.image} alt={dish.dish_id.name} />
                <div>
                  <h4>{dish.dish_id.name}</h4>
                  <p>{dish.dish_id.description}</p>
                  <p>Quantity: {dish.quantity}</p>
                  <p>Price: ${dish.dish_id.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-total">
            <h3>Total: ${order.total.toFixed(2)}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
