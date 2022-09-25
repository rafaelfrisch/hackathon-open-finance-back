import { Router } from "express";
import { create, login, accountData, creditCartData } from "./controller";

const router = Router();

const moduleName = "/users";

router.post(`${moduleName}`, create);
router.post(`${moduleName}/login`, login);
router.get(`${moduleName}/accountdata/:cpf`, accountData);
router.get(`${moduleName}/creditcartdata/:creditCardAccountId`, creditCartData);


const usersRoutes = router;

export default usersRoutes;
