import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@assets/data/products";
import Button from "@/components/Button";
import * as Haptics from "expo-haptics";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize, defaultPizzaImage } from "@/types";
import { useProduct } from "@/api/products";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const { data: product, error, isLoading } = useProduct(id);
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const { addItem } = useCart();
  const router = useRouter();

  const addToCart = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (!product) return;
    addItem(product, selectedSize);
    router.push("/cart");
    console.warn("produit ajouter avec succès !");
  };

  if (!product) {
    return <Text>Produit non trouver !</Text>;
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Produit non trouver !</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name || defaultPizzaImage }} />
      <Image
        style={styles.image}
        source={{ uri: product?.image?.toString() }}
        resizeMode="contain"
      />
      <Text>Selectionner la taille</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => setSelectedSize(size)}
            key={size}
            style={[
              styles.size,
              {
                backgroundColor: selectedSize == size ? "gainsboro" : "white",
              },
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                {
                  color: selectedSize == size ? "black" : "grey",
                },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>${product?.price}</Text>
      <Button text="Ajouter au panier" onPress={addToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    marginTop: "auto",
    fontWeight: "bold",
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    alignItems: "center",
    aspectRatio: 1,
    borderRadius: 25,
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
});

export default ProductDetailScreen;
