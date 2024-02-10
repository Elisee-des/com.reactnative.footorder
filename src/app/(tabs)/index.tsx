import products from "@assets/data/products";
import { Image, StyleSheet, Text, View } from "react-native";
import ProductsListItem from "@/components/ProductsListItem";

export default function MenuScreen() {
  return (
    <View>
      <ProductsListItem product={products[0]} />
      <ProductsListItem product={products[3]} />
      <ProductsListItem product={products[5]} />
    </View>
  );
}
