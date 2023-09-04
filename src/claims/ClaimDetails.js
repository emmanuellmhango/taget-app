import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import { styles } from "../../assets/css/styles";
import { GENERAL_URL } from "../state/url";
import { reverseGeoCode } from "../state/reverseGeoCode";
//import SVG Icons
import Accident from "../../assets/icons/Accident.svg";
import Animals from "../../assets/icons/Animals.svg";
import Building from "../../assets/icons/Building.svg";
import Ecology from "../../assets/icons/Ecology.svg";
import Electricity from "../../assets/icons/Electricity.svg";
import Gas from "../../assets/icons/Gas.svg";
import Road from "../../assets/icons/Road.svg";
import Water from "../../assets/icons/Water.svg";
import Safety from "../../assets/icons/Safety.svg";
import Security from "../../assets/icons/Security.svg";

const ClaimDetails = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const { img1, img2 } = route.params;
  const { categories } = useSelector((state) => state.categories);
  const { location } = useSelector((state) => state.location);
  const { user } = useSelector((state) => state.user);
  const [comment, setComment] = useState(null);
  const [geoCode, setGeoCode] = useState(null);

  useEffect(() => {
    const getGeoLocale = async () => {
      const gecode = await reverseGeoCode(location.coords);
      setGeoCode(gecode);
    };

    getGeoLocale();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    const images = [img1, img2];
    const imgName = Math.random().toString(36).substring(2, 20);
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
    const newLocation = JSON.stringify({ latitude, longitude });
    formData.append("claim[comment]", comment);
    formData.append("claim[location]", newLocation);
    formData.append("claim[forwarded]", "false");
    formData.append("claim[user_id]", user.id);
    formData.append("claim[category_id]", selectedCategory[1]);
    formData.append("claim[geocode]", geoCode);

    for (let i = 0; i < images.length; i++) {
      formData.append("claim[images][]", {
        name: imgName,
        type: "image/jpeg",
        uri: images[i],
      });
    }

    if (
      geoCode === null ||
      comment === null ||
      selectedCategory.length === 0 ||
      location === null
    ) {
      setLoading(false);
      return alert("Please fill all the fields");
    }

    try {
      const response = await axios.post(`${GENERAL_URL}/claims`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { success } = response.data;
      setLoading(false);

      if (success) {
        navigation.navigate("ClaimSubmitted", {
          imgOne: img1,
          imgTwo: img2,
          location: location,
          geoCode: geoCode,
          comment: comment,
          category: selectedCategory[0],
        });
      } else {
        console.log("error");
      }
    } catch (error) {
      setLoading(false);
      alert(
        "Seems there is Internet problem, make sure that your internet is on"
      );
      console.log(error);
    }
  };

  const getDateToday = () => {
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.cameraWrapper}>
      <ScrollView>
        <View style={styles.claimContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: img1 }}
              style={styles.imgClaim1}
              alt="Claim Image 1"
            />
            <Image
              source={{ uri: img2 }}
              style={styles.imgClaim2}
              alt="Claim Image"
            />
            <View style={styles.claimImagesDate}>
              <Text style={styles.dateText}>{getDateToday()}</Text>
            </View>
          </View>
          <View style={styles.claimLocation}>
            <Text style={styles.locationText}>{geoCode}</Text>
          </View>
          <View style={styles.claimLocation}>
            <Text style={styles.formText}>Category</Text>
          </View>
          <View style={styles.claimIcons}>
            {categories &&
              categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() =>
                    setSelectedCategory([category.name, category.id])
                  }
                >
                  <View style={styles.claimCategoryIcon}>
                    <View
                      style={
                        selectedCategory[0] === category.name
                          ? styles.claimCategoryIconSelected
                          : null
                      }
                    >
                      {category.name === "accident" && <Accident />}
                      {category.name === "water" && <Water />}
                      {category.name === "road" && <Road />}
                      {category.name === "security" && <Security />}
                      {category.name === "safety" && <Safety />}
                      {category.name === "gas" && <Gas />}
                      {category.name === "electricity" && <Electricity />}
                      {category.name === "ecology" && <Ecology />}
                      {category.name === "building" && <Building />}
                      {category.name === "animals" && <Animals />}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
          <View style={styles.claimLocation}>
            <Text style={styles.formText}>Comment</Text>
          </View>
          <View style={styles.comment}>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={styles.commentInput}
              placeholder="Write your comment"
              onChangeText={(comment) => setComment(comment)}
            />
          </View>
          <View style={styles.submitBtn}>
            <TouchableOpacity
              style={styles.claimSubmitBtn}
              onPress={handleSubmit}
            >
              <Text style={styles.loginTestButton}>Submit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.blankDiv}></View>
        </View>
        <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
      </ScrollView>
    </View>
  );
};

export default ClaimDetails;
