import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // here we are extracting jwt token as it start with bearer so split spreate them and on the second postion that means on 1st index there is jwt token
      token = req.headers.authorization.split(" ")[1];

      // it verify the token whether its vaild or not
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //finding that user in our database by excluding there password
      const user = await User.findById(decoded.id).select("-password");
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "not authroized,token failed" });
    }
  }
  if (!token) {
    return res.status(401).json({ message: "not authroized no token " });
  }
};
