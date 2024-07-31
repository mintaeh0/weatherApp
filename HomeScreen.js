import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { mainStyles } from './Styles';
import InfoPopup from './InfoPopup'; // InfoPopup 컴포넌트 임포트

const HomeScreen = ({ navigation }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  return (
    <View style={mainStyles.content}>
      {/* 인포 버튼 */}
      <TouchableOpacity style={styles.infoButton} onPress={() => setPopupVisible(true)}>
        <MaterialCommunityIcons name="information-outline" size={30} color="black" />
      </TouchableOpacity>

      {/* 기온 */}
      <TouchableOpacity style={[mainStyles.section, styles.centered]} onPress={() => navigation.navigate('Temperature')}>
        <MaterialCommunityIcons name="thermometer" size={100} color="black" />
        <Text style={mainStyles.sectionText}>기온</Text>
      </TouchableOpacity>
      
      {/* 날씨 */}
      <TouchableOpacity style={[mainStyles.section, styles.centered]} onPress={() => navigation.navigate('Weather')}>
        <MaterialCommunityIcons name="weather-partly-cloudy" size={100} color="black" />
        <Text style={mainStyles.sectionText}>날씨</Text>
      </TouchableOpacity>
      
      {/* 대기질 */}
      <TouchableOpacity style={[mainStyles.section, styles.centered]} onPress={() => navigation.navigate('Dust')}>
        <MaterialCommunityIcons name="air-filter" size={100} color="black" />
        <Text style={mainStyles.sectionText}>대기질</Text>
      </TouchableOpacity>

      {/* 인포 팝업 */}
      <InfoPopup isVisible={isPopupVisible} onClose={() => setPopupVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  infoButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default HomeScreen;
