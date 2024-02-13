import products from "@assets/data/products";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import ProductsListItem from "@/components/ProductsListItem";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ActivityIndicator } from "react-native";
import { useProductsList } from "@/api/products";

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductsList();

  if (isLoading) {
    <ActivityIndicator />;
  }

  if (error) {
    return <Text>Echec de chargement des produits</Text>;
  }

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
