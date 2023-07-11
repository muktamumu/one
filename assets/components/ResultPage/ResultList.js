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
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { colorFour, colorOne, colorThree, colorTwo, serverURL } from '../../../Global';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

function ResultList({setLoggedIn, index, data, title }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loadingCourse, setLoadingCourse] = useState(false)


  const toggleExpansion = async (reg, roll, examID) => {
    setLoadingCourse(true)
    if (reg, roll, examID) {
      const toSend = {
        reg: reg,
        roll: roll,
        exam_id: examID,
      };
      axios
        .get(serverURL + 'getCourseForResult', { params: toSend })
        .then((response) => {
          if (response.data.status === 200)
          {
            setCourses(response.data.result);
            setLoadingCourse(false)
          } else if (response.data.status === 201) {
            setLoadingCourse(false);
            setCourses([
              {
                course_code: '',
                course_title: 'No Course Found.',
                course_credit: '',
                letter_grade: '',
                grade_point: '',
              },
            ]);
          } else if (response.data.status === 500) {
            setLoadingCourse(false);
            setCourses([
              {
                course_code: '',
                course_title: 'No Course Found.',
                course_credit: '',
                letter_grade: '',
                grade_point: '',
              },
            ]);
            Toast.error(response.data.message);
          } else if (response.data.status === 501) {
            setLoadingCourse(false);
            setCourses([
              {
                course_code: '',
                course_title: 'No Course Found.',
                course_credit: '',
                letter_grade: '',
                grade_point: '',
              },
            ]);
            setLoggedIn(false);
          } else {
            Toast.error(response.data.message);
          }
        })
        .catch((error) => {
          Toast.error('Something Went Wrong (C81).');
        });
    } else {
      Toast.error('Something Went Wrong (C84).');
    }
    setIsExpanded(!isExpanded);
  };

  const [courses, setCourses] = useState([
    { course_code: '', course_title: '', course_credit: '', letter_grade: '', grade_point: '' },
  ]);

  function formatDate(date) {
      const parts = date.split('-');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }

  return (
    <Stack
      space={3}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      paddingY={1}
      key={index}
    >
      <Center w="96%">
        <Alert w="100%" bg={'white'} color={colorFour} key={index}>
          <VStack space={2} flexShrink={1} w="100%">
            <HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack space={2} flexShrink={1} alignItems="center">
                <Ionicons name="checkmark-circle" size={24} color={colorTwo} />
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
                <HStack margin={'auto'} w="100%">
                  <Text
                    fontSize="sm"
                    mr={2}
                    color={colorTwo}
                    w={'40%'}
                    textAlign={'right'}
                  >
                    {'Held: ' + data.exam_held_in}
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

                <HStack margin={'auto'} w="100%">
                  {data.final_cgpa ? (
                    <>
                      <Heading
                        fontSize="sm"
                        mr={2}
                        color={colorTwo}
                        w={'40%'}
                        textAlign={'right'}
                      >
                        {'CGPA : ' + data.final_cgpa}
                      </Heading>
                      <Text w={'10%'} mr={'2%'} textAlign={'center'}>
                        |
                      </Text>
                      <Heading
                        fontSize="sm"
                        color={colorTwo}
                        w={'40%'}
                        textAlign={'left'}
                      >
                        GPA :{' '}
                        {data.exam_semester === '8'
                          ? data.eight_gpa
                          : data.exam_semester === '7'
                          ? data.seven_gpa
                          : data.exam_semester === '6'
                          ? data.six_gpa
                          : data.exam_semester === '5'
                          ? data.five_gpa
                          : data.exam_semester === '4'
                          ? data.four_gpa
                          : data.exam_semester === '3'
                          ? data.seven_gpa
                          : data.exam_semester === '2'
                          ? data.second_gpa
                          : data.first_gpa === '1'
                          ? data.first_gpa
                          : '0.00'}
                      </Heading>
                    </>
                  ) : (
                    <Heading
                      fontSize="sm"
                      color={colorTwo}
                      textAlign={'center'}
                      w={'100%'}
                    >
                      {data.exam_semester === '8'
                        ? ' GPA :' + data.eight_gpa
                        : data.exam_semester === '7'
                        ? ' GPA :' + data.seven_gpa
                        : data.exam_semester === '6'
                        ? ' GPA :' + data.six_gpa
                        : data.exam_semester === '5'
                        ? ' GPA :' + data.five_gpa
                        : data.exam_semester === '4'
                        ? ' GPA :' + data.four_gpa
                        : data.exam_semester === '3'
                        ? ' GPA :' + data.seven_gpa
                        : data.exam_semester === '2'
                        ? ' GPA :' + data.second_gpa
                        : data.first_gpa === '1'
                        ? ' GPA :' + data.first_gpa
                        : ''}
                    </Heading>
                  )}
                </HStack>
                <Divider my={2} />

                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                  <Box>
                    <HStack>
                      <Box
                        w={50}
                        bg="gray.100"
                        p={0}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Text color={colorTwo}>Code</Text>
                      </Box>
                      <Box
                        w={200}
                        bg="gray.100"
                        p={2}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Text color={colorTwo}>Title</Text>
                      </Box>
                      <Box
                        w={60}
                        bg="gray.100"
                        p={2}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Text color={colorTwo}>Credit</Text>
                      </Box>
                      <Box
                        w={60}
                        bg="gray.100"
                        p={2}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Text color={colorTwo}>Grade</Text>
                      </Box>
                      <Box
                        w={60}
                        bg="gray.100"
                        p={2}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Text color={colorTwo}>Point</Text>
                      </Box>
                    </HStack>
                    {loadingCourse && (
                      <HStack>
                        <Skeleton
                          w={50}
                          h={16}
                          startColor="gray.100"
                          endColor="gray.300"
                        />
                        <Skeleton
                          w={200}
                          h={16}
                          startColor="gray.100"
                          endColor="gray.300"
                        />
                        <Skeleton
                          w={60}
                          h={16}
                          startColor="gray.100"
                          endColor="gray.300"
                        />
                        <Skeleton
                          w={60}
                          h={16}
                          startColor="gray.100"
                          endColor="gray.300"
                        />
                        <Skeleton
                          w={60}
                          h={16}
                          startColor="gray.100"
                          endColor="gray.300"
                        />
                      </HStack>
                    )}
                    {courses &&
                      courses.map((c, i) => (
                        <>
                          <HStack key={i}>
                            <Box
                              w={50}
                              bg="white"
                              p={2}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Text color={colorTwo}>{c.course_code}</Text>
                            </Box>
                            <Box
                              w={200}
                              bg="white"
                              p={2}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Text color={colorTwo}>{c.course_title}</Text>
                            </Box>
                            <Box
                              w={60}
                              bg="white"
                              p={2}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Text color={colorTwo}>{c.course_credit}</Text>
                            </Box>
                            <Box
                              w={60}
                              bg="white"
                              p={2}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Text color={colorTwo}>{c.letter_grade}</Text>
                            </Box>
                            <Box
                              w={60}
                              bg="white"
                              p={2}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Text color={colorTwo}>{c.grade_point}</Text>
                            </Box>
                          </HStack>
                          <Divider my={0} />
                        </>
                      ))}
                  </Box>
                </ScrollView>
                {data.remarks && (
                  <Text
                    fontSize="sm"
                    ml={2}
                    color={'danger.900'}
                    textAlign={'left'}
                  >
                    {'Remarks: ' + data.remarks}
                  </Text>
                )}
                <Text fontSize="sm" ml={2} color={colorTwo} textAlign={'left'}>
                  Result Publication Date: {formatDate(data.result_pub_date)}
                </Text>
                {data.sup_date && (
                  <Text
                    fontSize="sm"
                    ml={2}
                    color={colorTwo}
                    textAlign={'left'}
                  >
                    Supplementary Result Publication Date:{' '}
                    {data.sup_date}
                  </Text>
                )}
              </Box>
            )}
          </VStack>
        </Alert>
      </Center>
    </Stack>
  );
}

export default ResultList;
