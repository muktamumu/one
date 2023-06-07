import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  bgColor,
  colorFour,
  colorOne,
  colorThree,
  colorTwo,
} from '../../Global';
import { StatusBar } from 'expo-status-bar';

const Header = () => {
  return (
    <View style={styles.header}>
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
  },

  logo: { width: 90, height: 30 },
});
export default Header;
