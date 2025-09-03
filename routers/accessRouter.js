import express from 'express';
const accessRouter=express.Router();

//local Module
import {getLogin, getregister,postRegister,postLogin, getlogout,signOut} from '../controller/accessController.js';


accessRouter.get('/login', getLogin);
accessRouter.get('/register', getregister);
accessRouter.post('/register',postRegister);
accessRouter.post('/login', postLogin);
accessRouter.get('/logout', getlogout);
accessRouter.get('/signout', signOut);


export default accessRouter;