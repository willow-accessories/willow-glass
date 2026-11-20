import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { getOnboarded } from "../src/storage";

export default function Index() {
  const [target, setTarget] = useState<"/home" | "/onboarding" | null>(null);

  useEffect(() => {
    getOnboarded().then((done) => setTarget(done ? "/home" : "/onboarding"));
  }, []);

  if (!target) {
    return <View className="flex-1 bg-slate-950" />;
  }

  return <Redirect href={target} />;
}
