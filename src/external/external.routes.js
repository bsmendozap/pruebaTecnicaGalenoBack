import { Router } from "express";
import { testExternalLogin, testExternalProducts } from "./external.controller.js";

const router = Router();

router.post("/login", testExternalLogin);
router.get("/products", testExternalProducts);

export default router;