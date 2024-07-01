import express from "express";
import { createOrder, getOrders, updateOrders, updateStatus, getAllOrders } from "../controllers/order.controllers.js";
import {verifyAdmin, verifyUser} from "../utils/verifyToken.js"

const router = express.Router();

router.post("/create",verifyUser, createOrder);

router.get("/orderhistory/:userId",verifyUser, getOrders);

router.put("/update_status/:orderId",verifyAdmin, updateStatus);

router.put("/update_order/:orderId",verifyUser, updateOrders);

router.get("/allOrders", verifyAdmin, getAllOrders)

export default router;
