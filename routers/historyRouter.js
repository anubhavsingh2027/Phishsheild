import express from 'express';
const historyRouter=express.Router();

//local module
import {requireLogin} from '../controller/requiredController.js'
import {history} from '../controller/historyController.js';


historyRouter.get('/history', requireLogin, history);

export default historyRouter;