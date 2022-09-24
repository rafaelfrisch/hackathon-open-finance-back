import prisma from "../../../helpers/prismaClient"
import { cryptPassword } from "./service";

export const create = async (request, response, next) => {
  try {
    const {
      cpf,
      email,
      password,
    } = request.body;
  
    const user = await prisma.user.create({
      data: {
        cpf,
        email,
        password: await cryptPassword(password),
      },
    })
  
    response.json(user);
    next();
  } catch (error) {
    next(error);
  }

};
