import products from "@assets/data/products";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import ProductsListItem from "@/components/ProductsListItem";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function MenuScreen() {
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from("products").select("*");
        console.log("🚀 ~ fetchProducts ~ data:", data);
      } catch (error) {
        console.log("Echec de chargement des produits : ", error);
      }

      fetchProducts();
    };
  }, []);

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
