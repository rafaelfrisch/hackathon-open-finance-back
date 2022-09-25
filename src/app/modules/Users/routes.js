import { Router } from "express";
import { create, login, accountData, creditCartData, billsData } from "./controller";

const router = Router();

const moduleName = "/users";

router.post(`${moduleName}`, create);
router.post(`${moduleName}/login`, login);
router.get(`${moduleName}/accountdata/:cpf`, accountData);
router.get(`${moduleName}/creditcarddata/:creditCardAccountId`, creditCartData);
router.get(`${moduleName}/creditcardbillstransactions/:creditCardAccountId/:billId`, billsData);


const usersRoutes = router;

export default usersRoutes;
