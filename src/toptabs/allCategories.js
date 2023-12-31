import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { styles } from "../../assets/css/styles";
import {
  fetchTagsByCategory,
  fetchTagsInProgress,
  fetchTagsFixed,
} from "../state/fetchTagsByCategory";
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

const AllCategories = (props) => {
  const navigation = useNavigation();
  const { categories } = props;
  const [tagsByAllCategories, setTagsByAllCategories] = useState({});
  const [tagCategoriesInProgress, setTagCategoriesInProgress] = useState({});
  const [tagCategoriesFixed, setTagCategoriesFixed] = useState({});

  useEffect(() => {
    const fetchClaimsByCategories = async () => {
      const response = await fetchTagsByCategory();
      if (response) {
        setTagsByAllCategories(response);
      }
    };

    fetchClaimsByCategories();
  }, []);

  useEffect(() => {
    const fetchClaimsInProgress = async () => {
      const response = await fetchTagsInProgress();
      if (response) {
        setTagCategoriesInProgress(response);
      }
    };

    fetchClaimsInProgress();
  }, []);

  useEffect(() => {
    const fetchClaimsFixed = async () => {
      const response = await fetchTagsFixed();
      if (response) {
        setTagCategoriesFixed(response);
      }
    };

    fetchClaimsFixed();
  }, []);

  const tagsInProgress = (id) => {
    if (tagCategoriesInProgress[id] !== undefined) {
      return tagCategoriesInProgress[id];
    } else {
      return 0;
    }
  };

  const allTags = (id) => {
    if (tagsByAllCategories[id] !== undefined) {
      return tagsByAllCategories[id];
    } else {
      return 0;
    }
  };

  const tagsFixed = (id) => {
    if (tagCategoriesFixed[id] !== undefined) {
      return tagCategoriesFixed[id];
    } else {
      return 0;
    }
  };

  const handlePress = (event, category) => {
    event.preventDefault();
    navigation.navigate("CategoryInfo", { category });
  };

  return (
    <View style={styles.categories}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryHeaderText}>Taget Analytics</Text>
      </View>
      <ScrollView>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={(event) => handlePress(event, category)}
          >
            <View style={styles.categoryItem}>
              <View style={styles.categoryItemContent}>
                <View style={styles.categoryIcon}>
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
                <View style={styles.categoryNameContent}>
                  <Text style={styles.categoryName}>
                    {category.name.charAt(0).toUpperCase() +
                      category.name.slice(1).toLowerCase()}
                  </Text>
                  <Text style={styles.claimsInProgress}>Tags in progress</Text>
                  <Text style={styles.claimsInProgressCounter}>
                    {tagsInProgress(category.id)}
                  </Text>
                </View>
                <View style={styles.categoryStats}>
                  <Text style={styles.claimsInProgress}>Number of Tags</Text>
                  <Text style={styles.claimsInProgressCounter}>
                    {allTags(category.id)}
                  </Text>
                  <Text style={styles.claimsInProgress}>Tags Fixed</Text>
                  <Text style={styles.claimsInProgressCounter}>
                    {tagsFixed(category.id)}
                  </Text>
                </View>
                <View style={styles.categoryArrow}>
                  <Entypo name="chevron-thin-right" style={styles.rightArrow} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default AllCategories;
