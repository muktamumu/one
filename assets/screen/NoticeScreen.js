import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native';
import axios from 'axios';
import { VStack, Box, Skeleton, ScrollView } from 'native-base';
import AppHeader from '../components/AppHeader';
import { serverURL } from '../../Global';
import Toast from 'react-native-toast-message';
import NoticeList from '../components/NoticePage/NoticeList';

const NoticeScreen = ({ navigation, setLoggedIn, props }) => {
  
  useEffect(() => {
    checkForData();
  }, []);

  const [reg, setReg] = useState();
  const stuReg = async () => setReg(await AsyncStorage.getItem('reg'));
  const [allExam, setAllExam] = useState();
  const [type, setType] = useState();
  const [noResult, setNoResut] = useState();

  async function checkForData() {
    const reg = await AsyncStorage.getItem('reg');
    if (reg) {
      const toSend = {
        reg: reg,
      };
      axios
        .get(serverURL + 'getAllNotices', { params: toSend })
        .then((response) => {
          if (response.data.status === 200) {
            setAllExam(response.data.result);
            setType(response.data.type);
          } else if (response.data.status === 201) {
            setNoResut(response.data.message);
          } else if (response.data.status === 500) {
            Toast.error(response.data.message);
          } else if (response.data.status === 501) {
            setLoggedIn(false);
          } else {
            Toast.error('Something Went Wrong (NP41)');
          }
        })
        .catch((error) => {
          console.error('Something Went Wrong (NP45).');
        });
    } else {
      setReg(await AsyncStorage.getItem('reg'));
    }
  }

  return (
    <View>
      <AppHeader title="Notices" />
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
              <NoticeList
                key={index}
                setLoggedIn={setLoggedIn}
                index={index}
                data={exam}
                title={exam.text}
                icon="notifications-circle"
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
              key={9}
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
              key={103}
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
            <Box
              key={11}
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
              key={12}
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
              key={13}
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

export default NoticeScreen;
