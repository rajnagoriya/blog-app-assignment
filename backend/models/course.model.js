// models/Course.js
import mongoose from "mongoose";
const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  fullDetail: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Course = mongoose.model('Course', CourseSchema);
//  Blog = mongoose.model("Blog", blogSchema);