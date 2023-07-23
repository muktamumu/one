import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './assets/screen/LoginScreen';
import Dashboard from './assets/screen/Dashboard';
import Profile from './assets/screen/Profile';
import ExamScreen from './assets/screen/ExamScreen';
import ResultScreen from './assets/screen/ResultScreen';
import { colorOne, colorTwo } from './Global';
import { NativeBaseProvider, extendTheme } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoticeScreen from './assets/screen/NoticeScreen';
import MarksheetScreen from './assets/screen/MarksheetScreen';
import CertificateScreen from './assets/screen/CertificateScreen';
import SignupScreen from './assets/screen/SignupScreen';

const Stack = createNativeStackNavigator();

function App() {
  const [isLoggedIn, setLoggedIn] = useState();
  const [reg, setReg] = useState();

  const theme = extendTheme({
    colors: {
      darkBlue: '#1E293B', // Define darkBlue color
    },
    components: {
      Button: {
        baseStyle: {
          backgroundColor: 'darkBlue', // Apply darkBlue as button background color
          borderRadius: 'md', // Customize button border radius
        },
      },
    },
  });

  const checkLoginStatus = async () => {
    const d = await AsyncStorage.getItem('reg');
    if (d) {
      setLoggedIn(true);
      setReg(d);
    } else {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
		<NativeBaseProvider theme={theme}>
			<NavigationContainer>
				<Stack.Navigator>
					{isLoggedIn ? (
						<>
							<Stack.Screen name="Dashboard" options={{ headerShown: false }}>
								{(props) => (
									<Dashboard
										{...props}
										navigation={props.navigation}
										setLoggedIn={setLoggedIn}
									/>
								)}
							</Stack.Screen>
							<Stack.Screen name="Profile" options={{ headerShown: false }}>
								{(props) => (
									<Profile
										{...props}
										navigation={props.navigation}
										setLoggedIn={setLoggedIn}
									/>
								)}
							</Stack.Screen>
							<Stack.Screen name="ExamScreen" options={{ headerShown: false }}>
								{(props) => (
									<ExamScreen
										{...props}
										navigation={props.navigation}
										setLoggedIn={setLoggedIn}
										setReg={setReg}
									/>
								)}
							</Stack.Screen>
							<Stack.Screen
								name="ResultScreen"
								options={{ headerShown: false }}
							>
								{(props) => (
									<ResultScreen
										{...props}
										navigation={props.navigation}
										setLoggedIn={setLoggedIn}
										setReg={setReg}
									/>
								)}
							</Stack.Screen>
							<Stack.Screen
								name="MarksheetScreen"
								options={{ headerShown: false }}
							>
								{(props) => (
									<MarksheetScreen
										{...props}
										navigation={props.navigation}
										setLoggedIn={setLoggedIn}
										setReg={setReg}
									/>
								)}
							</Stack.Screen>
							<Stack.Screen
								name="CertificateScreen"
								options={{ headerShown: false }}
							>
								{(props) => (
									<CertificateScreen
										{...props}
										navigation={props.navigation}
										setLoggedIn={setLoggedIn}
										setReg={setReg}
									/>
								)}
							</Stack.Screen>

							<Stack.Screen
								name="NoticeScreen"
								options={{ headerShown: false }}
							>
								{(props) => (
									<NoticeScreen
										{...props}
										navigation={props.navigation}
										setLoggedIn={setLoggedIn}
										setReg={setReg}
									/>
								)}
							</Stack.Screen>
						</>
					) : (
						<>
							<Stack.Screen name="LoginScreen" options={{ headerShown: false }}>
								{(props) => (
									<LoginScreen
										{...props}
										navigation={props.navigation}
										setLoggedIn={setLoggedIn}
									/>
								)}
							</Stack.Screen>
							<Stack.Screen
								name="SignupScreen"
								options={{ headerShown: false }}
							>
								{(props) => (
									<SignupScreen
										{...props}
										navigation={props.navigation}
										setLoggedIn={setLoggedIn}
									/>
								)}
							</Stack.Screen>
						</>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</NativeBaseProvider>
	);
}

export default App;
