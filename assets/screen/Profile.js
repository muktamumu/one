import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Spacer,
  View,
  Icon,
} from 'native-base';
import {
  bgColor,
  colorFour,
  colorOne,
  colorThree,
  colorTwo,
} from '../../Global';
import AppHeader from '../components/AppHeader';
import { Container, Header, Tab, Tabs, TabHeading } from 'native-base';
import { ImageBackground, StyleSheet } from 'react-native';
import {
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Animated,
  Pressable,
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { NativeBaseProvider, Box, Text, Center, Image } from 'native-base';

function Profile() {
  const [studentName, setstudentName] = useState('মুক্তা দত্ত');
  const [session, setsession] = useState('২০১৫-১৬');
  const [hallName, sethallName] = useState('রোকেয়া হল');
  const [photo, setPhoto] = useState(
    'https://v2.result.du.ac.bd/assets/student.png'
  );

  const FirstRoute = () => (
    <Center m="4">
      <VStack>
        <HStack>
          <VStack w={'40%'}>
            <Text fontWeight="bold" style={styles.title}>
              Student's Name
            </Text>
          </VStack>
          <VStack w={'10%'}>
            <Text style={styles.colon}>:</Text>
          </VStack>
          <VStack w={'50%'}>
            <Text fontWeight="bold" style={styles.value}>
              {data[0].ADMITTED_STUDENT_NAME}
            </Text>
          </VStack>
        </HStack>
        <HStack>
          <VStack w={'40%'}>
            <Text fontWeight="bold" style={styles.title}>
              Father's Name
            </Text>
          </VStack>
          <VStack w={'10%'}>
            <Text style={styles.colon}>:</Text>
          </VStack>
          <VStack w={'50%'}>
            <Text fontWeight="bold" style={styles.value}>
              {data[0].ADMITTED_STUDENT_FATHERS_N}
            </Text>
          </VStack>
        </HStack>
        <HStack>
          <VStack w={'40%'}>
            <Text fontWeight="bold" style={styles.title}>
              Mother's Name
            </Text>
          </VStack>
          <VStack w={'10%'}>
            <Text style={styles.colon}>:</Text>
          </VStack>
          <VStack w={'50%'}>
            <Text fontWeight="bold" style={styles.value}>
              {data[0].ADMITTED_STUDENT_MOTHERS_N}
            </Text>
          </VStack>
        </HStack>
        <HStack>
          <VStack w={'40%'}>
            <Text fontWeight="bold" style={styles.title}>
              Phone Number
            </Text>
          </VStack>
          <VStack w={'10%'}>
            <Text style={styles.colon}>:</Text>
          </VStack>
          <VStack w={'50%'}>
            <Text fontWeight="bold" style={styles.value}>
              {data[0].ADMITTED_STUDENT_CONTACT_NO}
            </Text>
          </VStack>
        </HStack>
        <HStack>
          <VStack w={'40%'}>
            <Text fontWeight="bold" style={styles.title}>
              Email Address
            </Text>
          </VStack>
          <VStack w={'10%'}>
            <Text style={styles.colon}>:</Text>
          </VStack>
          <VStack w={'50%'}>
            <Text fontWeight="bold" style={styles.value}>
              {data[0].ADMITTED_STUDENT_EMAIL}
            </Text>
          </VStack>
        </HStack>
        <HStack>
          <VStack w={'40%'}>
            <Text fontWeight="bold" style={styles.title}>
              Date of Birth
            </Text>
          </VStack>
          <VStack w={'10%'}>
            <Text style={styles.colon}>:</Text>
          </VStack>
          <VStack w={'50%'}>
            <Text fontWeight="bold" style={styles.value}>
              {data[0].ADMITTED_STUDENT_DOB}
            </Text>
          </VStack>
        </HStack>
        <HStack>
          <VStack w={'40%'}>
            <Text fontWeight="bold" style={styles.title}>
              Blood Group
            </Text>
          </VStack>
          <VStack w={'10%'}>
            <Text style={styles.colon}>:</Text>
          </VStack>
          <VStack w={'50%'}>
            <Text fontWeight="bold" style={styles.value}>
              {data[0].blood_group}
            </Text>
          </VStack>
        </HStack>
        <HStack>
          <VStack w={'40%'}>
            <Text fontWeight="bold" style={styles.title}>
              Religion
            </Text>
          </VStack>
          <VStack w={'10%'}>
            <Text style={styles.colon}>:</Text>
          </VStack>
          <VStack w={'50%'}>
            <Text fontWeight="bold" style={styles.value}>
              {data[0].RELIGION}
            </Text>
          </VStack>
        </HStack>
        <HStack>
          <VStack w={'40%'}>
            <Text fontWeight="bold" style={styles.title}>
              Gender
            </Text>
          </VStack>
          <VStack w={'10%'}>
            <Text style={styles.colon}>:</Text>
          </VStack>
          <VStack w={'50%'}>
            <Text fontWeight="bold" style={styles.value}>
              {data[0].ADMITTED_STUDENT_GENDER}
            </Text>
          </VStack>
        </HStack>
        <HStack>
          <VStack w={'40%'}>
            <Text fontWeight="bold" style={styles.title}>
              Parent's Income
            </Text>
          </VStack>
          <VStack w={'10%'}>
            <Text style={styles.colon}>:</Text>
          </VStack>
          <VStack w={'50%'}>
            <Text fontWeight="bold" style={styles.value}>
              {data[0].parents_income}
            </Text>
          </VStack>
        </HStack>
        <HStack>
          <VStack w={'40%'}>
            <Text fontWeight="bold" style={styles.title}>
              Present Address
            </Text>
          </VStack>
          <VStack w={'10%'}>
            <Text style={styles.colon}>:</Text>
          </VStack>
          <VStack w={'50%'}>
            <Text fontWeight="bold" style={styles.value}>
              {data[0].present_house_no +
                ',' +
                data[0].present_post_office +
                ',' +
                data[0].present_upa_zilla +
                ',' +
                data[0].present_district +
                ',' +
                data[0].present_post_code}
            </Text>
          </VStack>
        </HStack>
        <HStack>
          <VStack w={'40%'}>
            <Text fontWeight="bold" style={styles.title}>
              Permanent Address
            </Text>
          </VStack>
          <VStack w={'10%'}>
            <Text style={styles.colon}>:</Text>
          </VStack>
          <VStack w={'50%'}>
            <Text fontWeight="bold" style={styles.value}>
              {data[0].house_no +
                ',' +
                data[0].post_office +
                ',' +
                data[0].upa_zilla +
                ',' +
                data[0].district +
                ',' +
                data[0].post_code}
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </Center>
  );

  const SecondRoute = () => (
    <Center flex={1} my="4">
      This is Tab 2
    </Center>
  );

  const ThirdRoute = () => (
    <Center flex={1} my="4">
      This is Tab 3
    </Center>
  );

  const FourthRoute = () => (
    <Center flex={1} my="4">
      This is Tab 4
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
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
  });

  const [routes] = useState([
    { key: 'first', title: 'Personal' },
    { key: 'second', title: 'Academic' },
    { key: 'third', title: 'Tab 3' },
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
    const name = JSON.parse(await AsyncStorage.getItem('name'));
    setsession(JSON.parse(await AsyncStorage.getItem('session')));
    setData(JSON.parse(await AsyncStorage.getItem('data')));
    const ph = await AsyncStorage.getItem('photo');
    setstudentName(name);
    setPhoto(ph);
    if (!name) {
      return false;
    }
  };

  useEffect(() => {
    !checkLoginStatus() && console.log('error');
  }, []);

  return (
    <>
      <AppHeader />
      {data ? (
        <>
          <ImageBackground source={require('../image/App-Card-Bg.png')}>
            <View
              borderRadius="lg"
              shadow={2}
              width="100%"
              alignItems="center"
              p={4}
              bg="rgba(0, 0, 0, 0.5)"
            >
              <HStack>
                <Image
                  size="md"
                  alt="Julkarnine Rokey"
                  source={{ uri: photo }}
                  my={2}
                  rounded={5}
                />
                <VStack ml={5}>
                  <Text
                    color={'muted.50'}
                    fontSize="xl"
                    shadow={2}
                    fontWeight="bold"
                  >
                    {data[0].STUDENT_BANGLA_NAME}
                  </Text>
                  <Text color={'muted.200'} fontSize="md" shadow={2}>
                    {data[0].SUBJECTS_TITLE}
                  </Text>
                  <Text color={'muted.200'} fontSize="md" shadow={2}>
                    {data[0].hall_title}
                  </Text>
                </VStack>
              </HStack>
            </View>
          </ImageBackground>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
          />
        </>
      ) : (
        <View>
          <Center bg="primary.400" p="20">
            <Text>Something Went Wrong</Text>
          </Center>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  title: {},
  colon: {},
  value: {},
});

export default Profile;
