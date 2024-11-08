import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState({});
  console.log(blogs);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(data);
        setBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, [id]);

  return (
    <div>
      {blogs && (
        <section className="container mx-auto p-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-800 leading-tight mb-4">
              {blogs?.title}
            </h1>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-6">
            
            <div className="md:w-1/2 w-full md:pl-6 space-y-6">
              <p className="text-lg leading-relaxed text-gray-700">
                {blogs?.about}
              </p>
              {/* Add more content here if needed */}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Detail;