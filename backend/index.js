import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import courseRoute from "./routes/course.route.js"
import cors from "cors";
const app = express();
dotenv.config();

const port = process.env.PORT;
const MONOGO_URL = process.env.MONOG_URI;
const DB_NAME = process.env.DB_NAME;

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// DB Code
const connectDb = async () => {
  try{
      console.log(`${MONOGO_URL}/${DB_NAME}`)
      const connectionInstance = await mongoose.connect(`${MONOGO_URL}/${DB_NAME}`);
      console.log(`mongodb connected !! DB HOST : ${connectionInstance.connection.host}`) ;
  }catch(err){
      console.log("error in db connection !") ;
      console.log(err);
      process.exit(1) ;
  }
}
connectDb();

// defining routes
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);
app.use("/api/course", courseRoute);
// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
