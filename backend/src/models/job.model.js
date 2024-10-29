import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Enter Job Title"],
    },
    description: {
      type: String,
      required: [true, "Please Enter Job Description"],
    },
    requirements: [
      {
        type: String,
      },
    ],
    experienceLevel: {
      type: Number,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    locations: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    positions: {
      type: Number,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
