import { Router } from "express";
import * as controller from "./admin.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorizeAdmin } from "../../middlewares/role.middleware";

const router = Router();

router.post("/login", controller.login);

router.post("/students", authenticate, authorizeAdmin, controller.addStudent);
router.post("/tasks", authenticate, authorizeAdmin, controller.addTask);

export default router;
