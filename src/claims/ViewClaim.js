import React, { useEffect } from "react";
import { Text, View, Image, TextInput } from "react-native";
import { styles } from "../../assets/css/styles";
import MapView, { Marker, Callout } from "react-native-maps";
import ViewTag from "./ViewTag";
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

const ViewClaim = ({ route }) => {
  const { categoryName, images, location, geocode } = route.params;
  const newLocation = JSON.parse(location);

  return (
    <View style={styles.aboutWrapper}>
      <View style={styles.exploreContainer}>
        <View style={styles.aboutInfoBody}>
          <MapView
            style={styles.mapStyle}
            region={{
              latitude: newLocation.latitude,
              longitude: newLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: newLocation.latitude,
                longitude: newLocation.longitude,
              }}
              title={categoryName}
            >
              <ViewTag
                imgOne={images[0]}
                imgTwo={images[0]}
                geoCode={geocode}
                category={categoryName}
              />
            </Marker>
          </MapView>
        </View>
      </View>
    </View>
  );
};

export default ViewClaim;
