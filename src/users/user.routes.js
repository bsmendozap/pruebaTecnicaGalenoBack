import { Router } from "express";
import { register, updateUser, deleteUser } from "./user.controller.js";

const router = Router();

router.post("/register", register);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;