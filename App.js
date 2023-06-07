import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './assets/screen/LoginScreen';
import Dashboard from './assets/screen/Dashboard';
import Profile from './assets/components/Profile';
import Hall from './assets/components/Hall';
import Exams from './assets/screen/Exams';

const Stack = createNativeStackNavigator();

function App() {
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  return (
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
              <LoginScreen
                {...props}
                navigation={props.navigation}
                setLoggedIn={setLoggedIn}
              />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
