const expressjwt = require("express-jwt");

const authJwt = () => {
  return expressjwt({
    secret: process.env.ACCESS_TOKEN_SECRET,
    algorithms: ["HS256"],
  }).unless({
    path: [
      { url: /\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/categories(.*)/, methods: ["GET", "OPTIONS"] },

      "/user/login",
      "/user/register",
    ],
  });
};

module.exports = authJwt;
