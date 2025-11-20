import express from 'express';
import { authUser } from '../middlewares/AuthUser.js';
import { addAddress, getAddresses } from '../controllers/addressController.js';

const addressRouter = express.Router();

addressRouter.post('/add', authUser, addAddress);
addressRouter.get('/get/:userId', authUser, getAddresses);


export default addressRouter;