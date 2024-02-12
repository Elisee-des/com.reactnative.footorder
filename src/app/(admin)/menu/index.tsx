import products from "@assets/data/products";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import ProductsListItem from "@/components/ProductsListItem";

export default function MenuScreen() {
  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductsListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}
