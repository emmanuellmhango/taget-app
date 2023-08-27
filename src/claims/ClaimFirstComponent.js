import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { styles } from "../../assets/css/styles";
import { Camera } from "expo-camera";

const ClaimFirstComponent = ({ navigation }) => {
  const [firstImage, setFirstImage] = useState(null);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setFirstImage(data.uri);
    }
  };

  const goNext = (event) => {
    event.preventDefault();
    navigation.navigate("ClaimSecondComponent", { firstImage });
  };

  return (
    <View style={styles.cameraWrapper}>
      <View style={styles.cameraContainer}>
        {firstImage ? (
          <Image source={{ uri: firstImage }} style={{ flex: 1 }} />
        ) : (
          <Camera
            style={styles.cameraDisplay}
            ratio="16:9"
            ref={(ref) => setCamera(ref)}
          />
        )}
      </View>
      <View style={styles.controlsContainer}>
        <View style={styles.controls}>
          <View style={styles.imgA}>
            <Text style={styles.controlText}>
              {firstImage ? (
                <FontAwesome name="check" size={24} color="#fff" />
              ) : (
                "A "
              )}
            </Text>
          </View>
          <View style={styles.imgA}>
            <Text style={styles.controlText}>B</Text>
          </View>
          <TouchableOpacity onPress={() => takePicture()}>
            <View style={styles.camera}>
              <FontAwesome name="camera" size={32} color="#fff" />
            </View>
          </TouchableOpacity>
          {firstImage ? (
            <TouchableOpacity onPress={(event) => goNext(event)}>
              <View style={styles.nextAction}>
                <Text style={styles.controlText}>NEXT</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.nextActionFaint}>
              <Text style={styles.controlTextFaint}>NEXT</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ClaimFirstComponent;
