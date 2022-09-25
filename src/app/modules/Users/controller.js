import prisma from "../../../helpers/prismaClient";
import { cryptPassword, generateToken, searchBillsTransactions } from "./service";
import { findUserByEmail } from "./core";
import bcrypt from "bcryptjs";
import { searchAccountByCpf, searchCreditCartData, searchBills } from "./service";

export const create = async (request, response) => {
  try {
    const { cpf, email, password, name } = request.body;

    const user = await prisma.user.create({
      data: {
        cpf,
        email,
        password: await cryptPassword(password),
        name,
      },
    });

    const jwtToken = generateToken({
      email: user.email,
    });

    response.json({ user, token: jwtToken });
  } catch (error) {
    console.log(error);
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
      user,
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

export const creditCartData = async (req, res) => {
  try {
    const { creditCardAccountId } = req.params;
    const { customerId, organizationId } = req.query;

    const bills = await searchBills(creditCardAccountId, customerId, organizationId);
    res.json(bills);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const billsData = async (req, res) => {
  try {
    const { creditCardAccountId, billId } = req.params;
    const { customerId, organizationId } = req.query;

    const transactions = await searchBillsTransactions(creditCardAccountId, billId, customerId, organizationId);
    res.json(transactions);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const makeTransaction = async (req, res) => {
  try {
    const { receiverAccountHash, senderAccountHash, value } = req.body;

    const sender = await prisma.user.findFirst({
      where: {
        accountHash: senderAccountHash,
      },
    });

    const receiver = await prisma.user.findFirst({
      where: {
        accountHash: receiverAccountHash,
      },
    });

    const transaction = await prisma.transaction.create({
      data: {
        senderHashAccount: senderAccountHash,
        receiverHashAccount: receiverAccountHash,
        value,
      },
    });

    await prisma.user.update({
      where: {
        accountHash: senderAccountHash,
      },
      data: {
        balance: sender.balance - value,
      },
    });

    await prisma.user.update({
      where: {
        accountHash: receiverAccountHash,
      },
      data: {
        balance: receiver.balance + value,
      },
    });

    res.json(transaction);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
