import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Logo } from "../src/components/Logo";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pb-10 pt-4"
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View entering={FadeInDown.duration(450)}>
          <Logo size="lg" />
          <Text className="mt-2 text-base text-slate-400">
            Find which glass fits which phone
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(120).duration(450)}
          className="mt-8 flex-row items-center rounded-2xl border border-slate-800 bg-slate-900 px-4"
        >
          <Ionicons name="search" size={20} color="#64748b" />
          <TextInput
            className="ml-3 flex-1 py-4 text-base text-white"
            placeholder="Type a phone model"
            placeholderTextColor="#64748b"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(220).duration(450)}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-4"
            contentContainerClassName="gap-2"
          >
            <View className="rounded-full bg-emerald-400 px-4 py-2">
              <Text className="font-semibold text-slate-950">All companies</Text>
            </View>
          </ScrollView>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(320).duration(450)}
          className="mt-10 items-center rounded-3xl border border-dashed border-slate-800 px-6 py-12"
        >
          <View className="h-16 w-16 items-center justify-center rounded-2xl bg-slate-900">
            <Ionicons name="phone-portrait-outline" size={30} color="#34d399" />
          </View>
          <Text className="mt-5 text-lg font-semibold text-white">No glass added yet</Text>
          <Text className="mt-1 text-center text-slate-400">
            Your glass list will show up here once you add your first one.
          </Text>
          <Pressable className="mt-6 rounded-xl bg-slate-800 px-5 py-3 active:opacity-80">
            <Text className="font-semibold text-slate-200">Add glass</Text>
          </Pressable>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
