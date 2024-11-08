import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../configs";
import { Box, Grid, Paper, Typography, CircularProgress } from "@mui/material";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [restaurantCount, setRestaurantCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [orderStatusCounts, setOrderStatusCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Users
        const usersResponse = await AxiosInstance.get("/api/user/list"); // Adjust endpoint if needed
        setUserCount(usersResponse.data.length);
        setUsers(usersResponse.data.data)

        const customerCount = users.filter(
          (user) => user.role.name === "customer"
        ).length;
        const restaurantCount = users.filter(
          (user) => user.role.name === "restaurant"
        ).length;
        setCustomerCount(customerCount);
        setRestaurantCount(restaurantCount);

        const ordersResponse = await AxiosInstance.get("/api/orders/list"); // Adjust endpoint if needed
        const orders = ordersResponse.data.data;
        // Calculate metrics
        setOrderCount(orders.length);
        setTotalRevenue(
          orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)
        );
        // Count orders by status
        const statusCounts = {};
        orders.forEach((order) => {
          const statusName = order.status.name;
          statusCounts[statusName] = (statusCounts[statusName] || 0) + 1;
        });
        setOrderStatusCounts(statusCounts);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        {/* Total Users Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">{userCount}</Typography>
          </Paper>
        </Grid>

        {/* Customer Count Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Total Customers</Typography>
            <Typography variant="h4">{customerCount}</Typography>
          </Paper>
        </Grid>

        {/* Restaurant Count Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Total Restaurants</Typography>
            <Typography variant="h4">{restaurantCount}</Typography>
          </Paper>
        </Grid>

        {/* Total Orders Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Total Orders</Typography>
            <Typography variant="h4">{orderCount}</Typography>
          </Paper>
        </Grid>

        {/* Total Revenue Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h4">${totalRevenue}</Typography>
          </Paper>
        </Grid>

        {/* Orders by Status Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Orders by Status</Typography>
            <Box>
              {Object.entries(orderStatusCounts).map(([status, count]) => (
                <Typography key={status} variant="body1">
                  {status}: {count}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
