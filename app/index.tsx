import { useGameContext } from "@/context/GameContext";
import { Link, useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// @ts-ignore
import UnityView from "@azesmway/react-native-unity";

export default function Index() {
  const { setGameUrl } = useGameContext();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const unityRef = useRef(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          "https://catalog.api.gamedistribution.com/api/v2.0/rss/All/?collection=all&categories=All&tags=All&subType=all&type=all&mobile=all&rewarded=all&amount=100&page=$x&format=json"
        );
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading games...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <UnityView
        ref={unityRef}
        style={{ flex: 1 }}
        onUnityMessage={(result) => {
          console.log("onUnityMessage", result.nativeEvent.message);
        }}
      /> */}
      <FlatList
        data={games}
        keyExtractor={(item) => item.Md5.toString()}
        renderItem={({ item }) => (
          <Link href="/game" asChild>
            <TouchableOpacity
              style={styles.gameItem}
              onPress={() => {
                setGameUrl(item.Url);
              }}
            >
              <Image source={{ uri: item.Asset[0] }} style={styles.gameImage} />
              <Text style={styles.gameTitle}>{item.Title}</Text>
            </TouchableOpacity>
          </Link>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No games available</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  gameItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  gameImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#6c757d",
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
  },
});
