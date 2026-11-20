import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { FlatList, Pressable, Text, View, useWindowDimensions } from "react-native";
import Animated, {
  Extrapolation,
  FadeInDown,
  SharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Logo } from "../src/components/Logo";
import { setOnboarded } from "../src/storage";

type Slide = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  body: string;
};

const SLIDES: Slide[] = [
  {
    id: "search",
    icon: "search",
    title: "Find the right glass fast",
    body: "Type a phone model and see which glass fits it. The primary model is always shown first.",
  },
  {
    id: "company",
    icon: "layers",
    title: "Check by company",
    body: "Every company cuts its glass a little differently. Pick the company and see exactly what fits.",
  },
  {
    id: "offline",
    icon: "cloud-offline",
    title: "Works without internet",
    body: "Your list stays on your phone, so lookups are quick even when the signal is weak.",
  },
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<Slide>);

function SlideItem({
  item,
  index,
  width,
  scrollX,
}: {
  item: Slide;
  index: number;
  width: number;
  scrollX: SharedValue<number>;
}) {
  const cardStyle = useAnimatedStyle(() => {
    const input = [(index - 1) * width, index * width, (index + 1) * width];
    return {
      opacity: interpolate(scrollX.value, input, [0.2, 1, 0.2], Extrapolation.CLAMP),
      transform: [
        { scale: interpolate(scrollX.value, input, [0.7, 1, 0.7], Extrapolation.CLAMP) },
        { translateX: interpolate(scrollX.value, input, [width * 0.25, 0, -width * 0.25], Extrapolation.CLAMP) },
      ],
    };
  });

  return (
    <View style={{ width }} className="flex-1 items-center justify-center px-8">
      <Animated.View style={cardStyle}>
        <LinearGradient
          colors={["#34d399", "#0f766e"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: 168,
            height: 168,
            borderRadius: 44,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name={item.icon} size={76} color="#ecfdf5" />
        </LinearGradient>
      </Animated.View>

      <Text className="mt-12 text-center text-3xl font-bold text-white">{item.title}</Text>
      <Text className="mt-3 text-center text-base leading-6 text-slate-400">{item.body}</Text>
    </View>
  );
}

function Dot({
  index,
  width,
  scrollX,
}: {
  index: number;
  width: number;
  scrollX: SharedValue<number>;
}) {
  const style = useAnimatedStyle(() => {
    const input = [(index - 1) * width, index * width, (index + 1) * width];
    return {
      width: interpolate(scrollX.value, input, [8, 26, 8], Extrapolation.CLAMP),
      opacity: interpolate(scrollX.value, input, [0.35, 1, 0.35], Extrapolation.CLAMP),
    };
  });

  return <Animated.View style={style} className="h-2 rounded-full bg-emerald-400" />;
}

export default function Onboarding() {
  const { width } = useWindowDimensions();
  const scrollX = useSharedValue(0);
  const listRef = useRef<FlatList<Slide>>(null);
  const [index, setIndex] = useState(0);
  const isLast = index === SLIDES.length - 1;

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const finish = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await setOnboarded();
    router.replace("/home");
  };

  const next = () => {
    if (isLast) {
      finish();
      return;
    }
    Haptics.selectionAsync();
    listRef.current?.scrollToIndex({ index: index + 1, animated: true });
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <View className="flex-row items-center justify-between px-6 pt-2">
        <Logo size="sm" />
        {!isLast && (
          <Pressable onPress={finish} hitSlop={12}>
            <Text className="text-base font-medium text-slate-400">Skip</Text>
          </Pressable>
        )}
      </View>

      <AnimatedFlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) =>
          setIndex(Math.round(e.nativeEvent.contentOffset.x / width))
        }
        renderItem={({ item, index: i }) => (
          <SlideItem item={item} index={i} width={width} scrollX={scrollX} />
        )}
      />

      <Animated.View entering={FadeInDown.duration(500)} className="px-6 pb-6">
        <View className="mb-8 flex-row items-center justify-center gap-2">
          {SLIDES.map((s, i) => (
            <Dot key={s.id} index={i} width={width} scrollX={scrollX} />
          ))}
        </View>

        <Pressable
          onPress={next}
          className="items-center rounded-2xl bg-emerald-400 py-4 active:opacity-80"
        >
          <Text className="text-lg font-bold text-slate-950">
            {isLast ? "Get started" : "Next"}
          </Text>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}
