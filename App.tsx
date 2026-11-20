import "./global.css";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-900 px-6">
      <Text className="text-3xl font-bold text-white">Willow Glass</Text>
      <Text className="mt-2 text-center text-slate-400">
        Find which glass fits which phone
      </Text>
      <StatusBar style="light" />
    </View>
  );
}
