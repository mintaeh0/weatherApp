import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeStack from './HomeStack';
import TempStack from './TempStack';
import WeatherStack from './WeatherStack';
import DustStack from './DustStack';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Temperature') {
              iconName = 'thermometer';
            } else if (route.name === 'Weather') {
              iconName = 'cloud';
            } else if (route.name === 'Dust') {
              iconName = 'partly-sunny';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeStack} 
          options={{ tabBarLabel: '홈' }} // 아래 네비게이션의 라벨 설정
        />
        <Tab.Screen name="Temperature" component={TempStack} options={{ tabBarLabel: '기온' }} />
        <Tab.Screen name="Weather" component={WeatherStack} options={{ tabBarLabel: '날씨' }} />
        <Tab.Screen name="Dust" component={DustStack} options={{ tabBarLabel: '대기질' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
