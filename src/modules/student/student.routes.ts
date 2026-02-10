import { Router } from "express";
import * as controller from "./student.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorizeStudent } from "../../middlewares/role.middleware";

const router = Router();

/**
 * @swagger
 * /api/v1/student/login:
 *   post:
 *     summary: Student login
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: student@test.com
 *               password:
 *                 type: string
 *                 example: Student@123
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", controller.login);

/**
 * @swagger
 * /api/v1/student/tasks:
 *   get:
 *     summary: Get tasks assigned to logged-in student
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get("/tasks", authenticate, authorizeStudent, controller.tasks);

/**
 * @swagger
 * /api/v1/student/tasks/{taskId}:
 *   patch:
 *     summary: Mark task as completed
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task marked as completed
 */
router.patch(
  "/tasks/:taskId",
  authenticate,
  authorizeStudent,
  controller.completeTask
);

export default router;
