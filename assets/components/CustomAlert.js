import React, { useState } from 'react';
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
  CloseIcon,
  Box,
  
} from 'native-base';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { TouchableOpacity } from 'react-native-gesture-handler';

function CustomAlert({ index, data, title }) {

  const getTextColor = (variant) => {
    switch (variant) {
      case 'left-accent':
      case 'top-accent':
      case 'subtle':
        return 'coolGray.800';
      case 'solid':
        return 'warmGray.50';
      default:
        return '';
    }
  };


  const [view, setView] = useState('Button Worked');


  return (
    <ScrollView mt={5}>
      <Stack
        space={3}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Center w="96%">
          <Alert w="100%" status="info">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack
                flexShrink={1}
                space={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <HStack space={2} flexShrink={1} alignItems="center">
                  <Alert.Icon />
                  <Text
                    fontSize="md"
                    fontWeight="medium"
                    _dark={{
                      color: 'coolGray.800',
                    }}
                  >
                    {title}
                  </Text>
                </HStack>
                <IconButton
                  variant="unstyled"
                  _focus={{
                    borderWidth: 0,
                  }}
                  _pressed={view}
                  icon={<CloseIcon size="3" />}
                  _icon={{
                    color: 'coolGray.600',
                  }}
                />
              </HStack>
              <Box
                pl="6"
                _dark={{
                  _text: {
                    color: 'coolGray.600',
                  },
                }}
              >
                <HStack>
                  {data.final_cgpa && (
                    <Text fontSize="sm" mr={2}>
                      {'CGPA: ' + data.final_cgpa}
                    </Text>
                  )}

                  <Text>
                    GPA :
                    {data.exam_semester == 8
                      ? data.eight_gpa
                      : data.exam_semester == 7
                      ? data.seven_gpa
                      : data.exam_semester == 6
                      ? data.six_gpa
                      : data.exam_semester == 5
                      ? data.five_gpa
                      : data.exam_semester == 4
                      ? data.four_gpa
                      : data.exam_semester == 3
                      ? data.seven_gpa
                      : data.exam_semester == 2
                      ? data.second_gpa
                      : data.first_gpa == 1
                      ? data.first_gpa
                      : '0.00'}
                  </Text>
                </HStack>
              </Box>
            </VStack>
          </Alert>
        </Center>
      </Stack>
    </ScrollView>
  );
}

export default CustomAlert;
