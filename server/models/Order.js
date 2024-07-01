import mongoose from "mongoose";
import { ObjectId } from "mongodb";
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    orders: [
      {
        order_date: {
          type:  Date,
        },
        items: [
          {
            productId: {
              type: mongoose.Types.ObjectId,
            },
            productName:{
              type:String
            },
            img:{
              type:String
            },
            quantity: {
              type: Number,
            },
            price: {
              type: Number,
            },
          },
        ],
        totalPrice: {
          type: Number,
        },
        status: {
          type: String,
          default:"Order Placed"
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
