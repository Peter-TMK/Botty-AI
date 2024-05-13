import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
// router.post("/send/:id", protectRoute, sendMessage);
// router.post("/login", login);
// router.post("/logout", logout);

export default router;
