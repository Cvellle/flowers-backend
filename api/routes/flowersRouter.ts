import { Router } from "express";
import { getFlowerById, getFlowers } from "../controllers/flowersControllers";

const {} = require("../controllers/flowersControllers");

const router = Router();

router.get("/", getFlowers);
router.get("/:id", getFlowerById);

export default router;
