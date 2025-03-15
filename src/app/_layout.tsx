import { Stack } from "expo-router";
import { Provider, useDispatch } from "react-redux";
import configureAppStore from "../redux";
import { Pressable, View, StyleSheet, Text } from "react-native";

const store = configureAppStore();

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="/" options={{ title: "Mines" }} />
      </Stack>
    </Provider>
  );
}