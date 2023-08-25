import React from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from "../../assets/css/styles";

const AllCategories = (props) => {
  const { categories } = props;
  return (
    <View style={styles.categories}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryHeaderText}>Taget Analytics</Text>
      </View>
      <ScrollView>
        {categories.map((category) => (
          <View key={category.id} style={styles.categoryItem}>
            <View style={styles.categoryItemContent}>
              <View style={styles.categoryIcon}>
                <Text>Icon</Text>
              </View>
              <View style={styles.categoryNameContent}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.claimsInProgress}>Tags in progress</Text>
                <Text style={styles.claimsInProgressCounter}>1,000</Text>
              </View>
              <View style={styles.categoryStats}>
                <Text style={styles.claimsInProgress}>Tags in progress</Text>
                <Text style={styles.claimsInProgressCounter}>2000</Text>
                <Text style={styles.claimsInProgress}>Number of Tags</Text>
                <Text style={styles.claimsInProgressCounter}>2000</Text>
              </View>
              <View style={styles.categoryArrow}>
                <Text> {">"} </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AllCategories;
