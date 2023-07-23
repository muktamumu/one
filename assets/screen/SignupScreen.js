import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';
import { Box, Center, HStack, Skeleton, VStack } from 'native-base';
import AppHeader from '../components/AppHeader';
import { rootURL, serverURL } from '../../Global';
import ShowAlert from '../components/ShowAlert';
import SignupForm from '../components/Signup/SignupForm';

const SignupScreen = ({ navigation, setLoggedIn, route }) => {
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

  const [isLoading, setLoading] = useState(1);
  const [profileData, setProfileData] = useState();
  
  async function getProfileData() {
    try {
      setLoading(1);
      const data = {
        ticket: route.params.ticket,
      };
      axios
        .get(rootURL + 'API214/getInfo', {
          params: data,
        })
        .then((response) => {
          if (response.data) {
			setProfileData(response.data); 
            setLoading(0);
          } else {
            setLoading(1);
            handleShowAlert(
              'error',
              'Something Went Wrong. Please Contact Admin. ERR: S42'
            );
            navigation.navigate('LoginScreen');
          }
        })
		  .catch((error) => {
			console.log(error)
          setLoading(1);
          handleShowAlert(
            'error',
            'Something Went Wrong. Please Contact Admin. ERR: S58'
          );
          navigation.navigate('LoginScreen');
        });
	} catch (error) {
		console.log(error);
      setLoading(1);
      handleShowAlert(
        'error',
        'Something Went Wrong. Please Contact Admin. ERR: S65'
      );
      navigation.navigate('LoginScreen');
    }
  }

  useEffect(() => {
	  if (route.params) {
		getProfileData();
	  } else {
		  navigation.navigate('LoginScreen');
	}
  }, []);

  return (
    <View>
      <AppHeader title="Signup" />

		  <ScrollView>{isLoading ? <LoadingView /> : <SignupForm data={profileData} route = {route.params} />}</ScrollView>
      {showAlert1 && (
        <ShowAlert
          status={alertType}
          Tx={alertText}
          onClose={handleCloseAlert}
        />
      )}
    </View>
  );
};

const LoadingView = () => {
  return (
    <Center w="100%">
      <VStack
        w="90%"
        maxW="400"
        borderWidth="1"
        space={6}
        rounded="md"
        alignItems="center"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}
      >
        <Skeleton h="40" />
        <Skeleton
          borderWidth={1}
          borderColor="coolGray.200"
          endColor="warmGray.50"
          size="20"
          rounded="full"
          mt="-70"
        />
        <HStack space="2">
          <Skeleton size="5" rounded="full" />
          <Skeleton size="5" rounded="full" />
          <Skeleton size="5" rounded="full" />
          <Skeleton size="5" rounded="full" />
          <Skeleton size="5" rounded="full" />
        </HStack>
        <Skeleton.Text lines={12} alignItems="center" px="12" />
        <Skeleton mb="3" w="40" rounded="20" />
      </VStack>
    </Center>
  );
};

export default SignupScreen;
