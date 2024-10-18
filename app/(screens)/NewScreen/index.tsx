import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";

export default function NewScreen() {
  const router = useRouter();

  useEffect(() => {
    // プッシュ通知の権限をリクエストする
    registerForPushNotificationsAsync();
    scheduleDailyNotification();
  }, []);

  async function scheduleDailyNotification() {
    await Notifications.cancelAllScheduledNotificationsAsync(); // 既存の通知をクリア
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "おはようございます！",
        body: "毎日11時に送られる通知です。",
        sound: true,
      },
      trigger: {
        hour: 11, // 8時
        minute: 0, // 00分
        repeats: true, // 毎日繰り返す
      },
    });
  }

  async function triggerLocalNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "ローカル通知",
        body: "これはテストのローカル通知です！",
        sound: true, // サウンドを再生する
      },
      trigger: null, // 即座に通知を発生させる
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is a New Screen!</Text>
      <Button title="ローカル通知を送信" onPress={triggerLocalNotification} />
      <Button title="Go Back" onPress={() => router.back()} />
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

// プッシュ通知の権限をリクエストする関数
async function registerForPushNotificationsAsync() {
  // Androidでは、通知を送信するために通知チャンネルを設定する必要がある
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  // 現在のプッシュ通知の権限を確認
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  // 権限がまだ与えられていない場合、権限をリクエストする
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  // 最終的な権限の状態をチェック
  if (finalStatus !== "granted") {
    alert("プッシュ通知の権限がありません");
    return;
  }
}
