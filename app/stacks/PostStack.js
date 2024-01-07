import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PostScreen from "../screens/PostScreen";
import PostCreate from "../components/PostCreate";
import MyPostDetail from "../components/MyPostDetail";

const Stack = createNativeStackNavigator();

export default function PostStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Stack.Screen name="PostHome" component={PostScreen} />
      <Stack.Screen name="PostCreate" component={PostCreate} />
      <Stack.Screen name="MyPostDetail" component={MyPostDetail} />
    </Stack.Navigator>
  );
}
