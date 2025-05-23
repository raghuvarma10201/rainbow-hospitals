import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

interface CommonLoaderProps {
  isVisible: boolean;
}

const CommonLoader: React.FC<CommonLoaderProps> = ({ isVisible }) => {
  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommonLoader;
