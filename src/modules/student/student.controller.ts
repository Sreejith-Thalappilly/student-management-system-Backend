import { Request, Response } from "express";
import * as service from "./student.service";

export const login = async (req: Request, res: Response) => {
  try {
    const token = await service.studentLogin(
      req.body.email,
      req.body.password
    );
    res.json({ token });
  } catch (e: any) {
    res.status(401).json({ message: e.message });
  }
};

export const tasks = async (req: any, res: Response) => {
  const data = await service.getTasks(req.user.id);
  res.json(data);
};

export const completeTask = async (req: Request, res: Response) => {
  const taskId = Array.isArray(req.params.taskId) ? req.params.taskId[0] : req.params.taskId;
  const task = await service.updateTaskStatus(taskId);
  res.json(task);
};
