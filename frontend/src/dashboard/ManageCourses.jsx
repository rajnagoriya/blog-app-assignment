import React, { useState, useEffect, useCallback } from 'react';
import CourseForm from './course/CourseForm';
import CourseList from './course/CourseList';
import axios from 'axios';
import toast from 'react-hot-toast';

function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setIsSelectedCourse ] = useState(null);

const handleCreateOrUpdateCourse = async (courseData) => {
  try {
    if (selectedCourse) {
      // Update course
      try {
        const { data } = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/course/update/${selectedCourse._id}`,
          courseData,
          { withCredentials: true }
        );

        // Update the course in the state
        const updatedCourses = courses.map((course) =>
          course._id === selectedCourse._id ? data.data : course
        );
        setCourses(updatedCourses);

        toast.success("Course updated successfully!");
      } catch (error) {
        console.error('Error updating course:', error);
        toast.error("Failed to update course");
      }
    } else {
      // Create new course
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/course/create`,
          courseData,
          { withCredentials: true }
        );
        
        // Add the new course to the state
        setCourses([data.data, ...courses]);

        toast.success("Course created successfully!");
      } catch (error) {
        console.error('Error creating course:', error);
        toast.error("Failed to create course");
      }
    }
    setSelectedCourse(null); // Clear the form after creation or update
  } catch (error) {
    console.error('Error creating/updating course:', error);
  }
};



// create a delete course api call    
const handleDeleteCourse = async (id) => {
 // Create new course
 try {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/api/course/delete/${id}`,
    { withCredentials: true }
  );
  fetchCourses();
  toast.success("Course deleted successfully!");
} catch (error) {
  toast.error("Failed to delete course");
}
}

const handleEditCourse = (courseData) => {
  setIsSelectedCourse(courseData);
}

const fetchCourses = useCallback(async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/course/allCourses`,
      { withCredentials: true }
    );
    console.log("all blog"+JSON.stringify(data));
    setCourses(data.data);
  } catch (error) {
    console.error('Error fetching courses:', error);
  }
}, [setCourses]);

useEffect(() => {
  fetchCourses();
}, [fetchCourses]);


  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Course Management</h1>

      <div className="flex space-x-8">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">{selectedCourse ? 'Edit Course' : 'Create New Course'}</h2>
          <CourseForm course={selectedCourse} onSubmit={handleCreateOrUpdateCourse} />
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Courses List</h2>
          <CourseList
            courses={courses} // get the course from get all course and pass 
            onDelete={handleDeleteCourse}
            onEdit={handleEditCourse}
          />
        </div>
      </div>
    </div>
  );
}

export default ManageCourses;
