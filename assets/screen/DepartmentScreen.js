import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Heading, HStack, VStack, View, ScrollView, Badge, Divider, Spacer } from 'native-base';
import { bgColor, colorOne, colorTwo, serverURL } from '../../Global';
import AppHeader from '../components/AppHeader';
import { ImageBackground, StyleSheet } from 'react-native';
import { Dimensions, Pressable } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Box, Text, Center, Image, Skeleton } from 'native-base';
import ProfileCard from '../components/ProfilePage/ProfileCard';
import axios from 'axios';
import ShowAlert from '../components/ShowAlert';
import { WebView } from 'react-native';

function DepartmentScreen(navigation, setLoggedIn, props) {
  const [showAlert1, setShowAlert] = useState(false);
  const [alertText, setalertText] = useState('');
  const [alertType, setalertType] = useState('');

  const handleShowAlert = (type, text) => {
    setalertText(text);
    setalertType(type);
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const [photo, setPhoto] = useState(
    'https://v2.result.du.ac.bd/assets/student.png'
  );


  const FirstRoute = () => (
    <Center m="4">
      <ScrollView>
        <VStack>
          <Text>
            History of the Department : {'\n'}
            {'\n'}
            {data[0].history.replace(/<[^>]+>/g, '')}{' '}
          </Text>
        </VStack>
        <Spacer m={2} />
        <VStack>
          <Text>{data[0].mission_vision.replace(/<[^>]+>/g, '')} </Text>
        </VStack>
      </ScrollView>
    </Center>
  );

  const SecondRoute = () => (
    <Center m="4">
      <VStack>
        <HStack>
          <VStack w={'40%'}>
            <Text fontWeight="bold" style={styles.title}>
              Registration
            </Text>
          </VStack>
          <VStack w={'10%'}>
            <Text style={styles.colon}>:</Text>
          </VStack>
          <VStack w={'50%'}>
            <Text fontWeight="bold" style={styles.value}>
              {data[0].reg_num}
            </Text>
          </VStack>
        </HStack>
        <HStack>
          <VStack w={'40%'}>
            <Text fontWeight="bold" style={styles.title}>
              Session
            </Text>
          </VStack>
          <VStack w={'10%'}>
            <Text style={styles.colon}>:</Text>
          </VStack>
          <VStack w={'50%'}>
            <Text fontWeight="bold" style={styles.value}>
              {session}
            </Text>
          </VStack>
        </HStack>
        <HStack>
          <VStack w={'40%'}>
            <Text fontWeight="bold" style={styles.title}>
              Department
            </Text>
          </VStack>
          <VStack w={'10%'}>
            <Text style={styles.colon}>:</Text>
          </VStack>
          <VStack w={'50%'}>
            <Text fontWeight="bold" style={styles.value}>
              {data[0].dept_name}
            </Text>
          </VStack>
        </HStack>
        <HStack>
          <VStack w={'40%'}>
            <Text fontWeight="bold" style={styles.title}>
              Hall
            </Text>
          </VStack>
          <VStack w={'10%'}>
            <Text style={styles.colon}>:</Text>
          </VStack>
          <VStack w={'50%'}>
            <Text fontWeight="bold" style={styles.value}>
              {data[0].hall_name}
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </Center>
  );

  const [index, setIndex] = useState(0);
  function getTabData(i) {
    setIndex(i);
  }

  const initialLayout = {
    width: Dimensions.get('window').width,
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    third: SecondRoute,
    four: SecondRoute,
  });

  const [routes] = useState([
    { key: 'first', title: 'Info' },
    { key: 'third', title: 'Teacher' },
    { key: 'four', title: 'Staff' },
  ]);

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });
          const color = index === i ? '#fafaf9' : colorOne;
          const bg = index === i ? colorTwo : '#e5e5e5';
          return (
            <Box
              flex={1}
              bg={bg}
              alignItems="center"
              p="3"
              cursor="pointer"
              key={`tab-${i}`}
            >
              <Pressable
                onPress={() => {
                  getTabData(i);
                }}
              >
                <Heading size={'xs'} isTruncated style={{ color }}>
                  {route.title}
                </Heading>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  const [data, setData] = useState();
  const [address, setAddress] = useState();

  const [reg, setReg] = useState();
  const [session, setSession] = useState();

  const makeSession = (v) => {
    const four = v.substring(0, 4);
    const five = parseInt(four);

    const resp = four + '-' + Number(five + 1);

    setSession(resp);
  };

  const checkLoginStatus = async () => {
    const r = await AsyncStorage.getItem('reg');
    setReg(r);
    makeSession(r);
    getDeptData(r);
  };

    const [chobi, setChobi] = useState();
  async function getDeptData(reg) {
    try {
      const data = {
        reg: reg,
      };
      axios
        .get(serverURL + 'getDeptData', { params: data })
          .then((response) => {
              if (response.data['status'] === 200) {
              setChobi(response.data['chobi']);
              setData(response.data['data']);
            setAddress(response.data['address']);
          } else if (response.data['status'] === 501) {
            console.log(response.data);
            handleShowAlert(
              'error',
              response.data['message'] || 'Something Went Wrong!!!'
            );
          } else {
            handleShowAlert(
              'error',
              response.data['message'] || 'Something Went Wrong!'
            );
          }
        })
        .catch((error) => {
          console.log(error);
          handleShowAlert('error', 'Something Went Wrong! ');
        });
    } catch (error) {
      handleShowAlert('error', 'Something Went Wrong! ');
    }
  }

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const LoadingAnimation = () => {
    return (
      <Center>
        <VStack
          w="90%"
          maxW="400"
          borderWidth="1"
          space={8}
          overflow="hidden"
          rounded="md"
          _dark={{
            borderColor: 'coolGray.500',
          }}
          _light={{
            borderColor: 'coolGray.200',
          }}
        >
          <Skeleton h="40" />
          <Skeleton.Text px="4" />
          <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
        </VStack>
      </Center>
    );
  };

    function getYear(data) {
        const arr = data.split('-');
        return arr[2] + '-' + arr[1] + '-' + arr[0];
    }
  return (
    <>
      <AppHeader title="Department" />
      {data ? (
        <>
          <ProfileCard
            photo={chobi}
            name={data[0].name}
            dept={'Established: ' + getYear(data[0].estyr)}
            hall={null}
          />

          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
          />
        </>
      ) : (
        <LoadingAnimation />
      )}

      {showAlert1 && (
        <ShowAlert
          status={alertType}
          Tx={alertText}
          onClose={handleCloseAlert}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  title: {},
  colon: {},
  value: {},
});

export default DepartmentScreen;
