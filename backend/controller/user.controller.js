import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookies from "../jwt/AuthToken.js";

export const register = async (req, res) => {
  try {
  console.log("the register req body is :- "+ JSON.stringify(req.body));
    const { email, name, password, education } = req.body;
    if (
      !email ||
      !name ||
      !password ||
      !education
    ) {
      return res.status(400).json({ message: "Please fill required fields" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      name,
      password: hashedPassword,
      education
    });
    await newUser.save();
    if (newUser) {
      let token = await createTokenAndSaveCookies(newUser._id, res);
      console.log("Singup: ", token);
      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          education: newUser.education,
          createdOn: newUser.createdOn,
        },
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill required fields" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid email " });
    }
    if (!user.password) {
      return res.status(400).json({ message: "User password is missing" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
  
    let token = await createTokenAndSaveCookies(user._id, res);
    console.log("Login: ", token);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export const getMyProfile = async (req, res) => {
  const user = await req.user;
  res.status(200).json({ user });
};

export const getAdmins = async (req, res) => {
  const admins = await User.find({ role: "admin" });
  res.status(200).json({ admins });
};
