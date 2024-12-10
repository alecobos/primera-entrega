import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { passportCall } from "../passport/passportCall.js";
import { roleAuth } from "../middlewares/roleAuth.js";


const router = Router();

// router.get("/sessions/current", [passportCall('current'), roleAuth('user')], userController.privateData);
router.get("/sessions/current", [passportCall('current'), roleAuth(['user', 'admin'])], userController.privateData);

router.get("/sessions/current-admin", [passportCall('current'), roleAuth('admin')], userController.privateData);




export default router;