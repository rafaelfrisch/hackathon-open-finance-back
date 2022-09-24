import express from "express";
import systemRoutes from "./app/modules/System/routes";
import usersRoutes from "./app/modules/Users/routes";

const router = express.Router();

router.use(systemRoutes);
//router.use(usersRoutes);

const mainRoutes = router;

export default mainRoutes;