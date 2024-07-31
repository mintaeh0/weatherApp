import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Weather from './Weather';

export default function WeatherDetailScreen({ route }) {
  const { nx, ny } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>날씨 상세 정보</Text>
      <Weather userNx={nx} userNy={ny} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
