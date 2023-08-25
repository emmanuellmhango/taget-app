import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { styles } from "../../assets/css/styles";
import { AntDesign } from "@expo/vector-icons";

const ForgotFinal = () => {
  return (
    <View style={styles.loginWrapper}>
      <ImageBackground
        source={require("../../assets/appimages/bg.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.loginForm}>
          <Image
            source={require("../../assets/appimages/logo.png")}
            style={styles.homeLogo}
          />
          <View style={styles.socialLogin}>
            <View style={styles.SignupTextContainer}>
              <Text style={styles.descriptionText}>Email Sent!</Text>
            </View>
            <AntDesign name="checkcircle" style={styles.emailSent} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ForgotFinal;
