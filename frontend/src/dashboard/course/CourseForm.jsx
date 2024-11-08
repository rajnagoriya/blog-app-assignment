import React, { useState, useEffect } from 'react';

const CourseForm = ({ course, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    originalPrice: '',
    discountPrice: '',
    shortDescription: '',
    instructor: '',
    fullDetail: '',
  });

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        originalPrice: course.originalPrice,
        discountPrice: course.discountPrice,
        shortDescription: course.shortDescription,
        instructor: course.instructor,
        fullDetail: course.fullDetail,
      });
    } else {
      // Reset form if no course is selected
      setFormData({
        title: '',
        originalPrice: '',
        discountPrice: '',
        shortDescription: '',
        instructor: '',
        fullDetail: '',
      });
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-lg font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-2 w-full p-3 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-lg font-medium">Original Price</label>
        <input
          type="number"
          name="originalPrice"
          value={formData.originalPrice}
          onChange={handleChange}
          required
          className="mt-2 w-full p-3 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-lg font-medium">Discount Price</label>
        <input
          type="number"
          name="discountPrice"
          value={formData.discountPrice}
          onChange={handleChange}
          required
          className="mt-2 w-full p-3 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-lg font-medium">Short Description</label>
        <textarea
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          required
          className="mt-2 w-full p-3 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-lg font-medium">Instructor</label>
        <input
          type="text"
          name="instructor"
          value={formData.instructor}
          onChange={handleChange}
          required
          className="mt-2 w-full p-3 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-lg font-medium">Full Detail</label>
        <textarea
          name="fullDetail"
          value={formData.fullDetail}
          onChange={handleChange}
          required
          className="mt-2 w-full p-3 border rounded-md"
        />
      </div>
      <button
        type="submit"
        className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg"
      >
        {course ? 'Update Course' : 'Create Course'}
      </button>
    </form>
  );
};

export default CourseForm;
