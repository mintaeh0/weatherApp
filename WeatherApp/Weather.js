import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import axios from 'axios';

export default function Weather({userNx, userNy}) {
  // const [weather, setWeather] = useState({ fcstDate: null, fcstTime: null, rainPerc: null, rainType: null, rainAmount: null, skyType: null });
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const today = new Date();
    var dateString = null;
    var timeString = null;
    var dataList = [];

    for (let i = 23; i >= 2; i-=3) {
      if(today.getHours() >= i) {
          timeString = i;
          break;
      }
    }

    if(timeString == null) {
      timeString = "2300";
      dateString = `${today.getFullYear()}0${today.getMonth()+1}${today.getDate()-1}`;
    } else {

      if(timeString > 10) {
        timeString = `${timeString}00`;
      } else {
        timeString = `0${timeString}00`;
      }

      dateString = `${today.getFullYear()}0${today.getMonth()+1}${today.getDate()}`;
    }


    console.log(dateString);
    console.log(timeString);
    console.log(userNx);
    console.log(userNy);

    const fetchWeather = async () => {
      try {
        const { data } = await axios.get(
          'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst', {
            params: {
              serviceKey: 'V7RZpsZ3goxaM6p+ssykmuOrRrMqJhojqMa6GbYCOaXRdFV1vKburVUVbFUdARFRk+T9TfQpIyigFlRblBFwDA==',
              numOfRows: 1000,
              pageNo: 1,
              dataType: 'JSON',
              base_date: dateString, // 당일날짜 불러오기
              base_time: timeString, // 사용자 시간 불러오기
              nx: userNx, // 사용자
              ny: userNy, // 사용자
            },
          }
        );

        // data = data.replace('\ufeff', '');

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
            rainAmount = fcstValue;
          } else if (category === 'SKY') {
            
            skyType = fcstValue;

            var skyTypeCode = parseInt(skyType);

            if(skyTypeCode >= 0 && skyTypeCode <= 5) {
                skyType = "맑음";
            }else if(skyTypeCode >= 6 && skyTypeCode <= 8) {
                skyType = "구름많음";
            }else if(skyTypeCode >= 9 && skyTypeCode <= 10) {
                skyType = "흐림";
            }
          }

          if(items.indexOf(item) % 12 == 11) {

            fcstDate = item.fcstDate;
            fcstTime = item.fcstTime;

            var sampleData = {
              "id": `${fcstDate}${fcstTime}`,
              "fcstDate" : fcstDate,
              "fcstTime" : fcstTime,
              "rainPerc" : rainPerc,
              "rainType" : rainType,
              "rainAmount" : rainAmount,
              "skyType" : skyType
            };
  
            dataList.push(sampleData);
          }
        });

        // const category = items.category;
        // const fcstValue = items.fcstValue;
        // if (category === 'POP') {
        //     rainPerc = fcstValue;
        //   } else if (category === 'PTY') {
        //     rainType = fcstValue;
        //   } else if (category === 'PCP') {
        //     rainAmount = fcstValue;
        //   } else if (category === 'SKY') {
        //     skyType = fcstValue;
        //   }
        

        console.log(rainPerc);

        // 디버깅용
        dataList.forEach(data => {
          console.log(`Date: ${data.fcstDate}, Time: ${data.fcstTime}, Rain Probability: ${data.rainPerc}%, Rain Type: ${data.rainType}, Rain Amount: ${data.rainAmount}mm, Sky: ${data.skyType}`);
        });
        
        // setWeather({ fcstDate, fcstTime, rainPerc, rainType, rainAmount, skyType });
        setDataList(dataList);
      

      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  console.log(dataList);

  renderItem  = ({item}) => {
    return (<View style={{width: 200, borderColor: "#0000ff", borderWidth: 1, padding: 10, marginVertical: 10}}>
      <Text>날짜: {item.fcstDate}</Text>
      <Text>시간: {item.fcstTime}</Text>
      <Text>강수확률: {item.rainPerc}%</Text>
      <Text>강수형태: {item.rainType}</Text>
      <Text>강수량: {item.rainAmount}mm</Text>
      <Text>하늘: {item.skyType}</Text>
    </View>)
  }

  return (
    <View style={{width: 300, borderColor: "#ff0000", borderWidth: 1, alignItems: 'center'}}>
      <FlatList 
        data={dataList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id} />
    </View>
    // <SafeAreaView>
    //   <Text>날짜: {weather.fcstDate}</Text>
    //   <Text>시간: {weather.fcstTime}</Text>
    //   <Text>강수확률: {weather.rainPerc}%</Text>
    //   <Text>강수형태: {weather.rainType}</Text>
    //   <Text>강수량: {weather.rainAmount}mm</Text>
    //   <Text>하늘: {weather.skyType}</Text>
    //   <View style={{height: 10}}></View>
    //   <Text>날짜: {weather.fcstDate}</Text>
    //   <Text>시간: {weather.fcstTime}</Text>
    //   <Text>강수확률: {weather.rainPerc}%</Text>
    //   <Text>강수형태: {weather.rainType}</Text>
    //   <Text>강수량: {weather.rainAmount}mm</Text>
    //   <Text>하늘: {weather.skyType}</Text>
    // </SafeAreaView>
  );
}
