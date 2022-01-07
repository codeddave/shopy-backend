const expressjwt = require("express-jwt");

const authJwt = () => {
  return expressjwt({
    secret: process.env.ACCESS_TOKEN_SECRET,
    algorithms: ["HS256"],
  }).unless({
    path: ["/user/login", "/user/register"],
  });
};

module.exports = authJwt;
