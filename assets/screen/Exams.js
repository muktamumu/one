import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Button,
} from 'react-native';
import Card from '../components/Card';
import { bgColor } from '../../Global';
import Header from '../components/Header';

const Exams = ({ navigation, setLoggedIn, props }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header />
        <View>
          <Card />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Exams;
