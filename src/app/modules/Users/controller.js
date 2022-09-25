import prisma from "../../../helpers/prismaClient";
import { cryptPassword, generateToken } from "./service";
import { findUserByEmail } from "./core";
import bcrypt from "bcryptjs";
import { searchAccountByCpf, searchCreditCartData } from "./service";

export const create = async (request, response) => {
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
  } catch (error) {
    console(error);
    response.json(error);
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
    console.log(error);
    return response.json(error);
  }
};

export const accountData = async (req, res) => {
  try {
    const { cpf } = req.params;
    const account = searchAccountByCpf(cpf);
    const { customerId, organizationId } = account;
    const creditCart = await searchCreditCartData(organizationId, customerId);
    res.json({ account, creditCart: creditCart[0] });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
