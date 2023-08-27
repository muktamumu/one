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
import { colorOne, colorTwo, rootURL, serverURL, nodejs } from "../../Global";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoadingSpinner from '../components/LoadingSpinner';

import * as Device from 'expo-device';
import ShowAlert from '../components/ShowAlert';

const osVersion = 0;
const deviceName = Constants.deviceName + ' - ' + Constants.deviceModel + '';
const statusBarHeight = Constants.statusBarHeight;
const sessionId = Constants.sessionId;
const lang = Localization.locale;
const appVersion = Constants.expoConfig.version || 1;

const LoginScreen = ({ navigation, setLoggedIn, props, setUserData }) => {


  const [netStatus, setNetStatus] = useState(false);
  const [netInfo, setnetInfo] = useState();
  const [ipAddress, setipAddress] = useState();
  const [isLoading, setLoading] = useState(0);

  const checkNetworkConnectivity = async () => {
    const netInfoState = await NetInfo.fetch();
    setnetInfo(netInfoState);
    setipAddress(netInfoState.details.ipAddress);
    setNetStatus(netInfoState.isConnected);
  };

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

  const [reg, setReg] = useState("2017417693");
  const [pass, setPass] = useState("597230ask");
  const [sName, setsName] = useState();
  function login() {
    if (netStatus) {
      if (reg.length == 10 && pass.length > 5) {
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
        // Toast.error('Invalid Credentials.');
       handleShowAlert('error', 'Invalid Credentials.');
      }
    } else {
       // Toast.error('No Internet!');
      handleShowAlert('error', 'No Internet!');
    }
  }


  const saveLogin = async (res) => {
    try {
      await AsyncStorage.setItem('reg', reg);
      await AsyncStorage.setItem('token', JSON.stringify(res.token));
      await AsyncStorage.setItem('photo', res.photo);
      await AsyncStorage.setItem('name', res.name);
      await AsyncStorage.setItem('hall', res.hall);
      await AsyncStorage.setItem('dept', res.dept);

      setUserData([
        reg,
       res.token,
        res.photo,
        res.name,
        res.hall,
        res.dept,
      ]);

      setLoggedIn(true);
    } catch (error) {
       // Toast.error('Login Error.');
      handleShowAlert('error', 'Login Error. ');
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
        netInfo: JSON.stringify(netInfo),
        deviceName: deviceName,
        osVersion: osVersion,
        lang: lang,
        statusBarHeight: statusBarHeight,
        sessionId: sessionId,
        ipAddress: ipAddress,
        device: JSON.stringify(Device),
        version: appVersion,
      };
      axios
				.get(nodejs + "auth/checkForLogin", { params: data })
				.then((response) => {
					if (response.data.status === 300) {
						check214(response.data.api);
					} else if (response.data.status === 200) {
						setLoading(0);
						saveLogin(response.data);
					} else if (response.data.status === 303) {
						setLoading(0);
						// Toast.error(response.data.message);
						handleShowAlert("error", response.data.message);
					} else {
						console.log(response.data);
					}
				})
				.catch((error) => {
					setLoading(0);
					// Toast.error('Something Went Wrong, Please Try Again Later.');
					//  handleShowAlert('error', 'Something Went Wrong, Please Try Again Later.');
				});
    } catch (error) {
      setLoading(0);
           // Toast.error('Something Went Wrong, Please Try Again Later.');
           handleShowAlert('error', 'Something Went Wrong! ');
    }
  }

  function check214(api) {
    try {
      setLoading(1);
      const data = {
        regNo: reg,
        password: pass,
      };
      axios
        .get(rootURL + 'API214/Signin214', {
          params: data,
        })
        .then((response) => {
          if (response.data) {
            const arr = response.data.trim();
            const obj = arr.split(':');
            if (obj[0] === 'FOUND') {
              setLoading(0);
              const datatoSignup = {
                ticket: obj[1],
                reg: reg,
                pass: pass,

                setLoggedIn,
                setUserData,api
              };
              navigation.navigate('SignupScreen', datatoSignup);
            } else {
              setLoading(0);
              // Toast.error('Invalid Credentials.');
             handleShowAlert('error','Registration & Password Mismatch OR Not Found' );
            }
          } else {
            setLoading(0);
            // Toast.error('No Response From Server.');
            handleShowAlert('error', 'No Response From Server.');
          }
        })
        .catch((error) => {
          setLoading(0);
          // Toast.error('Request Error in 214.');
          handleShowAlert('error', 'Request Error in 214. ');
        });
    } catch (error) {
      setLoading(0);
      // Toast.error('Something Went Wrong!');
      handleShowAlert('error', 'Something Went Wrong! ');
    }
  }

  function setAlt() {
    setReg("2015614614");
    setPass("asdf@123");
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
        netInfo: JSON.stringify(netInfo),
        deviceName: deviceName,
        osVersion: osVersion,
        lang: lang,
        statusBarHeight: statusBarHeight,
        sessionId: sessionId,
        ipAddress: ipAddress,
        device: JSON.stringify(Device),
      };
      axios
				.get(nodejs + "auth/insertLoginFailed", { params: data })
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

  return (
    <View style={styles.container}>
      <Image
        source={require('../image/2212227897.jpg')}
        style={styles.backgroundImage}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../image/Britto.png')}
              style={styles.logoImage}
            />
          </View>
          {!netStatus && <NoInternet />}
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder={'Registration Number'}
            placeholderTextColor="#999"
            onChangeText={setReg}
            value={reg}
            maxLength={11}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            onChangeText={setPass}
            defaultValue={pass}
          />

          <TouchableOpacity style={styles.loginButton} onPress={() => login()}>
            <Text style={styles.loginButtonText}>
              {isLoading ? <LoadingSpinner /> : 'Login'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={() => setAlt()}>
            <Text style={styles.loginButtonText}>
             ALT
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.7, // adjust the opacity if needed
    width: '100%',
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
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    height: 330,
    width: 250,
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
