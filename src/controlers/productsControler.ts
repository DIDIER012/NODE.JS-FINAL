import { Request, Response } from "express";
import ProductModel from "../models/products"; 


export const getProducts = async (req: Request, res: Response) => {
    try {
        const {
            limit = "10",
            page = "1",
            sort,
            query
        } = req.query;

        const limitNum = parseInt(limit as string, 10);
        const pageNum = parseInt(page as string, 10);

        const filter: Record<string, any> = {};
        if (query) {
            filter.category = { $regex: query, $options: "i" };
        }

        let sortOption: Record<string, 1 | -1> = {};
        if (sort === "asc") sortOption.price = 1;
        else if (sort === "desc") sortOption.price = -1;

        const products = await ProductModel.find(filter)
            .sort(sortOption)
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum);

        const total = await ProductModel.countDocuments(filter);

        return res.status(200).json({
            status: "success",
            total,
            page: pageNum,
            limit: limitNum,
            products,
        });

    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const addToProduct = async (req: Request, res: Response) => {
    try {
        const newProduct = new ProductModel(req.body);

        if (!newProduct) {
            return res.status(400).json({ message: "Error al cargar producto, ¡Revisa los campos!" });
        }

        await newProduct.save();
        return res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error al crear el producto:", error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};


export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const deleted = await ProductModel.findByIdAndDelete(req.params.productId);

        if (!deleted) {
            return res.status(404).json({ message: "El producto no existe" });
        }

        return res.status(200).json({ message: "¡El producto ha sido eliminado con éxito!" });
    } catch (error) {
        console.error("Error al querer eliminar producto:", error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};
