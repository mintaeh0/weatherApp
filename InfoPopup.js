import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const InfoPopup = ({ isVisible, onClose }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} backdropOpacity={0.5}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>앱 이름: NativeWeather</Text>
        <Text style={styles.modalText}>조 이름: 11조</Text>
        <Text style={styles.modalText}>역할 분담: </Text>
        <Text style={styles.modalText}>김연재 - API 호출 컴포넌트 제작, 데이터 파싱</Text>
        <Text style={styles.modalText}>민태호 - API 호출 컴포넌트 제작, 데이터 파싱</Text>
        <Text style={styles.modalText}>신명재 - 탭 및 기능구현</Text>
        <Text style={styles.modalText}>이성현 - 탭 및 기능구현</Text>
        <Text style={styles.modalText}>임준혁 - 디자인, 화면 제작, 기능 통합</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>닫기</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = {
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
};

export default InfoPopup;