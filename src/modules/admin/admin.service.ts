import Admin from "../../models/admin.model";
import Student from "../../models/student.model";
import Task from "../task/task.model";
import { hashPassword, comparePassword } from "../../utils/password.util";
import { generateToken } from "../../utils/token.util";

export const adminLogin = async (email: string, password: string) => {
  const admin = await Admin.findOne({ email });
  if (!admin) {
    console.log("ADMIN NOT FOUND");
    throw new Error("Invalid credentials");
  }

  console.log("PLAIN PASSWORD FROM REQUEST:", password);
  console.log("HASHED PASSWORD FROM DB:", admin.password);

  const isMatch = await comparePassword(password, admin.password);
  console.log("PASSWORD MATCH RESULT:", isMatch);

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

export const listAdmins = async () => {
  return Admin.find().select("-password");
};

export const listStudents = async () => {
  return Student.find().select("-password");
};

export const listTasks = async () => {
  return Task.find()
  .populate("studentId", "name email department")
    .sort({ createdAt: -1 });
};

export const createAdmin = async (data: any) => {
  data.password = await hashPassword(data.password);
  return Admin.create(data);
};