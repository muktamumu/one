// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './assets/screen/LoginScreen';
import Dashboard from './assets/components/Dashboard';
import InfoIcon from './assets/components/InfoIcon';
import Profile from './assets/components/Profile';
import HomePage from './assets/components/notice';
import result from './assets/components/result';
import hall from './assets/components/hall';
import dept from './assets/components/dept';
import notice from './assets/components/notice';






const Stack = createNativeStackNavigator();




function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}} />
        <Stack.Screen name="InfoIcon" component={InfoIcon} options={{headerShown:false}}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}}/>
        <Stack.Screen name="notice" component={notice} options={{headerShown:false}}/>
        <Stack.Screen name="result" component={result} options={{headerShown:false}}/>
        <Stack.Screen name="hall" component={hall} options={{headerShown:false}}/>
        <Stack.Screen name="dept" component={dept} options={{headerShown:false}}/>
       
        
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;