import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type Props = {
  message?: string;
};

const NoData = ({ message = 'No data available.' }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/no-data-available.png')} // Replace with your own asset
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});
