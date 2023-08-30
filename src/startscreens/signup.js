import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Formik } from "formik";
import axios from "axios";
import { FontAwesome5 } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import { styles } from "../../assets/css/styles";
import URL from "../state/url";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Signup = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleSignup = async (values) => {
    setLoading(true);
    const data = {
      user: {
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        dob: "--",
      },
    };
    try {
      const response = await axios.post(URL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.code === 2200) {
        setLoading(false);
        alert("You have successfully signed up. Please login to continue.");
        navigation.navigate("Login");
      } else {
        setLoading(false);
        alert("Oops!. Seems there was an error. Please try again");
      }
    } catch (error) {
      setLoading(false);
      alert(
        "Seems the email is already registered. use another email or login"
      );
    }
  };

  return (
    <DismissKeyboard>
      <View style={styles.loginWrapper}>
        <ImageBackground
          source={require("../../assets/appimages/bg.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              phone: "",
            }}
            validate={(values) => {
              const errors = {};

              if (!values.name) {
                errors.name = "Name is required";
              }
              return errors;
            }}
            onSubmit={handleSignup}
          >
            {(props) => (
              <View style={styles.loginForm}>
                <Image
                  style={styles.SignupLogo}
                  source={require("../../assets/appimages/logo.png")}
                />
                <View style={styles.socialLogin}>
                  <Text style={styles.socialText}>Sign up with Social</Text>
                  <TouchableOpacity style={styles.socialBtn}>
                    <FontAwesome5 name="facebook" style={styles.facebookIcon} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.textLeft}>Name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={props.handleChange("name")}
                  value={props.values.name}
                  onBlur={props.handleBlur("name")}
                />
                <Text style={styles.textLeft}>Email</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="email-address"
                  onChangeText={props.handleChange("email")}
                  value={props.values.email}
                />
                <Text style={styles.textLeft}>Password</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  onChangeText={props.handleChange("password")}
                  value={props.values.password}
                />
                <Text style={styles.textLeft}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="phone-pad"
                  onChangeText={props.handleChange("phone")}
                  value={props.values.phone}
                />

                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={props.handleSubmit}
                >
                  <Text style={styles.getStartedText}>Sign Up</Text>
                </TouchableOpacity>

                <View style={styles.bottomDiv}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.signupTextFromLogin}>
                      Already have an account? Sign in
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
          <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
        </ImageBackground>
      </View>
    </DismissKeyboard>
  );
};

export default Signup;
