import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function Weather({ userNx, userNy }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const today = new Date();
    let dateString = null;
    let timeString = null;

    for (let i = 23; i >= 2; i -= 3) {
      if (today.getHours() >= i) {
        timeString = i;
        break;
      }
    }

    if (timeString === null) {
      timeString = "2300";
      dateString = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${(today.getDate() - 1).toString().padStart(2, '0')}`;
    } else {
      timeString = timeString.toString().padStart(2, '0') + "00";
      dateString = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
    }

    const fetchWeather = async () => {
      try {
        const { data } = await axios.get(
          'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst', {
            params: {
              serviceKey: 'V7RZpsZ3goxaM6p+ssykmuOrRrMqJhojqMa6GbYCOaXRdFV1vKburVUVbFUdARFRk+T9TfQpIyigFlRblBFwDA==',
              numOfRows: 1000,
              pageNo: 1,
              dataType: 'JSON',
              base_date: dateString,
              base_time: timeString,
              nx: userNx,
              ny: userNy,
            },
          }
        );

        const items = data.response.body.items.item;
        let rainPerc = null;
        let rainType = null;
        let rainAmount = null;
        let skyType = null;
        let fcstDate = null;
        let fcstTime = null;

        items.forEach(item => {
          const category = item.category;
          const fcstValue = item.fcstValue;

          if (category === 'POP') {
            rainPerc = fcstValue;
          } else if (category === 'PTY') {
            rainType = fcstValue;
            switch (parseInt(rainType)) {
              case 0:
                rainType = "없음";
                break;
              case 1:
                rainType = "비";
                break;
              case 2:
                rainType = "비/눈";
                break;
              case 3:
                rainType = "눈";
                break;
              case 4:
                rainType = "소나기";
                break;
            }
          } else if (category === 'PCP') {
            rainAmount = fcstValue === "강수없음" ? "강수없음" : `${fcstValue}mm`;
          } else if (category === 'SKY') {
            skyType = fcstValue;
            const skyTypeCode = parseInt(skyType);

            if (skyTypeCode >= 0 && skyTypeCode <= 5) {
              skyType = "맑음";
            } else if (skyTypeCode >= 6 && skyTypeCode <= 8) {
              skyType = "구름많음";
            } else if (skyTypeCode >= 9 && skyTypeCode <= 10) {
              skyType = "흐림";
            }
          }

          if (fcstDate === null || fcstTime === null) {
            fcstDate = item.fcstDate;
            fcstTime = item.fcstTime;
          }
        });

        const formattedDate = `${fcstDate.substring(0, 4)}년 ${fcstDate.substring(4, 6)}월 ${fcstDate.substring(6, 8)}일`;
        const formattedTime = `${fcstTime.substring(0, 2)}:${fcstTime.substring(2, 4)}`;

        setWeather({
          fcstDate: formattedDate,
          fcstTime: formattedTime,
          rainPerc,
          rainType,
          rainAmount,
          skyType,
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [userNx, userNy]);

  if (!weather) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  const getWeatherColor = () => {
    if (weather.skyType === "맑음") {
      return '#87CEEB';
    } else if (weather.skyType === "구름많음") {
      return '#B0C4DE';
    } else {
      return '#778899';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: getWeatherColor() }]}>
      <Text style={styles.title}>날씨 정보</Text>
      <View style={styles.weatherInfo}>
        <Text style={styles.label}>날짜:</Text>
        <Text style={styles.value}>{weather.fcstDate}</Text>
      </View>
      <View style={styles.weatherInfo}>
        <Text style={styles.label}>시간:</Text>
        <Text style={styles.value}>{weather.fcstTime}</Text>
      </View>
      <View style={styles.weatherInfo}>
        <Text style={styles.label}>강수확률:</Text>
        <Text style={styles.value}>{weather.rainPerc}%</Text>
      </View>
      <View style={styles.weatherInfo}>
        <Text style={styles.label}>강수형태:</Text>
        <Text style={styles.value}>{weather.rainType}</Text>
      </View>
      <View style={styles.weatherInfo}>
        <Text style={styles.label}>강수량:</Text>
        <Text style={styles.value}>{weather.rainAmount}</Text>
      </View>
      <View style={styles.weatherInfo}>
        <Text style={styles.label}>하늘:</Text>
        <Text style={styles.value}>{weather.skyType}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  weatherInfo: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    fontSize: 16,
  },
});
