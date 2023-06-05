import React from 'react';
import { View, StyleSheet, Image, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from './Card';
import Header from '../components/Header';
import Field from './Field';
import InfoIcon from './InfoIcon';
import Celender from './Celender';
import NoticeBar from './NoticeBar';

const Dashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Card />
        </View>
        <View>
          <NoticeBar />
        </View>
        <View>
          <InfoIcon />
        </View>
        <View>
          <Celender />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dashboard;
