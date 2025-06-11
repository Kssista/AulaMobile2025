// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Telas principais
import DrawerRoutes from './src/routes/DrawerRoutes';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <DrawerRoutes />

    </NavigationContainer>
  );
}