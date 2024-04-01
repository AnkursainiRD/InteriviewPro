import express from 'express'
import { auth, employee, manager } from '../middleware/authMiddleware.js';
import { addTask, login, managerLogin, managerSingUp, rateTheSheet, signUp, submitTimeSheet } from '../controllers/userController.js';
const router=express.Router()

router.post("/signUp",signUp)
router.post("/managerSignUp",managerSingUp)
router.post("/login",login)
router.post("/managerLogin",managerLogin)

router.post("/addTask",auth,employee,addTask)
router.get("/rateTheSheet",auth,manager,rateTheSheet)
router.post("/submitTimeSheet",auth,employee,submitTimeSheet)

export default router;