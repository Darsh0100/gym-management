import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken"; // For creating tokens
import bcrypt from "bcryptjs"; // For password hashing

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
// code for registering the user and putting the data of user in database
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists)
    return res.status(400).json({ message: "emai already registered" });

  // hash password with bcrypt
  // in this we are  generating a random string which will be added to our passwrod for unique hash

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //saving user data to monogdb database
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "user",
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};

//for user login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: "this email does not exist" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "wrong password" });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(400).json({ message: "User not found" });

  res.json(user);
};
