import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Blogs() {
  const { blogs } = useAuth();


  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold text-center mb-8">Blogs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => (
              <Link
                to={`/blog/${blog._id}`}
                key={blog._id}
                className="rounded-lg p-6 bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
              >
                {/* Blog Title */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {blog.title || "Untitled Blog"}
                </h2>

                {/* Blog Category */}
                <p className="text-sm font-medium text-gray-600 mb-4">
                  {blog.category || "Uncategorized"}
                </p>

                {/* Blog Description */}
                <p className="text-gray-700 line-clamp-3">
                  {blog.description || "No description available."}
                </p>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">No blogs available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blogs;











// import React from "react";
// import { useAuth } from "../context/AuthProvider";
// import { Link } from "react-router-dom";

// function Blogs() {
//   const { blogs } = useAuth();

//   console.log(blogs);
//   return (
//     <div>
//       <div className="container mx-auto my-12 p-4">
//         <h1 className="text-2xl font-bold mb-6">All Blogs goes here!!!</h1>
//         <p className="text-center mb-8">
//           The concept of gods varies widely across different cultures,
//           religions, and belief systems
//         </p>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
//           {blogs && blogs.length > 0 ? (
//             blogs.map((blog, index) => (
//               <Link
//                 to={`/blog/${blog.id}`}
//                 key={index}
//                 className="relative rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300"
//               >
//                 <img
//                   src={blog?.blogImage?.url}
//                   alt={blog?.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="absolute inset-0 bg-black opacity-30"></div>
//                 <div className="absolute bottom-4 left-4 text-white">
//                   <h2 className="text-lg font-semibold">{blog?.title}</h2>
//                   <p className="text-sm">{blog?.category}</p>
//                 </div>
//               </Link>
//             ))
//           ) : (
//             <div></div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Blogs;
