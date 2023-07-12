import React from 'react';
import { ImageBackground, View, Image } from 'react-native';
import { Text, HStack, VStack } from 'native-base';

const ProfileCard = ({ photo, name, dept, hall }) => {
  return (
    <ImageBackground source={require('../../image/App-Card-Bg.png')} style={{height:150}}>
      <View
        style={{
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          alignItems: 'center',
          padding: 36,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  maxWidth: '80%',
                  marginLeft:'10%'
        }}
      >
        <HStack>
          <Image
            style={{ width: 80, height: 80, borderRadius: 5 }}
            source={{ uri: photo }}
            my={2}
          />
          <VStack ml={5}>
            <Text
              color={'muted.50'}
              fontSize="xl"
              shadow={2}
              fontWeight="bold"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {name}
            </Text>
            <Text
              color={'muted.200'}
              fontSize="md"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {dept}
            </Text>
            <Text
              color={'muted.200'}
              fontSize="md"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {hall}
            </Text>
          </VStack>
        </HStack>
      </View>
    </ImageBackground>
  );
};

export default ProfileCard;
