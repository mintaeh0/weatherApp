import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Temp from './Temp';

export default function TempDetailScreen({ route }) {
  const { nx, ny } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>기온 상세 정보</Text>
      <Temp userNx={nx} userNy={ny} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
});
