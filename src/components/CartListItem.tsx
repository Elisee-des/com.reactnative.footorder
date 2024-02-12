import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { CartItem } from "@/types";
import { Link, router, useRouter } from "expo-router";
// import { defaultPizzaImage } from '@/constants/Images';
import { FontAwesome } from "@expo/vector-icons";
import { useCart } from "@/providers/CartProvider";
import * as Haptics from "expo-haptics";

type CartListItemProps = {
  cartItem: CartItem;
};

const CartListItem = ({ cartItem }: CartListItemProps) => {
  const { updateQuantity } = useCart();
  const router = useRouter();
  const Vibrate = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={router.push(`/(tabs)/menu/${cartItem.product.id}`)}> */}
      <Link href={`/menu/${cartItem.product.id}`} onPress={Vibrate} asChild>
        <Pressable>
          <Image
            source={{ uri: cartItem.product.image?.toString() }}
            style={styles.image}
            resizeMode="contain"
          />
        </Pressable>
      </Link>

      {/* </TouchableOpacity> */}

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{cartItem.product.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>${cartItem.product.price.toFixed(2)}</Text>
          <Text>Size: {cartItem.size}</Text>
        </View>
      </View>

      <View style={styles.quantitySelector}>
        <View style={{ backgroundColor: "gainsboro", borderRadius: 50 }}>
          <FontAwesome
            onPress={() => updateQuantity(cartItem.id, -1)}
            name="minus"
            color="gray"
            style={{ padding: 5 }}
          />
        </View>

        <Text style={styles.quantity}>{cartItem.quantity}</Text>

        <View style={{ backgroundColor: "gainsboro", borderRadius: 50 }}>
          <FontAwesome
            onPress={() => updateQuantity(cartItem.id, 1)}
            name="plus"
            color="gray"
            style={{ padding: 5 }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: "center",
    marginRight: 10,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: "row",
    gap: 5,
  },
  quantitySelector: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  quantity: {
    fontWeight: "500",
    fontSize: 18,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});

export default CartListItem;
