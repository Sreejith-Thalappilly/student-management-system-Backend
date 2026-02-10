import { Request, Response } from "express";
import * as adminService from "./admin.service";

export const login = async (req: Request, res: Response) => {
  try {
    const token = await adminService.adminLogin(
      req.body.email,
      req.body.password
    );
    res.json({ token });
  } catch (e: any) {
    res.status(401).json({ message: e.message });
  }
};

export const addStudent = async (req: Request, res: Response) => {
  const student = await adminService.createStudent(req.body);
  res.status(201).json(student);
};

export const addTask = async (req: Request, res: Response) => {
  const task = await adminService.assignTask(req.body);
  res.status(201).json(task);
};

export const getAdmins = async (_req: Request, res: Response) => {
  const admins = await adminService.listAdmins();
  res.json(admins);
};

export const getStudents = async (_req: Request, res: Response) => {
  const students = await adminService.listStudents();
  res.json(students);
};

export const getTasks = async (_req: Request, res: Response) => {
  const tasks = await adminService.listTasks();
  res.json(tasks);
};
