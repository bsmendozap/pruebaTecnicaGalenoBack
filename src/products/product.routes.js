import { Router } from "express";
import { addProduct, deletProduct,editProduct,getProductoById, getProducts} from "./product.controller.js";

import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarAdmin } from "../middlewares/validar-admin.js";

const router = Router();

router.get("/", getProducts);

router.get("/:id", getProductoById);

router.post("/", addProduct);

router.put("/:id", editProduct);

router.delete("/:id", deletProduct);

export default router;