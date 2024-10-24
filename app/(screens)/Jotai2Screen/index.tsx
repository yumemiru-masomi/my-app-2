import React from "react";
import { View, Text, Button, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import { priceAtom } from "@/app/(screens)/JotaiScreen";

export default function Jatai2Screen() {
  const router = useRouter();

  const [price, setPrice] = useAtom(priceAtom);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>値:{price}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="+1"
          onPress={() => {
            setPrice(price + 1);
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
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
  buttonContainer: {
    marginTop: 10,
  },
});
