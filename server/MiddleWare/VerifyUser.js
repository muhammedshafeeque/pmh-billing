import jwt from "jsonwebtoken";
import { getProfileByUserId } from "../Service/Profile.service.js";

export const verifyUser = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await getProfileByUserId(decoded.id);
      req.user.token = token;
      next();
    } catch (error) {
      res.status(401).json("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401).json("Not authorized, no token");
  }
};
