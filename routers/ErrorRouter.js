import express from 'express';
const ErrorRouter=express.Router();
import {Errorpage404,Errorpage500} from '../controller/errorController.js'
// ===== 404 handler =====
ErrorRouter.get('/',Errorpage404);
ErrorRouter.get('/',Errorpage500);

export default ErrorRouter;
