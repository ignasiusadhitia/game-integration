import { GameProvider } from "@/context/GameContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <GameProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="game" options={{ title: "Game" }} />
      </Stack>
    </GameProvider>
  );
}
