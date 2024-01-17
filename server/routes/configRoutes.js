const indexR = require("./index");
const usersR = require("./users");
const moviesR = require("./movies");


exports.routesInit = (app) => {
    app.use("/", indexR);
    app.use("/users", usersR);
    app.use("/movies", moviesR);
}