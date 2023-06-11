import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './assets/screen/LoginScreen';
import Dashboard from './assets/screen/Dashboard';
import Profile from './assets/screen/Profile';
import Exams from './assets/screen/Exams';
import { colorOne, colorTwo } from './Global';
import { NativeBaseProvider, extendTheme } from 'native-base';


const Stack = createNativeStackNavigator();



function App() {
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  const theme = extendTheme({
		colors: {
			darkBlue: "#1E293B", // Define darkBlue color
		},
		components: {
			Button: {
				baseStyle: {
					backgroundColor: "darkBlue", // Apply darkBlue as button background color
					borderRadius: "md", // Customize button border radius
				},
			},
		},
	});


  return (
		<NativeBaseProvider theme={theme}>
			<NavigationContainer>
				<Stack.Navigator>
					{isLoggedIn ? (
						<>
							<Stack.Screen name="Dashboard" options={{ headerShown: false,  }}>
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
							<Stack.Screen name="Exams" options={{ headerShown: false }}>
								{(props) => (
									<Exams
										{...props}
										navigation={props.navigation}
										setLoggedIn={setLoggedIn}
									/>
								)}
							</Stack.Screen>
						</>
					) : (
						<Stack.Screen name="LoginScreen" options={{ headerShown: false }}>
							{(props) => (
								<Profile
									{...props}
									navigation={props.navigation}
									setLoggedIn={setLoggedIn}
								/>
							)}
						</Stack.Screen>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</NativeBaseProvider>
	);
}

export default App;
