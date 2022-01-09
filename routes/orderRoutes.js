const express = require("express");
const orderControllers = require("../controllers/orderControllers");

const router = express.Router();

router.get("/", orderControllers.getOrders);
router.get("/:id", orderControllers.getOrder);
router.post("/", orderControllers.createOrder);

module.exports = router;
