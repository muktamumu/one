import React from 'react';
import { View } from 'react-native';
import Header from './assets/components/Header';
import Card from './assets/components/Card';
import Field from './assets/components/Field';
import InfoIcon from './assets/components/InfoIcon';
import Celender from './assets/components/Celender';
import LoginScreen from './assets/screen/LoginScreen';

const App = () => {
  return (
    <View>
      <LoginScreen />
      {/* <Header />
      <Card />
      <View style={{ marginTop: 35 }}>
        <Field />
        <InfoIcon />
        <Celender />
      </View> */}
    </View>
  );
};

export default App;
