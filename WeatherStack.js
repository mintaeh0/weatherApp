import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WeatherScreen from './WeatherScreen';
import WeatherDetailScreen from './WeatherDetailScreen';

const Stack = createNativeStackNavigator();

export default function WeatherStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Weather" component={WeatherScreen} options={{ headerShown: false }} />
      <Stack.Screen name="WeatherDetail" component={WeatherDetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
