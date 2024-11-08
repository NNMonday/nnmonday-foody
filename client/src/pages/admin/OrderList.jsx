import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../configs";

export default function OrderList() {
  const [order, setOrder] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await AxiosInstance.get("/api/orders/list");
        console.log("Order list:", response.data.data);
        setOrder(response.data.data);
        setFilteredOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    })();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [search, statusFilter, order]);

  const handleFilter = () => {
    const filtered = order.filter((o) => {
      const matchesSearch =
        o.customer.name.toLowerCase().includes(search.toLowerCase()) ||
        o._id.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter
        ? o.status.name === statusFilter
        : true;
      return matchesSearch && matchesStatus;
    });
    setFilteredOrders(filtered);
  };

  return (
    <div className="order-list p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Order List
      </h1>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Order ID or Customer Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded shadow-sm w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded shadow-sm w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Delivering">Delivering</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="order-item bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-2">
              Order ID: {order._id}
            </h2>

            <div className="order-status mb-4">
              <p className="text-gray-600">
                Status:{" "}
                <span className="font-semibold">{order.status.name}</span>
              </p>
            </div>

            <div className="customer-info mb-4">
              <h3 className="text-lg font-semibold">Customer Info</h3>
              <p className="text-gray-600">Name: {order.customer.name}</p>
              <p className="text-gray-600">Email: {order.customer.email}</p>
              <p className="text-gray-600">Phone: {order.customer.phone}</p>
            </div>

            <div className="address-info mb-4">
              <h3 className="text-lg font-semibold">Delivery Address</h3>
              <p className="text-gray-600">
                {order.address.detail}, {order.address.ward_id?.name},{" "}
                {order.address.district_id?.name}, {order.address.city_id?.name}
              </p>
            </div>

            <div className="order-items mb-4">
              <h3 className="text-lg font-semibold">Items Ordered</h3>
              {order.dishes.map((dish, index) => (
                <div
                  key={index}
                  className="dish-item flex items-center gap-4 mb-2"
                >
                  <img
                    src={dish.dish_id.image}
                    alt={dish.dish_id.name}
                    className="w-16 h-16 rounded"
                  />
                  <div>
                    <h4 className="font-semibold">{dish.dish_id.name}</h4>
                    <p className="text-gray-500 text-sm">
                      {dish.dish_id.description}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Quantity: {dish.quantity}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Price: ${dish.dish_id.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-total">
              <h3 className="text-lg font-semibold">
                Total:{" "}
                <span className="text-blue-500">${order.total.toFixed(2)}</span>
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
