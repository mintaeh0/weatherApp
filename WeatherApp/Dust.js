import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';

export default function Dust() {
  // 미세먼지 정보를 저장할 상태
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
        // 한국환경공단 에어코리아 API 사용
        const { data } = await axios.get(
          'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty', {
            params: {
              // 서비스키 (김연재)
              serviceKey: 'V7RZpsZ3goxaM6p+ssykmuOrRrMqJhojqMa6GbYCOaXRdFV1vKburVUVbFUdARFRk+T9TfQpIyigFlRblBFwDA==',
              returnType: 'json',
              numOfRows: 100,
              pageNo: 1,
              stationName: '송파구',    // station_list.xls 에서 측정소명 쭉 긁은다음 거기서 선택하는걸로 만들어야함.
              dataTerm: 'DAILY',
              ver: '1.0',
            },
          }
        );

        // 받아온 데이터에서 미세먼지 관련 정보 추출
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
          console.log(`미세먼지: ${item.pm10Value}, 초미세먼지: ${item.pm25Value}`);
        } else {
          console.error('Error fetching air quality data:', responseHeader?.resultMsg || 'No data available');
        }
      } catch (error) {
        console.error('Error fetching air quality data:', error);
      }
    };
    // 컴포넌트가 마운트될 때 한 번만 미세먼지 정보를 가져옴
    fetchAirQuality();
  }, []);

  // 미세먼지 정보 출력
  return (
    <View>
      <Text>미세먼지: {airQuality.pm10} µg/m³</Text>    
      <Text>초미세먼지: {airQuality.pm25} µg/m³</Text>
    </View>
  );
}
