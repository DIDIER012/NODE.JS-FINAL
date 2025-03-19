import { json } from "express";
import products from "../models/products.js";

// Obtener los productos
export const getProducts = async(req, res) => {
    try {
        const products = await Product.find()
        if(!products || products.length === 0){ 
            return res.status(404).json({message: 'No existen productos cargados'})
        }
        else{
            return res.json(products)
        }
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return res.status(500).json({message:'Error en el servidor'})
    }
}

// Agregar nuevos proudctos

export const addtoproduct = async(req, res) => {
try {   
    const newProduct = new products(req.body)
    if(!newProduct){
        return res.status(404).json({message: "Error al cargar producto, !Revisa los campos!"})
    }
    await newProduct.save()
    return res.status(201).json(newProduct)
} catch (error) {
    console.error("Error al crear el producto:", error);
    return res.status(500),json({message: "Error del servidor"})
}
}

// eliminar producto

export const deleteProduct = async(req, res) => {
    try {
        const deleteProduct = await products.findByIdAndDelete(req.params.productId)
        if(!deleteProduct){
            return res.status(404).json({message:"El producto no existe"})
        }
        return res.status(201).json({message: "!El producto a sido eliminado con exito!"})
    } catch (error) {
        console.error('Error al querer eliminar producto:', error);
        res.status(500).json({message: "Error del servidor"})
        
    }
}