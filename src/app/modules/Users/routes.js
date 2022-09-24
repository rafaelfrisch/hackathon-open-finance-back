import { response, Router } from "express";
import { create, login } from "./controller";

const router = Router();

const moduleName = "/users";

router.post(`${moduleName}`, create);
router.post(`${moduleName}/login`, login);
router.get(`${moduleName}`);

const usersRoutes = router;

export default usersRoutes;
