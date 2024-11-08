const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const httpErrors = require("http-errors");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const corsConfig = require("./configs/cors.config");
const db = require("./configs/mongoDB.config");
const {
  AuthRouter,
  RoleRouter,
  CategoryDishRouter,
  RestaurantRouter,
  DishRouter,
  CustomerRouter,
  OrderRouter,
  AddressRouter,
  FileRouter,
} = require("./routers");

const app = express();
app.use(cors(corsConfig));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => {
  res.send("NNMonday Foody");
});

app.use("/api/files", FileRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/roles", RoleRouter);
app.use("/api/category-dishes", CategoryDishRouter);
app.use("/api/restaurants", RestaurantRouter);
app.use("/api/dishes", DishRouter);
app.use("/api/customers", CustomerRouter);
app.use("/api/orders", OrderRouter);
app.use("/api/addresses", AddressRouter);

app.use(async (req, res, next) => {
  next(httpErrors.NotFound());
});

app.use(async (error, req, res, next) => {
  res.status(error.status || 500);
  if (error.name === "TokenExpiredError") {
    return res.send({
      status: 401,
      message: "Token expired",
    });
  }
  return res.send({
    status: error.status || 500,
    message: error.message || "Unknown errors",
  });
});

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

db.connectDB();
