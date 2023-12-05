import express from "express"
import * as userCtrl from "../controllers/usercontroller.js"

const router = express.Router();
router.post("/insumos/register", userCtrl.registerUser );
router.post("/insumos/login", userCtrl.loginUser );
router.post("/insumos/email", userCtrl.sendEmail );
export {router};