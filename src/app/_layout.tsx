import { Stack } from "expo-router";
import { Provider } from "react-redux";
import configureAppStore from "../redux";

const store = configureAppStore();

export default function RootLayout() {
  return (
    <Provider store={store}>
        <Stack>
        <Stack.Screen name="/" options={{ title: "New Game" }} />
        <Stack.Screen
            name="mines"
            options={{ title: "Mines" }}
        />
        </Stack>
    </Provider>
  );
}