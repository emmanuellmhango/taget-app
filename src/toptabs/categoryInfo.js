import React from "react";
import { View, Text } from "react-native";
import { styles } from "../../assets/css/styles";
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

const CategoryInfo = ({ route }) => {
  const { category } = route.params;
  return (
    <View style={styles.aboutWrapper}>
      <View style={styles.aboutInfoContainer}>
        <View style={styles.aboutInfoHeader}>
          {category.name === "accident" && <Accident width={70} height={70} />}
          {category.name === "water" && <Water width={70} height={70} />}
          {category.name === "road" && <Road width={70} height={70} />}
          {category.name === "security" && <Security width={70} height={70} />}
          {category.name === "safety" && <Safety width={70} height={70} />}
          {category.name === "gas" && <Gas width={70} height={70} />}
          {category.name === "electricity" && (
            <Electricity width={70} height={70} />
          )}
          {category.name === "ecology" && <Ecology width={70} height={70} />}
          {category.name === "building" && <Building width={70} height={70} />}
          {category.name === "animals" && <Animals width={70} height={70} />}
          {/* Category Name */}
          <Text style={styles.infoHeaderTitle}>
            {category.name.charAt(0).toUpperCase() +
              category.name.slice(1).toLowerCase()}
          </Text>
        </View>
        <View style={styles.aboutInfoBodyLine}>
          <Text>{/**/}</Text>
        </View>
        <View style={styles.aboutInfoBody}>
          <Text style={styles.infoBodyText}>{category.description}</Text>
        </View>
      </View>
      <View style={styles.aboutModal}>
        <View style={styles.aboutInstructionsView}>
          <Text style={styles.instruction}>
            When making a claim, include a landmark
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CategoryInfo;
