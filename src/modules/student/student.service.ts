import Student from "../../models/student.model";
import Task from "../task/task.model";
import { comparePassword } from "../../utils/password.util";
import { generateToken } from "../../utils/token.util";

export const studentLogin = async (email: string, password: string) => {
  const student = await Student.findOne({ email });
  if (!student) throw new Error("Invalid credentials");

  const isMatch = await comparePassword(password, student.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return generateToken({ id: student.id, role: "student" });
};

export const getTasks = async (studentId: string) => {
  const tasks = await Task.find({ studentId });

  const now = new Date();
  tasks.forEach(async (task) => {
    if (task.status === "pending" && task.dueDate < now) {
      task.status = "overdue";
      await task.save();
    }
  });

  return tasks;
};

export const updateTaskStatus = async (taskId: string) => {
  return Task.findByIdAndUpdate(
    taskId,
    { status: "completed" },
    { new: true }
  );
};
