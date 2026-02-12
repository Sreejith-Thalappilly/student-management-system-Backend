import { Request, Response } from "express";
import * as adminService from "./admin.service";
import { hashPassword } from "../../utils/password.util";
import Admin from "../../models/admin.model";

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


export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create admin
    const admin = await Admin.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Admin created successfully",
      adminId: admin._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};