import { Router } from "express";

const {
  createUser,
  signinUser,
  getCurrentUser,
  handleLogout,
  handleRefreshToken,
} = require("../controllers/userControllers");
const { verifyJWT } = require("../middleware/verifyJWT");
const router = Router();

router.post("/auth/user/signup", createUser);
router.post("/auth/signin", signinUser);
router.get("/me", verifyJWT, getCurrentUser);
router.get("/refreshToken", handleRefreshToken);
router.get("/logout", handleLogout);

export default router;
