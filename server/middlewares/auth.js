const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  const token = req.header("x-api-key");
  if (!token) {
    return res
      .status(401)
      .json({ err: "You need send token to this endpoint or url" });
  }
  try {
      //.env את הסטרינג הסודי יש להגדיר בקובץ 
    const decodeToken = jwt.verify(token, "mySecretWord");
    req.tokenData = decodeToken;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ err: "Token has expired." });
    }

    return res.status(401).json({ err: "Invalid token." });
  }
};
