import Colors from "@/constants/Colors";
import { Product, defaultPizzaImage } from "@/types";
import products from "@assets/data/products";
import { Link, useSegments } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import * as Haptics from "expo-haptics";

type ProductsListItemProps = {
  product: Product;
};

const Vibrate = async () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

const ProductsListItem = ({ product }: ProductsListItemProps) => {
  const segements = useSegments();

  return (
    <Link
      href={`/${segements[0]}/menu/${product.id}`}
      onPress={Vibrate}
      asChild
    >
      <Pressable style={styles.container}>
        <Image
          source={{ uri: product?.image?.toString() || defaultPizzaImage }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product?.name}</Text>
        <Text style={styles.price}>${product?.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductsListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    maxWidth: "50%",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  price: {
    color: Colors.light.tint,
  },
});
