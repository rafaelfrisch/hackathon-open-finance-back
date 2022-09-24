import { Router } from "express";
import { create, login } from "./controller";

const router = Router();

const moduleName = "/users";

router.post(`${moduleName}`, create);
router.post(`${moduleName}/login`, login);

const usersRoutes = router;

export default usersRoutes;