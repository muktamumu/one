import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import Constants from 'expo-constants';
import * as Localization from 'expo-localization';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from '../components/NoInternet';
import Toast from 'react-native-toast-message';
import { colorOne, colorTwo, serverURL } from '../../Global';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  Alert,
  Center,
  HStack,
  IconButton,
  VStack,
  CloseIcon,
  useToast,
} from 'native-base';

const osVersion =
  Constants.platform?.android?.versionCode ||
  Constants.platform?.ios?.systemVersion;
const deviceName = Constants.deviceName;
const statusBarHeight = Constants.statusBarHeight;
const sessionId = Constants.sessionId;
const lang = Localization.locale;

const LoginScreen = ({ navigation, setLoggedIn, props }) => {
  const [netStatus, setNetStatus] = useState(false);
  const [netInfo, setnetInfo] = useState();
  const [ipAddress, setipAddress] = useState();
  const [isLoading, setLoading] = useState(0);

  const checkNetworkConnectivity = async () => {
    const netInfoState = await NetInfo.fetch();
    setNetStatus(netInfoState.isConnected);
    setnetInfo(JSON.stringify(netInfoState));
    setipAddress(netInfoState.details.ipAddress);
  };

  const [reg, setReg] = useState('2019013365');
  const [pass, setPass] = useState('0');
  const [sName, setsName] = useState();
  function login() {
    if (netStatus) {
      if (reg.length == 10 && pass.length > 6) {
        checkForLogin(
          reg,
          pass,
          netInfo,
          deviceName,
          osVersion,
          lang,
          statusBarHeight,
          sessionId,
          ipAddress
        );
      } else {
        insertLoginFailed(
          reg,
          pass,
          netInfo,
          deviceName,
          osVersion,
          lang,
          statusBarHeight,
          sessionId,
          ipAddress
        );
        showLeftAlert('error', 'Invalid Credentials.');
      }
    } else {
      showLeftAlert('error', 'No Internet!');
    }

    // props.navigation.navigate('Dashboard');
  }

  const handleLogin = async (res) => {
    try {
      await AsyncStorage.setItem('reg', reg);
      await AsyncStorage.setItem('token', JSON.stringify(res.token));
      await AsyncStorage.setItem('data', JSON.stringify(res.data));
      await AsyncStorage.setItem('result', JSON.stringify(res.result));
      await AsyncStorage.setItem('photo', res.photo);
      await AsyncStorage.setItem('name', JSON.stringify(res.name));
      await AsyncStorage.setItem('hall', JSON.stringify(res.hall));
      await AsyncStorage.setItem('session', JSON.stringify(res.session));
      await AsyncStorage.setItem('final', JSON.stringify(res.final));

      setLoggedIn(true);

      // console.log(res.final);

      // ...
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };

  async function checkForLogin(
    reg,
    pass,
    netInfo,
    deviceName,
    osVersion,
    lang,
    statusBarHeight,
    sessionId,
    ipAddress
  ) {
    try {
      setLoading(1);
      const data = {
        reg: reg,
        pass: pass,
        netInfo: netInfo,
        deviceName: deviceName,
        osVersion: osVersion,
        lang: lang,
        statusBarHeight: statusBarHeight,
        sessionId: sessionId,
        ipAddress: ipAddress,
      };
      axios
        .get(serverURL + 'checkForLogin', { params: data })
        .then((response) => {
          if (response.data.status === 300) {
            setLoading(0);
            showLeftAlert(response.data.type, response.data.message);
          } else if (response.data.status === 200) {
            setLoading(0);
            handleLogin(response.data);
          }
        })
        .catch((error) => {
          console.log('error ' + error);
          showLeftAlert('error', 'Request Error.');
        });
    } catch (error) {
      console.log('Catch The Error');
      showLeftAlert('error', 'Something Went Wrong! ' + error);
    }
  }

  function insertLoginFailed(
    reg,
    pass,
    netInfo,
    deviceName,
    osVersion,
    lang,
    statusBarHeight,
    sessionId,
    ipAddress
  ) {
    try {
      setLoading(1);

      const data = {
        reg: reg,
        pass: pass,
        netInfo: netInfo,
        deviceName: deviceName,
        osVersion: osVersion,
        lang: lang,
        statusBarHeight: statusBarHeight,
        sessionId: sessionId,
        ipAddress: ipAddress,
      };
      axios
        .get(serverURL + 'insertLoginFailed', { params: data })
        .then((response) => {
          setLoading(0);
        })
        .catch((error) => {
          setLoading(0);
        });
    } catch (error) {
      setLoading(0);
    }
  }

  useEffect(() => {
    checkNetworkConnectivity();
    if (sName) {
      alert('Welcome Back ' + sName);
    }
  });

  const toast = useToast();
  const showLeftAlert = (status, text) => {
    toast.show({
      render: () => {
        return (
          <Center>
            <Alert status={status} colorScheme={status} variant="left-accent">
              <VStack space={2} flexShrink={1} w="100%">
                <HStack
                  flexShrink={1}
                  space={2}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <HStack flexShrink={1} space={2} alignItems="center">
                    <Alert.Icon />
                    <Text
                      fontSize="md"
                      fontWeight="medium"
                      color="coolGray.800"
                    >
                      {text}
                    </Text>
                  </HStack>
                  <IconButton
                    variant="unstyled"
                    _focus={{
                      borderWidth: 0,
                    }}
                    icon={<CloseIcon size="3" />}
                    _icon={{
                      color: 'coolGray.600',
                    }}
                  />
                </HStack>
              </VStack>
            </Alert>
          </Center>
        );
      },
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../image/LoginBG.jpg')}
        style={styles.backgroundImage}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../image/DU_APP_LogoBlue.png')}
              style={styles.logoImage}
            />
          </View>

          {!netStatus && <NoInternet />}
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholderTextColor="#999"
            onChangeText={setReg}
            value={reg}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            onChangeText={setPass}
          />

          <TouchableOpacity style={styles.loginButton} onPress={() => login()}>
            <Text style={styles.loginButtonText}>
              {isLoading ? <LoadingSpinner /> : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.7, // adjust the opacity if needed
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colorOne,
    padding: 20,
    height: 330,
    width: 250,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: colorOne,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: colorTwo,
  },
  loading: {
    borderRadius: 15,
  },
  loginButton: {
    backgroundColor: colorOne,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#007bff',
  },
});

export default LoginScreen;
