import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "overdue"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
