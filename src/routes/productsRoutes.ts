import { Router } from "express";
import {
  getProducts,
  addToProduct,
  deleteProduct
} from "../controlers/productsControler"; 

const router = Router();

router.get("/", getProducts);

router.post("/", addToProduct);

router.delete("/:productId", deleteProduct);

export default router;
