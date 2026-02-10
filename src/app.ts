import express from "express";
import adminRoutes from "./modules/admin/admin.routes";
import studentRoutes from "./modules/student/student.routes";

const app = express();

app.use(express.json());

app.get("/health", (_, res) => res.json({ status: "OK" }));

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/student", studentRoutes);

export default app;
