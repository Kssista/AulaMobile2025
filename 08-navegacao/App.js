import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingScreen from "./screens/SettingScreen";
import { Ionicons } from '@expo/vector-icons'


const Tab = createBottomTabNavigator()


export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>

          <Tab.Screen
            name='HomeScreen'
            component={HomeScreen}
            options={{
              title: 'Tela de início',
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: 'grey'
              },
              tabBarIcon: (color, size) => <Ionicons name='home' color={color} size={size} />
            }}
          />

          <Tab.Screen
            name='ProfileScreen'
            component={ProfileScreen}
            options={{
              title: 'Perfil',
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: 'grey'
              },
              tabBarIcon: (color, size) => <Ionicons name='person' color={color} size={size} />
            }} />

          <Tab.Screen
            name='SettingScreen'
            component={SettingScreen}
            options={{
              title: 'Configurações',
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: 'grey'
              },
              tabBarIcon: (color, size) => <Ionicons name='cog' color={color} size={size} />
            }} />

        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}