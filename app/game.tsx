import { useGameContext } from "@/context/GameContext";
import { StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";

export default function Game() {
  const { gameUrl } = useGameContext();

  if (!gameUrl) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No game selected!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView source={{ uri: gameUrl }} style={styles.webview} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  webview: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#ff0000",
  },
});
