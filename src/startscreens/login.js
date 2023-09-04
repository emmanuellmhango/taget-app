import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import { addUser } from "../state/userSlice";
import { styles } from "../../assets/css/styles";
import URL, { GENERAL_URL } from "../state/url";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const handleLogin = async (values) => {
    setLoading(true);
    const data = {
      email: values.email,
      password: values.password,
    };
    try {
      //   const res = [];
      //   for (let i = 23; i < 28; i++) {
      //     const response = await axios.delete(`${GENERAL_URL}/claims/${i}`);
      //     res.push(response.data.success);
      //   }
      //   const success = res.every((item) => item === true);
      //   setLoading(false);
      //   if (success) {
      //     alert("YES");
      //   } else {
      //     alert("NO");
      //   }
      // } catch (error) {
      //   setLoading(false);
      //   console.log(error);
      // }
      const response = await axios.get(
        URL,
        { params: data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { success, user } = response.data;
      if (success) {
        setLoading(false);
        dispatch(addUser(user));
        navigation.navigate("Dashboard");
      } else {
        setLoading(false);
        alert("Oops!. Seems the provided details are wrong. Please try again");
      }
    } catch (error) {
      setLoading(false);
      alert("Seems there is network problem. Please try again");
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
          <ScrollView
            contentContainerStyle={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height,
            }}
          >
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Email is required";
                }
                if (!values.password) {
                  errors.password = "Password is required";
                }
                return errors;
              }}
              onSubmit={handleLogin}
            >
              {(props) => (
                <View style={styles.loginFormScroll}>
                  <Image
                    source={require("../../assets/appimages/logo.png")}
                    style={styles.logo}
                  />
                  <View style={styles.socialLogin}>
                    <Text style={styles.socialText}>Sign in with Social</Text>
                    <TouchableOpacity style={styles.socialBtn}>
                      <FontAwesome5
                        name="facebook"
                        style={styles.facebookIcon}
                      />
                    </TouchableOpacity>
                  </View>
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
                  <View style={styles.forgotDiv}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Forgot")}
                    >
                      <Text style={styles.loginForgotPassword}>
                        Forgot Password ?
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={props.handleSubmit}
                  >
                    <Text style={styles.getStartedText}>Sign in</Text>
                  </TouchableOpacity>

                  <View style={styles.bottomDiv}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Signup")}
                    >
                      <Text style={styles.signupTextFromLogin}>
                        New Account? Sign up
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </ScrollView>
          <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
        </ImageBackground>
      </View>
    </DismissKeyboard>
  );
};

export default Login;
