import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';

const Dust = ({ onDustLevelFetched }) => {
  const [airQuality, setAirQuality] = useState({
    pm10: null,
    pm25: null,
    so2: null,
    co: null,
    o3: null,
    no2: null,
    khai: null,
  });

  useEffect(() => {
    const fetchAirQuality = async () => {
      try {
        const { data } = await axios.get(
          'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty', {
            params: {
              serviceKey: 'V7RZpsZ3goxaM6p+ssykmuOrRrMqJhojqMa6GbYCOaXRdFV1vKburVUVbFUdARFRk+T9TfQpIyigFlRblBFwDA==',
              returnType: 'json',
              numOfRows: 100,
              pageNo: 1,
              stationName: '송파구',
              dataTerm: 'DAILY',
              ver: '1.0',
            },
          }
        );

        const responseHeader = data?.response?.header;
        const responseBody = data?.response?.body;

        if (responseHeader?.resultCode === '00' && responseBody?.items?.length > 0) {
          const item = responseBody.items[0];
          setAirQuality({
            pm10: item.pm10Value,
            pm25: item.pm25Value,
            so2: item.so2Value,
            co: item.coValue,
            o3: item.o3Value,
            no2: item.no2Value,
            khai: item.khaiValue,
          });
          onDustLevelFetched(item.pm10Value); // 미세먼지 수치를 DustScreen으로 전달합니다.
          console.log(`미세먼지: ${item.pm10Value}, 초미세먼지: ${item.pm25Value}`);
        } else {
          console.error('Error fetching air quality data:', responseHeader?.resultMsg || 'No data available');
        }
      } catch (error) {
        console.error('Error fetching air quality data:', error);
      }
    };

    fetchAirQuality();
  }, [onDustLevelFetched]);

  return (
    <View>
      <Text>미세먼지: {airQuality.pm10} µg/m³</Text>    
      <Text>초미세먼지: {airQuality.pm25} µg/m³</Text>
    </View>
  );
};

export default Dust;
