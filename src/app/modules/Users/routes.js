import { Router } from "express";
import { create } from "./controller";

const router = Router();

const moduleName = "/users";

router.post(`${moduleName}`, create);

const usersRoutes = router;

export default usersRoutes;