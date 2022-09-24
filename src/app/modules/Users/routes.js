import { Router } from "express";
import { create, login, accountData } from "./controller";

const router = Router();

const moduleName = "/users";

router.post(`${moduleName}`, create);
router.post(`${moduleName}/login`, login);
router.get(`${moduleName}/accountdata/:cpf`, accountData);

const usersRoutes = router;

export default usersRoutes;
