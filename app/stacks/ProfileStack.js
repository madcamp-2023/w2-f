import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileScreen from "../screens/ProfileScreen";
import ProfileEdit from "../components/ProfileEdit";
import MyPostDetail from "../components/MyPostDetail";
import LocationModal from "../components/LocationModal";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileHome" component={ProfileScreen} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      <Stack.Screen name="MyPostDetail" component={MyPostDetail} />
      <Stack.Screen name="SelectLocation" component={LocationModal} />
    </Stack.Navigator>
  );
}
