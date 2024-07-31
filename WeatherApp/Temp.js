import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import axios from 'axios';

export default function Weather({ userNx, userNy }) {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const today = new Date();
    let dateString = null;
    let timeString = null;
    let dataList = [];

    for (let i = 23; i >= 2; i -= 3) {
      if (today.getHours() >= i) {
        timeString = i;
        break;
      }
    }

    if (timeString == null) {
      timeString = "2300";
      dateString = `${today.getFullYear()}0${today.getMonth() + 1}${today.getDate() - 1}`;
    } else {
      timeString = timeString > 10 ? `${timeString}00` : `0${timeString}00`;
      dateString = `${today.getFullYear()}0${today.getMonth() + 1}${today.getDate()}`;
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
        let tmp = null;
        let tmn = null;
        let tmx = null;
        let fcstDate = null;
        let fcstTime = null;

        items.forEach(item => {
          const category = item.category;
          const fcstValue = item.fcstValue;

          if (category === 'TMP') {
            tmp = fcstValue;
          } else if (category === 'TMN') {
            tmn = fcstValue;
          } else if (category === 'TMX') {
            tmx = fcstValue;
          }

          if (items.indexOf(item) % 12 === 11) {
            fcstDate = item.fcstDate;
            fcstTime = item.fcstTime;

            var sampleData = {
              "id": `${fcstDate}${fcstTime}`,
              "fcstDate": fcstDate,
              "fcstTime": fcstTime,
              "tmp": tmp,
              "tmn": tmn,
              "tmx": tmx
            };

            dataList.push(sampleData);
          }
        });

        // 디버깅용
        dataList.forEach(data => {
          console.log(`Date: ${data.fcstDate}, Time: ${data.fcstTime}, TMP: ${data.tmp}, TMN: ${data.tmn}, TMX: ${data.tmx}`);
        });

        setDataList(dataList);

      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={{ width: 200, borderColor: "#0000ff", borderWidth: 1, padding: 10, marginVertical: 10 }}>
        <Text>날짜: {item.fcstDate}</Text>
        <Text>시간: {item.fcstTime}</Text>
        <Text>온도: {item.tmp}℃</Text>
        <Text>최저기온: {item.tmn}℃</Text>
        <Text>최고기온: {item.tmx}℃</Text>
      </View>
    );
  }

  return (
    <View style={{ width: 300, borderColor: "#ff0000", borderWidth: 1, alignItems: 'center' }}>
      <FlatList
        data={dataList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
