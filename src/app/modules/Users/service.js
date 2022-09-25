import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import formatCPF from "../../../helpers/formatCpf";
import accountData from "../../services/readAccountData";

dotenv.config();

export const cryptPassword = async (password) => bcrypt.hash(password, 10);

export const generateToken = (params) => {
  try {
    const token = jwt.sign(
      {
        ...params,
      },
      `${process.env.SECRET_KEY}`
    );
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const searchAccountByCpf = (cpf) => {
  const parsedCpf = formatCPF(cpf);
  const account = accountData.find((account_json) => account_json.customerId === parsedCpf);

  return account;
};
