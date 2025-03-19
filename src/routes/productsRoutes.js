import { addtoproduct, deleteProduct, getProducts } from '../controlers/productsControler.js'
import express from 'express'


const router = express.Router()

router.get('/', getProducts)
router.post('/',addtoproduct)
router.delete('/:productId', deleteProduct)


export default router;