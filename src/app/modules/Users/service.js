import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const cryptPassword = async (password) =>
  bcrypt.hash(password, 10);

export const generateToken = (params) => {
  try {
    const token = jwt.sign(
      {
        ...params,
      },
      `${process.env.SECRET_KEY}`,
    );
    return token
  } catch (error) {
    console.log(error)    
  }
}
