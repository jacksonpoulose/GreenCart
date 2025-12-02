import express from 'express';
import { authUser } from '../middlewares/AuthUser.js';
import { placeOrderCOD, getAllOrders, getUserOrders } from '../controllers/orderController.js';
import { authSeller } from '../middlewares/AuthSeller.js';
import { placeOrderStripe } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.get("/user", authUser, getUserOrders);
orderRouter.get("/seller", authSeller, getAllOrders);



export default orderRouter;