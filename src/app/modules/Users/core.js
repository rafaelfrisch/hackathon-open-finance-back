import prisma from "../../../helpers/prismaClient";

export const findUserByEmail = async (email) => {
  try {
    const foundUserByEmail = await prisma.user.findFirst({
      where: {
        email,
      }
    });

    return foundUserByEmail;
  } catch (error) {
    console.log(error)
  }
};
