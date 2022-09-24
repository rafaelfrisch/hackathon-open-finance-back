import prisma from "../../../helpers/prismaClient";
import { cryptPassword, generateToken } from "./service";
import { findUserByEmail } from "./core";
import bcrypt from "bcryptjs";


export const create = async (request, response, next) => {
  try {
    const { cpf, email, password } = request.body;

    const user = await prisma.user.create({
      data: {
        cpf,
        email,
        password: await cryptPassword(password),
      },
    });

    response.json(user);
    next();
  } catch (error) {
    next(error);
  }
};

export const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return { message: "Not registered" };
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return { message: "Bad credentials" };
    }

    const jwtToken = generateToken({
      email: user.email,
    });

    return response.json({
      message: "Success",
      token: jwtToken,
    });
  } catch (error) {
    console.log(error)
    return response.json(error);
  }
};
