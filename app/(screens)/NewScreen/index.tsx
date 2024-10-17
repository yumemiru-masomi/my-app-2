import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function NewScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is a New Screen!</Text>
      <Button
        title="Go Back"
        onPress={() => router.back()} // 戻るボタンの機能
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
