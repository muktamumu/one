import React from 'react';
import {
  Box,
  HStack,
  VStack,
  Heading,
  Text,
  Avatar,

} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { colorTwo } from '../../Global';
import { Linking } from 'react-native';


const UserListItem = ({t} ) => {
  const handlePhonePress = () => {
    Linking.openURL(`sms:${t.mobile}`);
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${t.email}`);
  };

  return (
    <Box key={t.id} borderBottomColor={'gray.400'} borderBottomWidth={1}>
      <HStack m={1}>
        <Avatar
          m={2}
          bg={colorTwo}
          source={{
            uri: t.image_location + t.image || t.chobi,
          }}
        >
          {t.emp_name}
        </Avatar>
        <VStack m={2} w={'75%'}>
          <Heading size={'sm'}>{t.emp_name || t.name_en}</Heading>
          <Text>{t.designation || t.hall_name} </Text>
          <HStack alignSelf={'flex-end'} mt={'-5'}>
            {t.mobile && (
              <Ionicons
                name="chatbox-ellipses"
                onPress={(e) => handlePhonePress(t.mobile)}
                size={20}
                color={'black'}
              />
            )}

            {t.email && (
              <Ionicons
                name="mail"
                onPress={(e) => handleEmailPress(t.email)}
                size={20}
                color={'black'}
              />
            )}
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default UserListItem;
