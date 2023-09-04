import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import * as Location from "expo-location";
import AllClaims from "../state/allclaims";
import { styles } from "../../assets/css/styles";
import { fetchClaims } from "../state/fetchClaims";
import { addClaims } from "../state/addClaimSlice";
import { addLocation } from "../state/locationSlice";
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

const DashBoard = ({ navigation }) => {
  const dispatch = useDispatch();
  const { claims } = useSelector((state) => state.claims);
  const [weeklyClaims, setWeeklyClaims] = useState("");
  const [topCategory, setTopCategory] = useState("");
  const [loading, setLoading] = useState(false);
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
      const locat = await getLocationAsync();
      dispatch(addLocation(locat));
    };

    getLocalLocation();
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchUserClaims = async () => {
      const response = await fetchClaims(user.id);
      if (response) {
        dispatch(addClaims(response));
      }
    };

    fetchUserClaims();
    setLoading(false);
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
      const categoryId = category.category_id;
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

  const viewOnMap = (event, claim) => {
    event.preventDefault();
    const {
      category: { name: categoryName },
      geocode,
      images,
      location,
    } = claim;

    navigation.navigate("ViewClaim", {
      categoryName,
      images,
      location,
      geocode,
    });
  };

  return (
    <View style={styles.dashboardWrapper}>
      <View style={styles.cameraIcon}>
        <View style={styles.cameraDiv}>
          <TouchableOpacity onPress={handleAddButtonPress}>
            <Ionicons name="camera" style={styles.cameraIconStyling} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.claimsContainer}>
        {claims?.length < 1 || claims === null || claims === undefined ? (
          <View style={styles.NoContentFlyItemContainer}>
            <Text style={styles.NoClaimsFlyText}>
              You havent made a Tag Yet
            </Text>
          </View>
        ) : (
          <View style={styles.modalFly}>
            <Text style={styles.flyTitle}>Recent Tags</Text>
            <View style={styles.flyContainer}>
              <ScrollView>
                {claims &&
                  claims.map((claim, index) => (
                    <TouchableOpacity
                      onPress={(event) => viewOnMap(event, claim)}
                      key={index}
                    >
                      <View style={styles.flyItemContainer}>
                        <View style={styles.flyItem}>
                          <View style={styles.flyImageContainer}>
                            {claim.category.name === "accident" && <Accident />}
                            {claim.category.name === "water" && <Water />}
                            {claim.category.name === "road" && <Road />}
                            {claim.category.name === "security" && <Security />}
                            {claim.category.name === "safety" && <Safety />}
                            {claim.category.name === "gas" && <Gas />}
                            {claim.category.name === "electricity" && (
                              <Electricity />
                            )}
                            {claim.category.name === "ecology" && <Ecology />}
                            {claim.category.name === "building" && <Building />}
                            {claim.category.name === "animals" && <Animals />}
                          </View>
                          <View style={styles.flyTextContainer}>
                            <Text style={styles.flyText}>
                              Claim_000{index + 1}
                            </Text>
                            <Text style={styles.flyTextClaims}>
                              Location: {claim.geocode}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </View>
          </View>
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
