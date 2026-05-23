import { Router } from "express";

import authMiddleware from '../middleware/auth.js';

import homeController from "../controller/homeController.js";
import registerController from "../controller/RegisterController.js"
import loginController from "../controller/LoginController.js"
import SendMensageController from "../controller/SendMensageController.js";


const router = Router();

//Home routes
router.get('/', homeController.index);
router.post('/', homeController.store)
router.delete('/:id', homeController.delete);

//Regiser Routes
router.post('/user/register', registerController.store);

//Login Routes
router.post('/user/login', loginController.store);

//Send mensages Routes
router.post('/send-mensage/:id', SendMensageController.store)




export default router;