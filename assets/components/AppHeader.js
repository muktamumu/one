import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  bgColor,
  colorFour,
  colorOne,
  colorThree,
  colorTwo,
} from '../../Global';
import { StatusBar } from 'expo-status-bar';

const AppHeader = () => {
  return (
    <View
      style={{
        backgroundColor: colorTwo,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: StatusBar.currentHeight,
      }}
    >
      <StatusBar hidden={true} />
      <Image source={require('../image/DU_APP_Logo.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colorTwo,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: StatusBar.currentHeight,
  },

  logo: { width: 90, height: 30 },
});
export default AppHeader;
