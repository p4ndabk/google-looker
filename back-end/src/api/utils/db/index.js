import { prisma } from "../../../../prisma/client";
import bcrypt from "bcrypt";

export const getUserFromDBByEmail = async (email) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const verifyPassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw error;
  }
};
