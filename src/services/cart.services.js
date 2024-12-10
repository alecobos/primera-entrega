import Services from "./service.manager.js";
import { cartDao } from "../daos/mongodb/cart.dao.js";
import "dotenv/config";

class CartService extends Services {
  constructor() {
    super(cartDao);
  }

  create = async (cart) => {
    console.log("Datos del carrito a crear:", cart);
    try {
      const newCart = await this.dao.create(cart);
      return newCart;
    } catch (error) {
      throw error;
    }
  };
  

  };

export const cartService = new CartService();