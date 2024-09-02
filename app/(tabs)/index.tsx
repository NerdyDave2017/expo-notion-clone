import { StyleSheet, SafeAreaView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { extendedClient } from "@/myDbModule";
import DraggableNotionList from "@/components/DraggableNotionList";

export default function HomeScreen() {
  const user = extendedClient.user.useFindFirst({
    where: {
      id: 1,
    },
  });

  const notions = extendedClient.notionFile.useFindMany();

  console.log("Notions", notions);

  console.log(user);

  const createUser = () => {
    const newUser = { name: "Ayomide", email: "mide@mail.eth" };

    extendedClient.user.create({
      data: newUser,
    });

    console.log("New user created!!!");
  };
  const createNotion = () => {
    const newNotion = {
      title: "Test Notion",
      content: "example",
      icon: "🚀",
      description: "",
      coverPhoto: "",
      type: "default",
      authorId: 1,
    };

    extendedClient.notionFile.create({
      data: newNotion,
    });

    console.log("New notion created!!!");
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <DraggableNotionList />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
