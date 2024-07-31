import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function Temp({ userNx, userNy }) {
  const [hourlyTemps, setHourlyTemps] = useState([]);
  const [weeklyTemps, setWeeklyTemps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const getBaseTime = (hour) => {
          if (hour >= 23) return "2300";
          if (hour >= 20) return "2000";
          if (hour >= 17) return "1700";
          if (hour >= 14) return "1400";
          if (hour >= 11) return "1100";
          if (hour >= 8) return "0800";
          if (hour >= 5) return "0500";
          return "0200";
        };

        const timeString = getBaseTime(today.getHours());
        const dateString = today.getHours() < 2 ? 
          `${yesterday.getFullYear()}${('0' + (yesterday.getMonth() + 1)).slice(-2)}${('0' + yesterday.getDate()).slice(-2)}` : 
          `${today.getFullYear()}${('0' + (today.getMonth() + 1)).slice(-2)}${('0' + today.getDate()).slice(-2)}`;

        const { data } = await axios.get('http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst', {
          params: {
            serviceKey: 'V7RZpsZ3goxaM6p+ssykmuOrRrMqJhojqMa6GbYCOaXRdFV1vKburVUVbFUdARFRk+T9TfQpIyigFlRblBFwDA==',
            numOfRows: 2000,
            pageNo: 1,
            dataType: 'JSON',
            base_date: dateString,
            base_time: timeString,
            nx: userNx,
            ny: userNy,
          },
        });

        const items = data.response.body.items.item;
        const todayDateString = `${today.getFullYear()}${('0' + (today.getMonth() + 1)).slice(-2)}${('0' + today.getDate()).slice(-2)}`;
        const hourlyDataList = items
          .filter(item => item.category === 'TMP' && item.fcstDate === todayDateString)
          .map(item => ({
            time: item.fcstTime,
            temp: parseFloat(item.fcstValue),
          }));

        const tempDataList = [];
        for (let i = 0; i < 7; i++) {
          const futureDate = new Date(today);
          futureDate.setDate(today.getDate() + i);
          const futureDateString = `${futureDate.getFullYear()}${('0' + (futureDate.getMonth() + 1)).slice(-2)}${('0' + futureDate.getDate()).slice(-2)}`;
          const dayTempsArray = items
            .filter(item => item.category === 'TMP' && item.fcstDate === futureDateString)
            .map(item => parseFloat(item.fcstValue));

          if (dayTempsArray.length > 0) {
            tempDataList.push({
              date: futureDateString,
              tmn: Math.min(...dayTempsArray),
              tmx: Math.max(...dayTempsArray),
            });
          }
        }

        setHourlyTemps(hourlyDataList);
        setWeeklyTemps(tempDataList);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [userNx, userNy]);

  const renderHourlyItem = ({ item }) => {
    const formattedTime = `${item.time.substring(0, 2)}:${item.time.substring(2, 4)}`;
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{formattedTime}</Text>
        <Text style={styles.itemText}>온도: {item.temp}℃</Text>
      </View>
    );
  };

  const renderDailyItem = ({ item }) => {
    const formattedDate = `${item.date.substring(4, 6)}월 ${item.date.substring(6, 8)}일`;
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{formattedDate}</Text>
        <Text style={styles.itemText}>최저기온: {item.tmn}℃</Text>
        <Text style={styles.itemText}>최고기온: {item.tmx}℃</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>당일 1시간 간격 기온</Text>
      <FlatList
        data={hourlyTemps}
        renderItem={renderHourlyItem}
        keyExtractor={(item) => item.time}
        scrollEnabled={false}
        contentContainerStyle={styles.listContainer}
      />
      <Text style={styles.headerText}>일주일 최고/최저 기온</Text>
      <FlatList
        data={weeklyTemps}
        renderItem={renderDailyItem}
        keyExtractor={(item) => item.date}
        scrollEnabled={false}
        contentContainerStyle={styles.listContainer}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F0F8FF',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    alignItems: 'center',
  },
});
