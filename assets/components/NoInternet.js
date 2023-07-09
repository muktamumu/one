import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const NoInternet = (props) => {
  return (
    <View style={styles.buttonBoxFull}>
      <Image source={require('../image/noNet.gif')} style={styles.btnImg} />
    </View>
  );
};

const styles = StyleSheet.create({
  btnImg: {
    width: 40,
    height: 40,
    margin: 5,
  },
  btnText: {
    fontSize: 20,
    overflow: 'visible',
    color: 'black',
    fontWeight: 600,
  },
});

export default NoInternet;
