import bcrypt from "bcryptjs";

export const cryptPassword = async (password) =>
  bcrypt.hash(password, 10);
