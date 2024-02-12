import { View, Text } from "react-native";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { CartItem, Product } from "@/types";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
});

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItem] = useState<CartItem[]>([]);
  const addItem = (product: Product, size: CartItem["size"]) => {
    console.log(product);
    const newCartItem: CartItem = {
      id: "1",
      product: product,
      product_id: product.id,
      size,
      quantity: 1,
    };
    setItem([newCartItem, ...items]);
  };

  return (
    <CartContext.Provider value={{ items, addItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
