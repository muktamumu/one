import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import Field from './Field';

const Card = () => {
  return (
    <View>
      <ImageBackground
        source={require('../image/App-Card-Bg.png')}
        style={{
          width: 400,
          height: 200,
          position: 'absolute',
          opacity: 0.9,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: 20,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            marginTop: 50,
            marginLeft: 10,
            fontWeight: '500',
          }}
        >
          মুক্তা দত্ত{'\n'}
          সেশন ২০১৫-১৬ {'\n'}
          ইডেন মহিলা কলেজ{' '}
        </Text>
        <Image
          source={require('../image/myimage.jpg')}
          style={{
            width: 90,
            height: 90,
            borderRadius: 100,
            marginRight: 10,
            marginTop: 0,
          }}
        />
      </View>
    </View>
  );
};

export default Card;
