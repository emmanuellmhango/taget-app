import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fetchCategories, addCategory } from "../state/categorySlice";
import { styles } from "../../assets/css/styles";
import AllCategories from "./allCategories";

const About = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  useEffect(() => {
    const fetchCategoriesData = async () => {
      const categories = await fetchCategories();
      dispatch(addCategory(categories));
    };

    fetchCategoriesData();
  }, [dispatch]);

  useEffect(() => {}, [categories]);

  const handleAddButtonPress = () => {
    navigation.navigate("ClaimFirstComponent");
  };

  return (
    <View style={styles.aboutWrapper}>
      <View style={styles.cameraIcon}>
        <View style={styles.cameraDiv}>
          <TouchableOpacity onPress={handleAddButtonPress}>
            <Ionicons name="camera" style={styles.cameraIconStyling} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.aboutContainer}>
        {categories?.length < 1 || categories === null ? (
          <View style={styles.NoContentFlyItemContainer}>
            <Text style={styles.NoClaimsFlyText}>Categories loading ...</Text>
          </View>
        ) : (
          <AllCategories categories={categories} />
        )}
      </View>
      <View style={styles.aboutModal}>
        <View style={styles.aboutInstructionsView}>
          <Text style={styles.instruction}>
            To press a Tag, press the camera button
          </Text>
        </View>
      </View>
    </View>
  );
};

export default About;
