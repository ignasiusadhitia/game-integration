import { StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";

export default function Index() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: "https://mr-macagi.vercel.app/" }}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },
});
