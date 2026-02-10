import { Router } from "express";
import * as controller from "./student.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorizeStudent } from "../../middlewares/role.middleware";

const router = Router();

router.post("/login", controller.login);
router.get("/tasks", authenticate, authorizeStudent, controller.tasks);
router.patch(
  "/tasks/:taskId",
  authenticate,
  authorizeStudent,
  controller.completeTask
);

export default router;
