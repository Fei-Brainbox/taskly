import { Stack, Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';


export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'darkblue' }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
            title: 'Shopping List', 
            tabBarIcon: () => (<Feather name="shopping-cart" size={24} color="black" />) }} />
      <Tabs.Screen 
        name="counter"
        options={{ 
            headerShown: false,
            title: 'Counter', 
            tabBarIcon: () => (<Feather name="hash" size={24} color="black" />) }} />
      <Tabs.Screen 
        name="idea" 
        options={{ 
            title: 'Idea', 
            tabBarIcon: () => (<Feather name="camera" size={24} color="black" />) }} />
    </Tabs>
  );
}