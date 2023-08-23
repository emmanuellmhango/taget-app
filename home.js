import React from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from "./assets/css/styles";

const Home = ({ navigation }) => {
  const goToLogin = () => {
    navigation.navigate("Login");
  };

  const goTosignUp = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.homeContainer}>
      <ImageBackground
        source={require("./assets/appimages/bg.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.startWrapper}>
          <Image
            source={require("./assets/appimages/logo.png")}
            style={styles.homeLogo}
          />
          <Text style={styles.homeText}>Tag it. Fix it</Text>
          <TouchableOpacity style={styles.loginBtn} onPress={() => goToLogin()}>
            <Text style={styles.getStartedText}> Sign in </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => goTosignUp()}
          >
            <Text style={styles.getStartedText}> Sign up </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <StatusBar style="light" />
    </View>
  );
};

export default Home;
