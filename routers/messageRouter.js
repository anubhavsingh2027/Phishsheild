import express from 'express';
const messageRouter=express.Router();
import {sendOtp,feedbackEmail} from '../controller/messageController.js';
messageRouter.post("/send-otp",sendOtp);
messageRouter.post('/api/contact',feedbackEmail);

export default messageRouter;
