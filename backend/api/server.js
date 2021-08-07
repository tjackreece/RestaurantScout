require("dotenv").config();
const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");

const restaurantRouter = require("./restaurants/restaurant-router");

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use("/api/v1/restaurants", restaurantRouter);

module.exports = server;
