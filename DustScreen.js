import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Dust from './Dust';

const DustScreen = () => {
  const [dustLevel, setDustLevel] = useState(null);

  const getDustImage = () => {
    if (dustLevel === null) {
      return null;
    } else if (dustLevel <= 30) {
      return <Image source={require('./resource/smile.png')} style={styles.icon} />;
    } else if (dustLevel <= 80) {
      return <Image source={require('./resource/meh.png')} style={styles.icon} />;
    } else {
      return <Image source={require('./resource/frown.png')} style={styles.icon} />;
    }
  };

  const getDustColor = () => {
    if (dustLevel === null) {
      return null;
    } else if (dustLevel <= 30) {
      return '#00FF7F';
    } else if (dustLevel <= 80) {
      return '#7FFFD4';
    } else {
      return '#FF1493';
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: getDustColor()}]}>
      <Text style={styles.title}>대기 질</Text>
      <Text style={styles.dustLevel}>미세먼지 농도: {dustLevel !== null ? dustLevel : '로딩 중...'}</Text>
      <View style={styles.iconContainer}>
        {getDustImage()}
      </View>
      <Dust onDustLevelFetched={setDustLevel} />
    </View>
  );
};

export default DustScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dustLevel: {
    fontSize: 18,
    marginBottom: 20,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },
});
