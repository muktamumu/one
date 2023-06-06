import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { bgColor } from '../../Global';
import Hall from './Hall';
const Stack = createNativeStackNavigator();

const ButtonBox = (props) => {
  return (
    <View style={styles.buttonBoxFull}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.eachButton}
          onPress={() => props.navigation.navigate('Profile')}
        >
          <Image
            source={require('../image/icon/proBlue.png')}
            style={styles.btnImg}
          />
          <Text style={styles.btnText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.eachButton}
          onPress={() => props.navigation.navigate('notice')}
        >
          <Image
            source={require('../image/icon/fromFill.png')}
            style={styles.btnImg}
          />
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.btnText}>
            Exam
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.eachButton}
          onPress={() => props.navigation.navigate('result')}
        >
          <Image
            source={require('../image/icon/result.png')}
            style={styles.btnImg}
          />
          <Text style={styles.btnText}>Result </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.eachButton}
          onPress={() => props.navigation.navigate('Hall')}
        >
          <Image
            source={require('../image/icon/hall3.png')}
            style={styles.btnImg}
          />
          <Text style={styles.btnText}>Hall Info</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.eachButton}
          onPress={() => props.navigation.navigate('result')}
        >
          <Image
            source={require('../image/icon/result.png')}
            style={styles.btnImg}
          />
          <Text style={styles.btnText}>Result </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.eachButton}
          onPress={() => props.navigation.navigate('Hall')}
        >
          <Image
            source={require('../image/icon/hall3.png')}
            style={styles.btnImg}
          />
          <Text style={styles.btnText}>Hall Info</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.eachButton}
          onPress={() => props.navigation.navigate('result')}
        >
          <Image
            source={require('../image/icon/result.png')}
            style={styles.btnImg}
          />
          <Text style={styles.btnText}>Result </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.eachButton}
          onPress={() => props.navigation.navigate('dept')}
        >
          <Image
            source={require('../image/icon/dept3.png')}
            style={styles.btnImg}
          />
          <Text style={styles.btnText}>Dept.Info </Text>
        </TouchableOpacity>
      </View>
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
  eachButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '45%',
    margin: 10,
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },

  row: {
    flexDirection: 'row',
  },
  container: {},

  buttonBoxFull: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 10,
    borderRadius: 10,
    backgroundColor: bgColor,
    alignItems: 'center',
  },
});

export default ButtonBox;
