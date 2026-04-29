import { Router } from "express";
import { addProduct, deletProduct,editProduct,getProductoById, getProducts} from "./product.controller.js";

import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarAdmin } from "../middlewares/validar-admin.js";

const router = Router();

router.get("/", validarJWT, getProducts);

router.get("/:id", validarJWT, validarAdmin, getProductoById);

router.post("/", validarJWT, validarAdmin, addProduct);

router.put("/:id", validarJWT, validarAdmin, editProduct);

router.delete("/:id", validarJWT, validarAdmin, deletProduct);

export default router;