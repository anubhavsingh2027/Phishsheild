import express from 'express';
const userRouter=express.Router();


//internal cController
import {index,about,feedback, analyzeUrl} from '../controller/userController.js';

import {requireLogined,requireLogin} from '../controller/requiredController.js'

userRouter.get('/', requireLogin, index);
userRouter.get('/about',about);
userRouter.get('/feedback', feedback);
userRouter.post("/analyze-url", requireLogined, analyzeUrl);




export default userRouter;

