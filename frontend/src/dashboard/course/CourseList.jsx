import React from 'react';

const CourseList = ({ courses, onDelete, onEdit }) => {
  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <div key={course._id} className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">{course.title}</h3>
          <p className="text-gray-600">Original Price: ${course.originalPrice}</p>
          <p className="text-gray-600">Discount Price: ${course.discountPrice}</p>
          <p className="text-gray-600">Instructor: {course.instructor}</p>
          <p className="text-gray-700 mt-2">{course.shortDescription}</p>
          <p className="text-gray-600 mt-2">{course.fullDetail}</p>
          
          <div className="mt-4">
            <button
              onClick={() => onEdit(course)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(course._id)}
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
