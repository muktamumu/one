import React from 'react';
import { Image, ImageBackground, Text, View, StyleSheet } from 'react-native';
import Field from './Field';

const Card = () => {
  const studentName = 'মুক্তা দত্ত';
  const session = '২০১৫-১৬';
  const hallName = 'রোকেয়া হল';
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
          <Text style={styles.textstyle}>সেশন {session}</Text>
          <Text style={styles.textstyle}>{hallName}</Text>
        </View>
        <Image source={require('../image/myimage.jpg')} style={styles.image} />
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
    shadowColor: 'black',
    shadowOffset: { width: 80, height: 2 },
    shadowOpacity: 50.9,
    shadowRadius: 9,
    elevation: 99,
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

export default Card;
