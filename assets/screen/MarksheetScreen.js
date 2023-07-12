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
import ResultList from '../components/ResultPage/ResultList';
import Toast  from 'react-native-toast-message';
import MarksheetList from '../components/MarksheetPage/MarksheetList';

const MarksheetScreen = ({ navigation, setLoggedIn, props }) => {

    useEffect(() => {
        checkForData();
    }, []);

  const [reg, setReg] = useState();
  const stuReg = async () => setReg(await AsyncStorage.getItem('reg'));
  const [allExam, setAllExam] = useState();
  const [noResult, setNoResut] = useState();

  async function checkForData() {
    const reg = await AsyncStorage.getItem('reg');
    if (reg) {
      const toSend = {
        reg: reg,
      };
      axios
        .get(serverURL + 'getAllMarksheetInfo', { params: toSend })
        .then((response) => {
          if (response.data.status === 200) {
            setAllExam(response.data.result);
          } else if (response.data.status === 201) {
            setNoResut(response.data.message);
          } else if (response.data.status === 500) {
            Toast.error(response.data.message);
          } else if (response.data.status === 501) {
            setLoggedIn(false);
          } else {
            Toast.error('Something Went Wrong (MP63)');
          }
        })
        .catch((error) => {
          console.error('Something Went Wrong (MP67).');
        });
    } else {
      setReg(await AsyncStorage.getItem('reg'));
    }
  }

  return (
    <View>
      <AppHeader title="Marksheet"/>
      <ScrollView>
        {noResult && (
          <Box
            flex={1}
            padding={5}
            alignItems="center"
            justifyContent="center"
            mt={'80%'}
          >
            <Text fontSize={24} opacity={0.5} style={{ textAlign: 'center' }}>
              {noResult}
            </Text>
          </Box>
        )}
        {allExam ? (
          allExam.map((exam, index) => (
            <>
              <MarksheetList
                key={index}
                setLoggedIn={setLoggedIn}
                index={index}
                data={exam}
                title={exam.exam_title}
              />
            </>
          ))
        ) : !noResult ? (
          <VStack>
            <Box
              key={1}
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
              key={2}
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
              key={3}
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
        ) : (
          ''
        )}
      </ScrollView>
    </View>
  );
};

const styles = {};

export default MarksheetScreen;
