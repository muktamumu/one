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
import AccordionView from '../components/AccordionView';
import {
  bgColor,
  colorFour,
  colorOne,
  colorThree,
  serverURL,
} from '../../Global';
import AlertList from '../components/ResultPage/ResultList';
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
      <AppHeader title="Form Fill-up"/>
      <ScrollView>
        {allExam ? (
          allExam.map((exam) => (
            <>
                <CustomAlert key={exam.id} data={exam} title={exam.EXAM_NAME} />
            </>
          ))
        ) : (
          <Center w="100%">
            <HStack
              w="90%"
              maxW="400"
              borderWidth="1"
              space={8}
              rounded="md"
              _dark={{
                borderColor: 'coolGray.500',
              }}
              _light={{
                borderColor: 'coolGray.200',
              }}
              p="4"
            >
              <Skeleton
                flex="1"
                h="50"
                rounded="md"
                startColor="coolGray.100"
              />
              <VStack flex="3" space="4">
                <Skeleton startColor="amber.300" />
                <HStack space="2" alignItems="center">
                  <Skeleton size="5" rounded="full" />
                  <Skeleton
                    h="3"
                    flex="1"
                    rounded="full"
                    startColor="indigo.300"
                  />
                </HStack>
              </VStack>
            </HStack>
          </Center>
        )}
      </ScrollView>
    </View>
  );
};

const styles = {};

export default ExamScreen;
