import { useRecoilValue } from "recoil";
import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { userState } from "./recoil/recoil";
import PostStack from "./stacks/PostStack";
import ChatStack from "./stacks/ChatStack";
import ProfileStack from "./stacks/ProfileStack";

import Carousel from "./carousel/Carousel";

const Tab = createBottomTabNavigator();

export default function Routing() {
  //TODO : Loading
  const user = useRecoilValue(userState);

  if (!user) {
    return <Carousel />;
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Post"
            component={PostStack}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <MaterialCommunityIcons name="post" size={size} color={color} />
              ),
              tabBarLabel: "Post",
            }}
          />
          <Tab.Screen
            name="Chat"
            component={ChatStack}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Entypo name="chat" size={size} color={color} />
              ),
              tabBarLabel: "Chat",
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileStack}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Fontisto name="person" size={size} color={color} />
              ),
              tabBarLabel: "Profile",
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
