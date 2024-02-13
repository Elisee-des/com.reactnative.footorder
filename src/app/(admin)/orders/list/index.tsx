import { FlatList } from "react-native-gesture-handler";
import orders from "../../../../../assets/data/orders";
import { Stack } from "expo-router";
import OrderListItem from "@/components/OrderListtem";

export default function OrdersScreen() {
  return (
    <>
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}
