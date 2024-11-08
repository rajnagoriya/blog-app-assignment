import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';


function Courses() {
  const { setSelecteCourseByUser } = useAuth();
  const [courses, setCourses] = useState([]);
  
  const fetchCourses = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/course/allCourses`,
        { withCredentials: true }
      );
      
      setCourses(data.data);
    } catch (error) {
      toast.error("something went wrong please check ")
    }
  }, [setCourses]);
  
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);


  return (<>
    { courses.length === 0 ? (
      <div className="bg-gray-100 min-h-screen py-12 px-6">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-12">
       No Available Courses
      </h1>
      </div>
    ):
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-12">
        Available Courses
      </h1>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map(course => (
          <div key={course._id} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-4">{course.shortDescription}</p>
            <div className="text-xl mb-4">
              <span className="line-through text-gray-500 mr-2">₹{course.originalPrice}</span>
              <span className="text-green-500 font-bold">₹{course.discountPrice}</span>
            </div>
            <Link to={`/courses-detail/${course._id}`} onClick={()=>setSelecteCourseByUser(course)}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out">
              Details
            </button>
            </Link>
          </div>
        ))}
      </div>
    </div>

      }
      </>
  );
}

export default Courses;
