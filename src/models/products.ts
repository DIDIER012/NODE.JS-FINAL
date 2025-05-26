// src/models/cart.ts
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
});

const CartModel = mongoose.model("Cart", cartSchema);
export default CartModel;
