import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Screens
import HomeScreen from './screens/HomeScreen';
import ScanScreen from './screens/ScanScreen';
import LearnScreen from './screens/LearnScreen';
import CategoryDetailScreen from './screens/CategoryDetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import ItemResultScreen from './screens/ItemResultScreen';

const Tab = createBottomTabNavigator();
const LearnStack = createNativeStackNavigator();
const ScanStack = createNativeStackNavigator();

// Learn stack navigator
function LearnStackScreen() {
  return (
    <LearnStack.Navigator>
      <LearnStack.Screen 
        name="LearnCategories" 
        component={LearnScreen} 
        options={{ title: 'Waste Categories' }}
      />
      <LearnStack.Screen 
        name="CategoryDetail" 
        component={CategoryDetailScreen}
        options={({ route }) => ({ title: route.params.category.name })}
      />
    </LearnStack.Navigator>
  );
}

// Scan stack navigator
function ScanStackScreen() {
  return (
    <ScanStack.Navigator>
      <ScanStack.Screen 
        name="ScanCamera" 
        component={ScanScreen} 
        options={{ headerShown: false }}
      />
      <ScanStack.Screen 
        name="ItemResult" 
        component={ItemResultScreen}
        options={{ title: 'Scan Result' }}
      />
    </ScanStack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Scan') {
                iconName = focused ? 'scan' : 'scan-outline';
              } else if (route.name === 'Learn') {
                iconName = focused ? 'book' : 'book-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#22c55e',
            tabBarInactiveTintColor: 'gray',
            headerShown: route.name === 'Home' ? true : false,
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'LitterAlly' }} />
          <Tab.Screen name="Scan" component={ScanStackScreen} />
          <Tab.Screen name="Learn" component={LearnStackScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}