import express from "express";
import adminRoutes from "./modules/admin/admin.routes";
import studentRoutes from "./modules/student/student.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(express.json());

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/student", studentRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
