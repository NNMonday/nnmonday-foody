import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../configs";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Typography, Chip } from "@mui/material";

export default function UserList() {
  const [users, setUser] = useState([]); // Ensure order starts as an empty array
  useEffect(() => {
    (async () => {
      try {
        const response = await AxiosInstance.get("/api/user/list");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    })();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <Avatar src={user.avatar} alt={user.name} />
              </TableCell>
              <TableCell>
                <Typography variant="body1">{user.name}</Typography>
              </TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <Chip
                  label={user.role?.name}
                  color={user.role?.name === "admin" ? "primary" : "default"}
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={user.status ? "Active" : "Inactive"}
                  color={user.status ? "success" : "default"}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
