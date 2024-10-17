import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { TouchableOpacity, View, Text, Button } from "react-native";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [camera, setCamera] = useState<CameraView | null>(null);

  // カメラパーミッションのロード中
  if (!permission) {
    return <View />;
  }

  // カメラ権限はまだ付与されていない
  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Button onPress={requestPermission} title="カメラの起動を許可" />
      </View>
    );
  }

  // 写真の撮影
  async function takePicture() {
    if (camera) {
      const photo = await camera.takePictureAsync();
      console.log(photo);
      // ここで撮影した写真を処理（保存、表示など）
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <CameraView style={{ flex: 1 }} ref={(ref) => setCamera(ref)}>
        <View
          style={{
            position: "absolute",
            bottom: 20,
            alignSelf: "center",
            backgroundColor: "blue",
          }}
        >
          <TouchableOpacity onPress={takePicture}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "white",
                padding: 10,
              }}
            >
              写真の撮影
            </Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}
