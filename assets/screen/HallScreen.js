import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Heading, VStack, ScrollView, Spacer } from 'native-base';
import { colorOne, colorTwo, serverURL } from '../../Global';
import AppHeader from '../components/AppHeader';
import { StyleSheet } from 'react-native';
import { Dimensions, Pressable } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Box, Center, Skeleton, Text } from 'native-base';
import ProfileCard from '../components/ProfilePage/ProfileCard';
import axios from 'axios';
import ShowAlert from '../components/ShowAlert';
import UserListItem from '../components/UserListItem';

function HallScreen(navigation, setLoggedIn, props) {
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
      <ScrollView minW={'100%'}>
        {teacher.length > 0 ? (
          teacher.map((t) => <UserListItem t={t} />)
        ) : (
          <Center>
            <Text>No Teacher Found on the Server</Text>
          </Center>
        )}
      </ScrollView>
    </Center>
  );

  const ThirdRoute = () => (
    <Center m="4">
      <ScrollView minW={'100%'}>
        {staff.length > 0 ? (
          staff.map((t) => <UserListItem t={t} />)
        ) : (
          <Center>
            <Text>No Staff Found on the Server</Text>
          </Center>
        )}
      </ScrollView>
    </Center>
  );

  const FiveRoute = () => (
    <Center m="4">
      <ScrollView minW={'100%'}>
        {student.length > 0 ? (
          student.map((t) => <UserListItem t={t} />)
        ) : (
          <Center>
            <Text>No Staff Found on the Server</Text>
          </Center>
        )}
      </ScrollView>
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
    four: ThirdRoute,
    second: FiveRoute,
  });

  const [routes] = useState([
    { key: 'first', title: 'Info' },
    { key: 'second', title: 'Student' },
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

  const checkLoginStatus = async () => {
    const r = await AsyncStorage.getItem('reg');
    getDeptData(r);
  };

  const [teacher, setteacher] = useState();
  const [staff, setstaff] = useState();
  const [student, setstudent] = useState();

  async function getDeptData(reg) {
    try {
      const data = {
        reg: reg,
      };
      axios
        .get(serverURL + 'getHallData', { params: data })
        .then((response) => {
          if (response.data['status'] === 200) {
            const emp = response.data['staff'];
            if (emp.length > 0) {
              setteacher(emp.filter((x) => x.EmpType === 'T'));
              setstaff(emp.filter((x) => x.EmpType === 'O'));
            }
            setData(response.data['data']);
              setstudent(response.data['student']);
              console.log(response.data['data']);
          } else if (response.data['status'] === 501) {
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
      <AppHeader title="Hall" />
      {data ? (
        <>
          <ProfileCard
            photo={'null'}
            name={data[0].name}
            dept={'University of Dhaka'}
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

export default HallScreen;