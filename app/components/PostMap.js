import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { URI } from "../recoil/constant";
import { postRefreshState } from "../recoil/recoil";
import { useRecoilValue } from "recoil";
import axios from "axios";

export default function PostMap() {
  const [markers, setMarkers] = useState([]);
  const locations = [
    {
      latitude: 37.78825,
      longitude: -122.4324,
      title: "Location 1",
      description: "Description 1",
    },
    {
      latitude: 37.78925,
      longitude: -122.4314,
      title: "Location 2",
      description: "Description 2",
    },
  ];

  const [data, setData] = useState(null);

  const postRefresh = useRecoilValue(postRefreshState);

  useEffect(() => {
    const getPostList = async () => {
      try {
        const response = await axios.get(URI + "/post");
        const posts = response.data;

        const newMarkers = posts.map((post) => ({
          latitude: parseFloat(post.latitude),
          longitude: parseFloat(post.longitude),
          title: post.title,
          description: post.location,
        }));

        const calculateTimeLeft = (due) => {
          const dueDate = new Date(due);
          const now = new Date();

          const difference = dueDate - now;

          // 일 시간, 분, 초 및 밀리초 단위로 변환
          const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hoursLeft = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutesLeft = Math.floor((difference / (1000 * 60)) % 60);

          return { days: daysLeft, hours: hoursLeft, minutes: minutesLeft };
        };

        const dueTime = calculateTimeLeft(due);
        const isLessThanOneHour =
          dueTime.days === 0 && dueTime.hours === 0 && dueTime.minutes > 0;

        const truncatedContent =
          content.length > 100 ? content.substring(0, 100) + "..." : content;

        if (dueTime.days <= 0 && dueTime.hours <= 0 && dueTime.minutes <= 0) {
          return;
        }

        setMarkers(newMarkers);
      } catch (error) {
        console.error(error);
      }
    };

    getPostList();
  }, [postRefresh]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 36.3711,
          longitude: 127.3622,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
      {/* <Text style={styles.text}>This is some text below the map</Text> */}
      {/* <Button title="Press Me" onPress={() => console.log("Button Pressed")} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1, // You can adjust this to change the map's size
  },
  text: {
    textAlign: "center",
    padding: 10,
  },
});
