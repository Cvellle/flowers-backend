import { Router } from "express";
import { getFlowers } from "../controllers/flowersControllers";

const {} = require("../controllers/flowersControllers");

const router = Router();

router.get("/", getFlowers);

export default router;
