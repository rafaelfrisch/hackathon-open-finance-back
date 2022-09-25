import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import formatCPF from "../../../helpers/formatCpf";
import accountData from "../../data/accountsArray";
import axios from "axios";
import { hackathonUrl } from "../../../helpers/constants";

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

export const searchCreditCartData = async (organizationid, customerid) => {
  const res = await axios.get(hackathonUrl + "/credit-cards-accounts/v1/accounts", {
    headers: {
      organizationid,
      customerid,
    },
  });

  const creditCartData = res.data.data;
  return creditCartData;
};

export const searchBills = async (creditCardAccountId, customerid, organizationid) => {
  const res = await axios.get(hackathonUrl + "/credit-cards-accounts/v1/accounts/" + creditCardAccountId + "/bills", {
    headers: {
      organizationid,
      customerid,
    },
  });

  return res.data.data;
};

export const searchBillsTransactions = async (creditCardAccountId, billId, customerid, organizationid) => {
  const res = await axios.get(hackathonUrl + "/credit-cards-accounts/v1/accounts/" + creditCardAccountId + "/bills/" + billId + "/transactions", {
    headers: {
      organizationid,
      customerid,
    },
  });

  return res.data.data;
};
