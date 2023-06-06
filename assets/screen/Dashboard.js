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
import LoginScreen from './LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonBox from '../components/ButtonBox';

const Stack = createNativeStackNavigator();

const Dashboard = (props) => {
  async function logout() {
    await AsyncStorage.removeItem('token');
    console.log('Logout Done');
  }

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        props.navigation.navigate('LoginScreen');
        console.log('Logout Done');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  });

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Card />
        </View>
        <View>
          <ButtonBox />
        </View>
        <TouchableOpacity onPress={() => logout()}>
          <Text>LogOut</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Dashboard;
