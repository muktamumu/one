import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import Card from '../components/Card';
import Celender from '../components/Celender';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Calendar } from 'react-native-calendars';
import ButtonBox from '../components/ButtonBox';

const Stack = createNativeStackNavigator();

const Dashboard = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Card />
        </View>
        <View>
          <ButtonBox />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Dashboard;
