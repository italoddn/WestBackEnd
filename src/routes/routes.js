import { Router } from "express";

import authMiddleware from '../middleware/auth.js';

import homeController from "../controller/HomeController.js";
import registerController from "../controller/RegisterController.js"
import loginController from "../controller/LoginController.js"
import SendMensageController from "../controller/SendMensageController.js";
import HistoryController from '../controller/HistoryController.js';


const router = Router();

//Home routes
router.get('/', authMiddleware, homeController.index);
router.post('/', authMiddleware, homeController.store)
router.delete('/:id', authMiddleware, homeController.delete);

//Regiser Routes
router.post('/user/register', authMiddleware, registerController.store);

//Login Routes
router.post('/user/login', loginController.store);

//Send mensages Routes
router.post('/send-mensage/:id', authMiddleware, SendMensageController.store)

//Historico routes
router.get('/history', authMiddleware, HistoryController.index);
router.post('/history', authMiddleware, HistoryController.store);




export default router;