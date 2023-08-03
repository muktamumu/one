import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Alert } from 'react-native';
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
  Center,
  Skeleton,
  IconButton,
  ChevronDownIcon,
  CloseIcon,
  ScrollView,
} from 'native-base';
import AppHeader from '../components/AppHeader';
import {
  bgColor,
  colorFour,
  colorOne,
  colorThree,
  serverURL,
} from '../../Global';
import CustomAlert from '../components/ResultPage/ResultList';

const ExamScreen = ({ navigation, setLoggedIn, props }) => {
  useEffect(() => {
    checkForData();
  }, []);

  const [reg, setReg] = useState();
  const stuReg = async () => (setReg(await AsyncStorage.getItem('reg')));
  const [allExam, setAllExam] = useState();

  async function checkForData() {
   const reg = await AsyncStorage.getItem('reg');
    if (reg) {
      const toSend = {
        reg: reg,
      };
      axios
        .get(serverURL + 'getFomFillupData', { params: toSend })
        .then((response) => {
          setAllExam(response.data.result);
          //console.log(response.data.result);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setReg(await AsyncStorage.getItem('reg'));
    }
  }

  return (
    <View>
      <AppHeader title="Form Fill-up" />
      <ScrollView>
        {allExam ? (
          allExam.map((exam) => (
            <>
              <CustomAlert key={exam.id} data={exam} title={exam.EXAM_NAME} />
            </>
          ))
        ) : (
          <VStack>
            <Box
              bg="white"
              p={2}
              borderRadius={8}
              borderWidth={1}
              borderColor="gray.300"
              mx={2}
              mb={2}
            >
              <Skeleton height={12} />
            </Box>
            <Box
              bg="white"
              p={2}
              borderRadius={8}
              borderWidth={1}
              borderColor="gray.300"
              mx={2}
              mb={2}
            >
              <Skeleton height={12} />
            </Box>
            <Box
              bg="white"
              p={2}
              borderRadius={8}
              borderWidth={1}
              borderColor="gray.300"
              mx={2}
              mb={2}
            >
              <Skeleton height={12} />
            </Box>
          </VStack>
        )}
      </ScrollView>
    </View>
  );
};

const styles = {};

export default ExamScreen;
