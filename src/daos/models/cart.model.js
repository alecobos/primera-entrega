import { Schema, Types, model } from "mongoose";

const collection = "carts"
const schema = new Schema({
    user_id: { type: Types.ObjectId, ref: "users", required: true },
})

export const CartModel = model(collection, schema)