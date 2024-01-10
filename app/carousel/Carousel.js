import React, { useEffect, useState } from "react";
import { ScrollView, View, Dimensions } from "react-native";

import MainCover from "./MainCover";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Login from "./Login";

const { width } = Dimensions.get("window"); // 화면 너비를 얻음

export default function Carousel() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={{ width, height: "100%" }}>
        <MainCover />
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      <View style={{ width, height: "100%" }}>
        <Page1 />
      </View>
      <View style={{ width, height: "100%" }}>
        <Page2 />
      </View>
      <View style={{ width, height: "100%" }}>
        <Page3 />
      </View>
      <View style={{ width, height: "100%" }}>
        <Login />
      </View>
    </ScrollView>
  );
}
