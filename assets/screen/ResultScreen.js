import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';
import { Box, Skeleton, VStack } from 'native-base';
import AppHeader from '../components/AppHeader';
import ResultList from '../components/ResultPage/ResultList';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { serverURL } from '../../Global';

const ResultScreen = ({ navigation, setLoggedIn }) => {
  const [reg, setReg] = useState(null);
  const [allExam, setAllExam] = useState([]);
  const [noResult, setNoResult] = useState(null);

  useEffect(() => {
    checkForData();
  }, []);

  const stuReg = async () => {
    const studentReg = await AsyncStorage.getItem('reg');
    setReg(studentReg);
  };

  async function checkForData() {
    const reg = await AsyncStorage.getItem('reg');

    if (reg) {
      const toSend = {
        reg: reg,
      };

      try {
        const response = await axios.get(serverURL + 'getAllResult', {
          params: toSend,
        });

        if (response.data.status === 200) {
          setAllExam(response.data.result);
        } else if (response.data.status === 201) {
          setNoResult(response.data.message);
        } else if (response.data.status === 500) {
          Toast.error(response.data.message);
        } else if (response.data.status === 501) {
          setLoggedIn(false);
        } else {
          Toast.error('Something Went Wrong (RP63)');
        }
      } catch (error) {
        console.error('Something Went Wrong (RP67).', error);
      }
    } else {
      stuReg();
    }
  }

  return (
    <View>
      <AppHeader title="Result"/>
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
        {allExam.length > 0 ? (
          allExam.map((exam, index) => (
            <ResultList
              key={index}
              setLoggedIn={setLoggedIn}
              index={index}
              data={exam}
              title={exam.exam_title}
            />
          ))
        ) : !noResult ? (
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
        ) : null}
      </ScrollView>
    </View>
  );
};

export default ResultScreen;
