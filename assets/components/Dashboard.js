import React from 'react';
import { View, StyleSheet, Image, SafeAreaView,TouchableOpacity,Text } from 'react-native';
import Card from './Card';
import Celender from './Celender';
import NoticeBar from './NoticeBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Dashboard = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Card />
        </View>
        <View>
          <NoticeBar />
        </View>

        <View style={styles.imageIcon} >
        <TouchableOpacity onPress={() => props. navigation.navigate('Profile')}>
           <Image source={require('./image.png/proBlue.png')} style= {{width:40,height:40}}/>
           <Text style = {{marginRight:10,paddingHorizontal:3}}>Profile</Text>

      </TouchableOpacity>

      <TouchableOpacity onPress={() => props. navigation.navigate('notice')}>
           <Image source={require('./image.png/fromFill.png')} style= {{width:40,height:40,marginLeft:15}}/>
           <Text style = {{marginRight:20,paddingHorizontal:3}}>From Fill Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props. navigation.navigate('result')}>
           <Image source={require('./image.png/result.png')} style= {{width:40,height:40}}/>
           <Text style = {{marginRight:20,paddingHorizontal:5}}>Result </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props. navigation.navigate('hall')}>
           <Image source={require('./image.png/hall3.png')} style= {{width:40,height:40}}/>
           <Text style = {{marginRight:15,}}>Hall Info</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props. navigation.navigate('dept')}>
           <Image source={require('./image.png/dept3.png')} style= {{width:40,height:40}}/>
           <Text style = {{marginRight:5,paddingHorizontal:5}}>Dept.Info </Text>
      </TouchableOpacity>
        </View>
        <View>
          <Celender />
        </View>
      </View>
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  container: {},
  header: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIcon:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    margin:10,
    paddingHorizontal:10
  }
});

export default Dashboard;
