import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';


const CourseDetails = () => {
  const {selecteCourseByUser,profile} = useAuth();
  if (!selecteCourseByUser) return <p>something went wrong !</p>;

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{selecteCourseByUser?.title}</h2>
      <p className="text-gray-600 mb-4">Instructor: {selecteCourseByUser?.instructor}</p>
      <p className="text-gray-600 mb-2">Original Price: ₹{selecteCourseByUser?.originalPrice}</p>
      <p className="text-gray-600 mb-2">Discount Price: ₹{selecteCourseByUser?.discountPrice}</p>
      <p className="text-gray-600 mb-4">{selecteCourseByUser?.shortDescription}</p>
      
     
      <div>
        <h3 className="text-xl font-semibold mb-2">Full Details:</h3>
        <p>{selecteCourseByUser?.fullDetail}</p>
      </div>
      <Link to={`/payment/${profile?._id}/${selecteCourseByUser?._id}`}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out">
              Enroll Now
            </button>
      </Link>
    </div>
  );
};

export default CourseDetails;
