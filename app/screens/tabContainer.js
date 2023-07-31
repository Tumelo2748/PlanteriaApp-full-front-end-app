import React from 'react';
import { Tabs } from 'expo-router';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import PlantData from '../tabs/plantData';
import Information from '../tabs/information';
import CameraScreen from '../tabs/camera';
import Graphs from '../tabs/graphs';
import Settings from '../tabs/settings';

const TabContainer = () => {

  const Tab = createBottomTabNavigator(); 

  return (

    <Tab.Navigator
      screenOptions={{
      tabBarActiveTintColor: '#00cc66',
      tabBarActiveBackgroundColor: '#F5F5F5'
      }}
    >

      <Tab.Screen 
        component={PlantData}
        name="plantData"
        options={{ 
          headerShown: false,  
          tabBarIcon: ({ color, size }) => (
          <Ionicons name="leaf" size={size} color={color} />
          )
        }} 
      />

      <Tab.Screen 
        component={Information}
        name="information"
          options={{ 
          headerShown: false,  
          tabBarIcon: ({ color, size }) => (
          <Ionicons name="information-circle" size={size} color={color} />
          )
        }} 
      />

      <Tab.Screen 
        component={CameraScreen}
        name="camera"
          options={{ 
          headerShown: false,  
          tabBarIcon: ({ color, size }) => (
          <Ionicons name="scan-circle" size={size} color={color} />
          )
        }} 
      />

      <Tab.Screen 
        component={Graphs}
        name="Graphs"
          options={{ 
          headerShown: false,  
          tabBarIcon: ({ color, size }) => (
          <Ionicons name="analytics" size={size} color={color} />
          )
        }} 
      />

      <Tab.Screen 
        component={Settings}
        name="Settings"
          options={{ 
          headerShown: false,  
          tabBarIcon: ({ color, size }) => (
          <Ionicons name="settings" size={size} color={color} />
          )
        }} 
      />

    </Tab.Navigator>
  )
}

export default TabContainer;
