import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import * as Location from "expo-location";
import AllClaims from "../state/allclaims";
import { styles } from "../../assets/css/styles";
import { addLocation } from "../state/locationSlice";
import { fetchClaims } from "../state/fetchClaims";
import { addClaims } from "../state/addClaimSlice";

const DashBoard = ({ navigation }) => {
  const dispatch = useDispatch();
  const { claims } = useSelector((state) => state.claims);
  const [weeklyClaims, setWeeklyClaims] = useState("");
  const [topCategory, setTopCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const { location } = useSelector((state) => state.location);
  const { user } = useSelector((state) => state.user);

  const getLocationAsync = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      const locationResult = await Location.getCurrentPositionAsync({});
      return locationResult;
    } else {
      alert(
        "Permission to access location was denied. Please allow it to proceed"
      );
    }
  };

  useEffect(() => {
    setLoading(true);
    const getLocalLocation = async () => {
      const location = await getLocationAsync();
      dispatch(addLocation(location));
    };

    getLocalLocation();
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchUserClaims = async () => {
      const response = await fetchClaims(user.id);
      dispatch(addClaims(response));
    };

    fetchUserClaims();
  }, []);

  useEffect(() => {
    if (claims) {
      findMostOccurringCategory(claims);
    } else {
      setWeeklyClaims(`Weekly Claims: 0`);
      setTopCategory(`Top Category: --`);
    }
  }, [claims]);

  const handleAddButtonPress = () => {
    navigation.navigate("ClaimFirstComponent");
  };

  const findMostOccurringCategory = (data) => {
    const categoryCounts = data.reduce((counts, item) => {
      const { category } = item;
      const categoryId = category.category_id; // Use category_id as the key
      counts[categoryId] = (counts[categoryId] || 0) + 1;
      return counts;
    }, {});

    let maxCount = 0;
    let mostOccurringCategoryId = null;

    for (const categoryId in categoryCounts) {
      if (categoryCounts[categoryId] > maxCount) {
        maxCount = categoryCounts[categoryId];
        mostOccurringCategoryId = categoryId;
      }
    }

    const mostOccurringCategory = data.find(
      (item) => item.category.category_id === mostOccurringCategoryId
    );

    setWeeklyClaims(`Weekly Claims: ${data.length}`);
    setTopCategory(
      `Top Category: ${
        mostOccurringCategory
          ? mostOccurringCategory.category.category_id
          : "--"
      }`
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.cameraIcon}>
        <View style={styles.cameraDiv}>
          <TouchableOpacity onPress={handleAddButtonPress}>
            <Ionicons name="camera" style={styles.cameraIconStyling} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.claimsContainer}>
        {claims?.length < 1 || claims === null ? (
          <View style={styles.NoContentFlyItemContainer}>
            <Text style={styles.NoClaimsFlyText}>
              You havent made a Tag Yet
            </Text>
          </View>
        ) : (
          <AllClaims claims={claims} />
        )}
      </View>
      <View style={styles.modal}>
        <View style={styles.analytics}>
          <MaterialCommunityIcons
            name="google-analytics"
            size={28}
            style={styles.analyticsIcon}
          />
          <TextInput style={styles.inputModal} value={weeklyClaims} />
        </View>
        <View style={styles.analytics}>
          <Ionicons
            name="ios-grid-outline"
            size={28}
            style={styles.analyticsIcon}
          />
          <TextInput style={styles.inputModal} value={topCategory} />
        </View>
        <View style={styles.topCategory}>
          <View style={styles.instructionsViewContainer}>
            <View style={styles.instructionsView}>
              <Text style={styles.instruction}>
                To press a Tag, press the camera button
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
    </View>
  );
};

export default DashBoard;
