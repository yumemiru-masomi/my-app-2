import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

//リモートプッシュ通知作り途中
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    // アプリ全体でプッシュ通知トークンを取得
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

//リモートプッシュ通知作り途中
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    //①このアプリからのPush通知の許可を取得
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      //②初回起動時は許可ダイアログを出してユーザからPush通知の許可を取得
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      //許可がない場合
      alert("Failed to get push token for push notification!");
      return;
    }
    //③通知用トークンの取得
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    //実機以外の場合
    alert("Must use physical device for Push Notifications");
  }
  return token;
}
