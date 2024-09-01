import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  Button,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { extendedClient } from "@/myDbModule";

export default function HomeScreen() {
  const user = extendedClient.user.useFindFirst({
    where: {
      id: 1,
    },
  });

  console.log(user);

  const createUser = () => {
    const newUser = { name: "Ayomide", email: "mide@mail.eth" };

    extendedClient.user.create({
      data: newUser,
    });

    console.log("New user created");
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView>
        <ThemedText>Hello World Notion!!!!</ThemedText>
        <Button title="Create user" onPress={createUser} />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
