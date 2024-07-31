import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DustScreen from './DustScreen';

const Stack = createNativeStackNavigator();

export default function DustStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dust" component={DustScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
