import Colors from "@/constants/Colors";
import products from "@assets/data/products";
import { Image, StyleSheet, Text, View } from "react-native";

const ProductsListItem = ({ product }) => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: product.image }} style={styles.image} />

        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    </View>
  );
};

export default ProductsListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
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
