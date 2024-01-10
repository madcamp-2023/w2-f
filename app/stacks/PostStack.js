import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PostScreen from "../screens/PostScreen";
import PostCreate from "../components/PostCreate";
import MyPostDetail from "../components/MyPostDetail";
import PostDetail from "../components/PostDetail";
import PostEdit from "../components/PostEdit";
import SelectLocation from "../components/SelectLocation";
import ChatScreen from "../screens/ChatScreen";
import ChatDetail from "../components/ChatDetail";

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
      <Stack.Screen name="PostDetail" component={PostDetail} />
      <Stack.Screen name="PostEdit" component={PostEdit} />
      <Stack.Screen name="SelectLocation" component={SelectLocation} />
      <Stack.Screen name="ChatHome" component={ChatScreen} />
      <Stack.Screen name="ChatDetail" component={ChatDetail} />
    </Stack.Navigator>
  );
}
