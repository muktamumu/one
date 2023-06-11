import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { primaryColor } from '../../Global';

const ProfileCard = () => {
  const [studentName, setstudentName] = useState('মুক্তা দত্ত');
  const [session, setsession] = useState('২০১৫-১৬');
  const [hallName, sethallName] = useState('রোকেয়া হল');
  const [photo, setPhoto] = useState(
    'https://v2.result.du.ac.bd/assets/student.png'
  );

  const checkLoginStatus = async () => {
    const name = JSON.parse(await AsyncStorage.getItem('name'));
    setsession(JSON.parse(await AsyncStorage.getItem('session')));
    sethallName(JSON.parse(await AsyncStorage.getItem('hall')));
    const ph = await AsyncStorage.getItem('photo');
    setstudentName(name);
    setPhoto(ph);
  };

  useEffect(() => {
    checkLoginStatus();
  });

  return (
    <View style={{ alignItems: 'center' }}>
      <ImageBackground
        source={require('../image/App-Card-Bg.png')}
        style={{
          width: 400,
          height: 200,
        }}
      />
      <View style={styles.fullBox}>
        <View style={styles.textBox}>
          <Text style={styles.textstyle}>{studentName}</Text>
          <Text style={styles.textstyle}>Session: {session}</Text>
          <Text style={styles.textstyle}>{hallName}</Text>
        </View>
        <Image source={{ uri: photo }} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textstyle: {
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: '500',
  },
  fullBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '15%',
    width: '90%',
  },
  textBox: {
    maxWidth: '80%',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 100,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
});

export default ProfileCard;
