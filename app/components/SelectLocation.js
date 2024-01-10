import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";

import { URI } from "../recoil/constant";
import { light_gray_color } from "../recoil/color";

import { useNavigation } from "@react-navigation/native";
import { useRecoilState } from "recoil";
import { selectedLocationState } from "../recoil/recoil";
import LoadingScreen from "../screens/LoadingScreen";

const LocationModal = ({ locations, selectedLocation, onSelectLocation }) => {
  return (
    <View style={styles.locationsContainer}>
      {locations.map((location, index) => {
        const isSelected = location === selectedLocation;
        const backgroundColor = isSelected ? "#5892FF" : light_gray_color;
        const color = isSelected ? "white" : "black";
        return (
          <Pressable
            key={index}
            style={[styles.locationItem]}
            onPress={() => onSelectLocation(isSelected ? null : location)}
          >
            <Text style={[styles.locationText, { backgroundColor }, { color }]}>
              {location}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const SpecificLocation = ({
  title,
  locations,
  selectedLocation,
  onSelectLocation,
}) => {
  return (
    <View style={{ flex: 1, padding: 15 }}>
      <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: 10 }}>
        {title}
      </Text>
      <LocationModal
        locations={locations}
        selectedLocation={selectedLocation}
        onSelectLocation={onSelectLocation}
      />
    </View>
  );
};

export default function SelectLocation({ route, navigation }) {
  const { setLocation } = route.params;

  const [isLoading, setIsLoading] = useState(true);

  const [labelE, setLabelE] = useState([]);
  const [labelN, setLabelN] = useState([]);
  const [labelW, setLabelW] = useState([]);

  // const [selectedLocation, setSelectedLocation] = useState(
  //   selectedLocationState
  // );

  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = await axios.get(URI + "/map");
        const data = response.data;

        const groupedData = data.reduce((acc, item) => {
          if (!acc[item.label]) {
            acc[item.label] = [];
          }
          acc[item.label].push(item);
          return acc;
        }, {});

        setLabelE(groupedData["E"] || []);
        setLabelN(groupedData["N"] || []);
        setLabelW(groupedData["W"] || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getLocations();
  }, []);

  const specificLocations = [
    {
      title: "KAIST 동측 (E)",
      locations: labelE.map((item) => `${item.name}(${item.location})`),
    },
    {
      title: "KAIST 북측 (N)",
      locations: labelN.map((item) => `${item.name}(${item.location})`),
    },
    {
      title: "KAIST 서측 (W)",
      locations: labelW.map((item) => `${item.name}(${item.location})`),
    },
  ];

  const handleLocationSelect = (newLocation) => {
    setLocation(newLocation); // 새로운 위치로 상태 업데이트
    navigation.goBack(); // 이전 화면으로 돌아감
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={specificLocations}
        keyExtractor={(item, index) => `specific-location-${index}`}
        style={{ marginTop: 30 }}
        renderItem={({ item }) => (
          <SpecificLocation
            title={item.title}
            locations={item.locations}
            selectedLocation={selectedLocation}
            onSelectLocation={setSelectedLocation}
          />
        )}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      <TouchableOpacity
        onPress={() => handleLocationSelect(selectedLocation)}
        style={{
          backgroundColor: "#5892FF",
          justifyContent: "center",
          height: 50,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>저장하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  locationsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // padding: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },

  locationItem: {
    marginTop: 5,
    padding: 5,
    borderRadius: 20,
    marginRight: 10,
  },

  locationText: {
    fontSize: 10,
    backgroundColor: light_gray_color,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
  },
});
