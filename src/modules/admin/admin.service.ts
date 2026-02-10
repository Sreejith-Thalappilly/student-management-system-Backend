import Admin from "../../models/admin.model";
import Student from "../../models/student.model";
import Task from "../task/task.model";
import { hashPassword, comparePassword } from "../../utils/password.util";
import { generateToken } from "../../utils/token.util";

export const adminLogin = async (email: string, password: string) => {
  const admin = await Admin.findOne({ email });
  if (!admin) throw new Error("Invalid credentials");

  const isMatch = await comparePassword(password, admin.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return generateToken({ id: admin.id, role: "admin" });
};

export const createStudent = async (data: any) => {
  data.password = await hashPassword(data.password);
  return Student.create(data);
};

export const assignTask = async (data: any) => {
  return Task.create(data);
};
