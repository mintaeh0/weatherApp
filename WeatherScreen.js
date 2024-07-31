import React from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const data = [
  { id: '1', name: '서울특별시', nx: 60, ny: 127 },
  { id: '2', name: '경기도', nx: 61, ny: 120 },
  { id: '3', name: '강원도', nx: 73, ny: 134 },
  { id: '4', name: '충청북도', nx: 69, ny: 106 },
  { id: '5', name: '충청남도', nx: 51, ny: 112 },
  { id: '6', name: '전라북도', nx: 63, ny: 89 },
  { id: '7', name: '전라남도', nx: 58, ny: 74 },
  { id: '8', name: '경상북도', nx: 89, ny: 90 },
  { id: '9', name: '경상남도', nx: 91, ny: 77 },
  { id: '10', name: '제주특별자치도', nx: 53, ny: 38 },
];

const renderItem = ({ item, navigation }) => (
  <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('WeatherDetail', { nx: item.nx, ny: item.ny })}>
    <Text style={styles.itemText}>{item.name}</Text>
  </TouchableOpacity>
);

export default function WeatherScreen({ navigation }) {
  return (
    <FlatList
      data={data}
      renderItem={(props) => renderItem({ ...props, navigation })}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      ListHeaderComponent={() => (
        <Text style={styles.title}>지역 선택</Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center', // Center items vertically
    alignItems: 'center', // Center items horizontally
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000080',
  },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
