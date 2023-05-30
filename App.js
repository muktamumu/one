import React from 'react';
import { View } from 'react-native';
import Header from "./assets/components/Header";
import Card from "./assets/components/Card";
import Field from "./assets/components/Field";
import InfoIcon from "./assets/components/InfoIcon";
import Celender from "./assets/components/Celender";


const App = () => {
    return (
        <View>
            <Header/>
         <Card/>
            <View style={{marginTop:110}}>
                <Field/>
                <InfoIcon/>
                <Celender/>
            </View>


        </View>

    );
};

export default App;
