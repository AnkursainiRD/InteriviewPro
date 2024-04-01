import express from 'express'
import { auth, employee } from '../middleware/authMiddleware.js';
import { addTask, login, managerSingUp, signUp, submitTimeSheet } from '../controllers/userController.js';
const router=express.Router()

router.post("/signUp",signUp)
router.post("/managerSignUp",managerSingUp)
router.post("/login",login)

router.post("/addTask",auth,employee,addTask)
router.post("/submitTimeSheet",auth,employee,submitTimeSheet)

export default router;