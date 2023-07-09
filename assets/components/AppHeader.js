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
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;

const AppHeader = () => {
  return (
    <View
      style={{
        paddingTop: statusBarHeight,
        backgroundColor: colorTwo,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}
    >
      <StatusBar hidden={false} />
      <Image source={require('../image/DU_APP_Logo.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: { width: 90, height: 30 },
});
export default AppHeader;
