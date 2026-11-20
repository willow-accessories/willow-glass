import AsyncStorage from "@react-native-async-storage/async-storage";

const ONBOARDED_KEY = "willow-glass:onboarded";

export async function getOnboarded(): Promise<boolean> {
  try {
    return (await AsyncStorage.getItem(ONBOARDED_KEY)) === "1";
  } catch {
    return false;
  }
}

export async function setOnboarded(): Promise<void> {
  try {
    await AsyncStorage.setItem(ONBOARDED_KEY, "1");
  } catch {
    // if storage fails the intro just shows again next launch
  }
}
