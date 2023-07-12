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
import { Box, Button, Heading } from 'native-base';

const statusBarHeight = Constants.statusBarHeight;

const AppHeader = ({title}) => {
  return (
    <View
      style={{
        paddingTop: statusBarHeight,
        backgroundColor: colorTwo,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}
    >
      <StatusBar hidden={false} />

      {title && (
        <>
          <Heading
            color={'white'}
            padding={0}
            margin={0}
            backgroundColor={'white'}
          >
            {title}
          </Heading>
          <Heading color={'white'} padding={0} margin={0}>
            |
          </Heading>
        </>
      )}

      <Image source={require('../image/DU_APP_Logo.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: { width: 90, height: 30 },
});
export default AppHeader;
