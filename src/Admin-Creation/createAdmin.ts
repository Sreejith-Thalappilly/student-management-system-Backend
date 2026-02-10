//Run this script once to create an admin user with email: - npx ts-node src/Admin-Creation/createAdmin.ts


import mongoose from "mongoose";
import Admin from "../models/admin.model";
import { hashPassword } from "../utils/password.util";

(async () => {
  await mongoose.connect("mongodb://localhost:27017/student_management");

  const password = await hashPassword("Admin@123");

  await Admin.create({
    email: "admin@gmail.com",
    password,
  });

  console.log("✅ Admin created successfully");
  process.exit(0);
})();
