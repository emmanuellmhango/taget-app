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
} from "react-native";
import { Formik } from "formik";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import { styles } from "../../assets/css/styles";
import { GENERAL_URL } from "../state/url";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const ForgotPassword = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    const data = {
      email: values.email,
    };
    try {
      const response = await axios.get(`${GENERAL_URL}/forgot-password`, {
        params: data,
      });
      const { success, user } = response.data;
      if (success) {
        const { password, name } = user;
        if (password) {
          const sendEmail = await axios.get(
            `https://claimsappsupport.000webhostapp.com/api/v1/send_forgot_password_email.php?password=${password}&email=${data.email}&name=${name}`
          );
          if (sendEmail.data.success) {
            setLoading(false);
            navigation.navigate("ForgotFinal");
          } else {
            setLoading(false);
            alert("Oops!. There was an error. Please try again");
          }
        } else {
          setLoading(false);
          alert("Oops!. Seems the email is not registered. Please try again");
        }
      } else {
        setLoading(false);
        alert("Oops!. Seems the email is not registered. Please try again");
      }
    } catch (error) {
      setLoading(false);
      alert("Seems there is a problem, please contact the support office");
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
            initialValues={{ email: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Email is required";
              }
              return errors;
            }}
            onSubmit={handleLogin}
          >
            {(props) => (
              <View style={styles.loginForm}>
                <Image
                  source={require("../../assets/appimages/logo.png")}
                  style={styles.homeLogo}
                />
                <View style={styles.SignupTextContainer}>
                  <Text style={styles.descriptionText}>
                    Please enter your email to reset your password
                  </Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onChangeText={props.handleChange("email")}
                  value={props.values.email}
                />
                <TouchableOpacity
                  style={styles.loginBtn}
                  onPress={props.handleSubmit}
                >
                  <Text style={styles.getStartedText}>Send</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <View style={styles.bottomSpace}>
            <Text style={styles.bottomText}>{/* */}</Text>
          </View>
          <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
        </ImageBackground>
      </View>
    </DismissKeyboard>
  );
};

export default ForgotPassword;
