import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Text, View } from "react-native";
import { styles } from "../../assets/css/styles";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

function Explore() {
  const [location, setLocation] = useState(null);
  const { claims } = useSelector((state) => state.claims);

  const getLocationAsync = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      const locationResult = await Location.getCurrentPositionAsync({});
      setLocation(locationResult);
    } else {
      alert(
        "Permission to access location was denied. Please allow it to proceed"
      );
    }
  };

  useEffect(() => {
    getLocationAsync();
  }, []);

  return (
    <View style={styles.aboutWrapper}>
      <View style={styles.exploreContainer}>
        <View style={styles.aboutInfoBody}>
          {location && (
            <MapView
              style={styles.mapStyle}
              region={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {claims?.length < 1 || claims === null || claims === undefined ? (
                <Marker
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                  title="You are here"
                  description="This is our current location. Other markers are for the saved tags you have provided"
                />
              ) : (
                claims.map((claim, id) => (
                  <Marker
                    coordinate={{
                      latitude: claim.location.latitude,
                      longitude: claim.location.longitude,
                    }}
                    key={id}
                    title="Saved Tag"
                    description="This is a saved tag you have provided"
                  />
                ))
              )}
            </MapView>
          )}
          {!location && (
            <View style={styles.locationLoading}>
              <Text style={styles.aboutInfoText}> map loading ... </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

export default Explore;
