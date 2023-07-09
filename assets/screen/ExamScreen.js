import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native';
import axios from 'axios';
import {
  Container,
  Content,
  Heading,
  Icon,
  ListItem,
  VStack,
  Box,
  FlatList,
  HStack,
} from 'native-base';
import AppHeader from '../components/AppHeader';
import AccordionView from '../components/AccordionView';
import {
  bgColor,
  colorFour,
  colorOne,
  colorThree,
  serverURL,
} from '../../Global';

const ExamScreen = ({ navigation, setLoggedIn, props }) => {
  useEffect(() => {
    checkForData();
  }, []);

  const [reg, setReg] = useState();
  const [allExam, setAllExam] = useState();

  async function checkForData() {
    setReg(await AsyncStorage.getItem('reg'));
    if (reg) {
      const toSend = {
        reg: reg,
      };
      axios
        .get(serverURL + 'getFomFillupData', { params: toSend })
        .then((response) => {
          const data = response.data;
          setAllExam(response.data.result);
          console.log(response.data.result);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      checkForData();
    }
  }

  const exams = [
    {
      id: 1,
      title: 'First Semster Examinations 2020',
    },
    {
      id: 2,
      title: '2nd Semester Examination 2020',
    },
  ];
  return (
    <View>
      <AppHeader />
      <Heading p={4} bg={'muted.300'} color={colorOne}>
        Examinations
      </Heading>
      {allExam ? (
        allExam.map((exam) => (
          <Box key={exam.id}>
            <HStack
              p={4}
              m={2}
              borderWidth={1}
              borderColor={'muted.300'}
              borderRadius={5}
              key={exam.id}
              bg={bgColor}
            >
              <Heading size={'sm'}>Exam Title is comming </Heading>
            </HStack>
          </Box>
        ))
      ) : (
        <Text>Hi there</Text>
      )}
    </View>
  );
};

const styles = {};

export default ExamScreen;
