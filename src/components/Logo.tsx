import { Text, View } from "react-native";

type Props = {
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "text-xl",
  md: "text-3xl",
  lg: "text-5xl",
};

// Text logo for now. Swap this for the SVG logo once it is ready.
export function Logo({ size = "md" }: Props) {
  return (
    <View className="flex-row items-baseline">
      <Text className={`${sizes[size]} font-bold tracking-tight text-white`}>
        Willow
      </Text>
      <Text className={`${sizes[size]} font-light tracking-tight text-emerald-300`}>
        {" "}
        Glass
      </Text>
    </View>
  );
}
