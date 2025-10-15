import express from 'express';
const ErrorRouter = express.Router();
import { Errorpage404 } from '../controller/errorController.js';


ErrorRouter.get('*',Errorpage404 );

export default ErrorRouter;
