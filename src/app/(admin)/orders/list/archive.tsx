import { Text, FlatList, ActivityIndicator } from "react-native";
import orders from "@assets/data/orders";
import OrderListItem from "@/components/OrderListtem";

export default function OrdersScreen() {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}
