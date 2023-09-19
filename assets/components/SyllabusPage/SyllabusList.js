import React, { useState } from 'react';
import axios from 'axios';
import {
  Stack,
  Text,
  Alert,
  VStack,
  HStack,
  Divider,
  Center,
  IconButton,
  Box,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { colorOne, colorTwo, serverURL } from '../../../Global';
import { Linking } from 'react-native';
function SyllabusList({ setLoggedIn, index, data, title, icon }) {
	
	const handlePress = async (downloadUrl) => {
    const supported = await Linking.canOpenURL(downloadUrl);

    if (supported) {
      await Linking.openURL(downloadUrl);
    } else {
      console.error('Something Went Wrong!');
    }
  };

  return (
    <Stack
      space={3}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      paddingY={1}
      key={index + 1}
    >
      <Center w="96%" key={index + 2}>
        <Alert w="100%" bg={'white'} color={colorOne} key={index + 3}>
          <VStack space={2} flexShrink={1} w="100%" key={index + 4}>
            <HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between"
              key={index}
            >
              <HStack
                space={2}
                flexShrink={1}
                alignItems="center"
                key={index}
                onPress={() => handlePress(data.link)}
              >
                <Ionicons
                  name={icon ? icon : 'checkmark-circle'}
                  size={24}
                  color={colorOne}
                />

                <Text
                  fontSize="md"
                  fontWeight="medium"
                  color={colorOne}
                  _dark={{
                    color: 'coolGray.800',
								  }}
								 mt={-7}
                >
                  {title + ' (' + data.year + ')'}
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </Alert>
      </Center>
    </Stack>
  );
}

export default SyllabusList;
