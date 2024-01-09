import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const LocationModal = ({ locations }) => {
  return (
    <View style={styles.locationsContainer}>
      {locations.map((location, index) => {
        const backgroundColor = location.length >= 8 ? "blue" : "gray";
        const color = location.length >= 8 ? "white" : "black";
        return (
          <Pressable
            key={index}
            style={[styles.locationItem, { backgroundColor }]}
            //TODO : onPress
          >
            <Text style={(styles.locationText, { color })}>{location}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const SpecificLocation = ({ title, locations }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text>{title}</Text>
      <LocationModal locations={locations} />
    </View>
  );
};

export default function SelectLocation() {
  const specificLocations = new Array(5).fill(null).map((_, index) => ({
    title: `Location ${index + 1}`,
    locations: [
      "금산역 어쩌구 IT 빌딩 (N1)",
      "대충 인턴 느낌 (N2)",
      "쿠 (N7)",
      "아옥!!! (N13)",
      "금산역 어쩌구 IT 빌딩 (N1)",
      "대충 인턴 느낌 (N2)",
      "쿠 (N7)",
      "아옥!!! (N13)",
      "금산역 어쩌구 IT 빌딩 (N1)",
      "대충 인턴 느낌 (N2)",
      "쿠 (N7)",
      "아옥!!! (N13)",
      "금산역 어쩌구 IT 빌딩 (N1)",
      "대충 인턴 느낌 (N2)",
      "쿠 (N7)",
      "아옥!!! (N13)",
    ],
  }));

  return (
    <FlatList
      data={specificLocations}
      keyExtractor={(item, index) => `specific-location-${index}`}
      renderItem={({ item }) => (
        <SpecificLocation title={item.title} locations={item.locations} />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  locationsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
  },
  locationItem: {
    margin: 5,
    padding: 5,
    borderRadius: 20,
  },
});
