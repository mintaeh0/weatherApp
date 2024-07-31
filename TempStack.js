import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TempScreen from './TempScreen';
import TempDetailScreen from './TempDetailScreen';

const Stack = createNativeStackNavigator();

export default function TempStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Temp" component={TempScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TempDetail" component={TempDetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
