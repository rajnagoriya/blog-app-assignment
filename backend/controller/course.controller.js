import { Course } from "../models/course.model.js";



export const getAllCourses = async (req, res) => {
    try {
      const allCourses = await Course.find().sort({ createdAt: -1 });
      res.status(200).json({ 
        message: "All courses",
        data: allCourses
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

export const createCourse = async (req,res) => {
    try {
        const { title, originalPrice, discountPrice, shortDescription, instructor, fullDetail } = req.body;
        
        if(
            !title
            || !originalPrice
            || !discountPrice
            || !shortDescription 
            || !instructor
            || !fullDetail
        ){
                return res
                .status(400)
                .json({ message: "all fields are required fields" });
            }

        const newCourseData = {
          title,
          originalPrice,
          discountPrice,
          shortDescription,
          instructor,
          fullDetail,
        };
        const newCourse = await Course.create(newCourseData);
        const savedCourse = await newCourse.save();
        res.status(201).json({ 
            message: "course created successfully",
            data: savedCourse
        });
      } catch (error) {
        res.status(400).json({ error: "internal server error " });
      }
}

export const updateCourse =  async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(201).json({ 
        message: "course updated successfully",
        data: updatedCourse
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const deleteCourse = async (req, res) => {
      try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
          return res.status(404).json({ message: 'Course not found' });
        }
        res.json({ message: 'Course deleted successfully', data: deleteCourse });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }