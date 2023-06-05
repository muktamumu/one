import React from 'react';
import { View, StyleSheet, Image, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from './Card';
import Header from '../components/Header';
import Field from './Field';
import InfoIcon from './InfoIcon';
import Celender from './Celender';
import NoticeBar from './NoticeBar';

<<<<<<< HEAD


const Header = () => {
    return (
       <View>
         <View style={styles.header}>
            <Icon name="bars" size={30} color="#ffffff" />
           <Image source={require('../image/DU-logo.jpg')} style={{width:30,height:40}}/>
            <Icon name="bell" size={30} color="#ffffff" />
        </View>
               
               <View>
                <Card/>
               </View>
                   
               <View style={{marginTop:30}}>
                <Field/>
               </View>
                         
                               


               <View>
                <InfoIcon/>
               </View>

               <View>
                <Celender/>
               </View>
               

       </View>
    );
=======
const Dashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Card />
        </View>
        <View>
          <NoticeBar />
        </View>
        <View>
          <InfoIcon />
        </View>
        <View>
          <Celender />
        </View>
      </View>
    </SafeAreaView>
  );
>>>>>>> a8c0b21903eeb235e76f1be8c22b4da410312e88
};

const styles = StyleSheet.create({
  container: {},
  header: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dashboard;
