const express = require("express");
const path = require("path");
const http = require("http");

const { routesInit } = require("./routes/configRoutes");
require("./db/mongoConnect");

const cookieParser = require("cookie-parser");

const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));
routesInit(app);

const server = http.createServer(app);
const port = process.env.PORT || 3001;
server.listen(port);
