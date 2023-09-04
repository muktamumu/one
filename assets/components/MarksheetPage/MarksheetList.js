import React, { useState } from 'react';
import axios from 'axios';
import {
  ScrollView,
  Stack,
  Text,
  Alert,
  VStack,
  HStack,
  Divider,
  Center,
  IconButton,
  Box,
  Heading,
  Skeleton,
  Badge,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import {
  colorFour,
  colorOne,
  colorThree,
  colorTwo,
  nodejs,
  serverURL,
} from '../../../Global';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

function MarksheetList({ setLoggedIn, index, data, title, icon }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loadingCourse, setLoadingCourse] = useState(false);
  const [message, setmessage] = useState(false);

  const toggleExpansion = async (reg, roll, examID) => {
    setLoadingCourse(true);
    if ((reg, roll, examID)) {
      const toSend = {
        reg: reg,
        roll: roll,
        exam_id: examID,
      };
      axios
        .get(nodejs + 'marksheet/getMarksheetDetails', { params: toSend })
        .then((response) => {
          if (response.data.status === 200) {
            setCourses(response.data.result);
            setmessage(response.data.message || 'Something Went Wrong (ML63).');
            setLoadingCourse(false);
          } else if (response.data.status === 201) {
            setLoadingCourse(false);
            setmessage(response.data.message || 'Something Went Wrong (ML63).');
          } else if (response.data.status === 500) {
            setmessage(response.data.message);
            setCourses('No Information Found.');
            console.error(response.data.message || 'Something Went Wrong (ML63).');
          } else if (response.data.status === 501) {
            setLoadingCourse(false);
            setLoggedIn(false);
          } else {
            console.error(response.data.message || 'Something Went Wrong (ML63).');
          }
        })
        .catch((error) => {
          console.error('Something Went Wrong (ML63).');
        });
    } else {
      console.error('Something Went Wrong (ML66).');
    }
    setIsExpanded(!isExpanded);
  };

  const [courses, setCourses] = useState();

  return (
    <Stack
      space={3}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      paddingY={1}
      key={index}
    >
      <Center w="96%" key={index}>
        <Alert w="100%" bg={'white'} color={colorFour} key={index}>
          <VStack space={2} flexShrink={1} w="100%" key={index}>
            <HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack space={2} flexShrink={1} alignItems="center" key={index}>
                <Ionicons
                  name={icon ? icon : 'checkmark-circle'}
                  size={24}
                  color={colorTwo}
                />
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  color={colorTwo}
                  _dark={{
                    color: 'coolGray.800',
                  }}
                  onPress={() =>
                    toggleExpansion(data.reg_num, data.exam_roll, data.exam_id)
                  }
                >
                  {title}
                </Text>
              </HStack>
              <IconButton
                variant="unstyled"
                color={colorTwo}
                _focus={{
                  borderWidth: 0,
                }}
                _icon={{
                  as: isExpanded ? Ionicons : Ionicons,
                  name: isExpanded ? 'chevron-up' : 'chevron-down',
                  size: 18,
                  color: 'coolGray.600',
                }}
                onPress={() =>
                  toggleExpansion(data.reg_num, data.exam_roll, data.exam_id)
                }
              />
            </HStack>
            {isExpanded && (
              <Box>
                {courses && (
                  <HStack margin={'auto'} w="100%">
                    <Text
                      fontSize="sm"
                      mr={2}
                      color={colorTwo}
                      w={'40%'}
                      textAlign={'right'}
                    >
                      {courses}{' '}
                    </Text>
                    <Text w={'10%'} textAlign={'center'}>
                      |
                    </Text>
                    <Text
                      fontSize="sm"
                      mr={2}
                      color={colorTwo}
                      w={'40%'}
                      textAlign={'left'}
                    >
                      {'  Memo: ' + data.result_memo}
                    </Text>
                  </HStack>
                )}

                <Divider my={2} />
                {message && (
                  <Badge
                    colorScheme="info"
                    alignSelf="center"
                    variant={'subtle'}
                  >
                    {message}
                  </Badge>
                )}
              </Box>
            )}
          </VStack>
        </Alert>
      </Center>
    </Stack>
  );
}

export default MarksheetList;
