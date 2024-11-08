import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Sidebar from "../dashboard/Sidebar";
import MyBlogs from "../dashboard/MyBlogs";
import CreateBlog from "../dashboard/CreateBlog";
import UpdateBlog from "../dashboard/UpdateBlog";
import { Navigate } from "react-router-dom";
import ManageCourses from "../dashboard/ManageCourses";

function Dashboard() {
  const { profile, isAuthenticated } = useAuth();
  const [component, setComponent] = useState("My Blogs");
  console.log(profile);
  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar Section */}
      <div className="w-1/4 md:w-1/5 bg-gray-100 shadow-lg">
        <Sidebar component={component} setComponent={setComponent} />
      </div>

      {/* Main Content Section */}
      <div className="w-3/4 md:w-4/5 p-6 overflow-y-auto">
        {component === "Create Blog" ? (
          <CreateBlog />
        ) : component === "Update Blog" ? (
          <UpdateBlog />
        ) : component === "Manage Courses" ? (
          <ManageCourses />
        ): (
          <MyBlogs />
        )}
      </div>
    </div>
  );
}

export default Dashboard;










// import React, { useState } from "react";
// import { useAuth } from "../context/AuthProvider";
// import Sidebar from "../dashboard/Sidebar";
// import MyProfile from "../dashboard/MyProfile";
// import MyBlogs from "../dashboard/MyBlogs";
// import CreateBlog from "../dashboard/CreateBlog";
// import UpdateBlog from "../dashboard/UpdateBlog";
// import { Navigate } from "react-router-dom";
// function Dashboard() {
//   const { profile, isAuthenticated } = useAuth();
//   const [component, setComponent] = useState("My Blogs");
//   console.log(profile);
//   console.log(isAuthenticated);

//   if (!isAuthenticated) {
//     return <Navigate to={"/"} />;
//   }
//   return (
//     <div>
//       <div>
//         <Sidebar component={component} setComponent={setComponent} />
//         {component === "My Profile" ? (
//           <MyProfile />
//         ) : component === "Create Blog" ? (
//           <CreateBlog />
//         ) : component === "Update Blog" ? (
//           <UpdateBlog />
//         ) : (
//           <MyBlogs />
//         )}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
