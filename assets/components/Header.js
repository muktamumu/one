import React from 'react';
<<<<<<< HEAD
import {View,  StyleSheet, Image,TouchableOpacity} from 'react-native';
=======
import { View, StyleSheet, Image } from 'react-native';
>>>>>>> a8c0b21903eeb235e76f1be8c22b4da410312e88
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = () => {
<<<<<<< HEAD
    return (
        <View style={styles.header}>

           
           <Image source={require('../image.png/bers.png')} style={{width:20,height:20}}/>
          
           <Image source={require('../image/DU-logo.jpg')} style={{width:70,height:70}}/>
            <Icon name="bell" size={90} color="#ffffff" />
        </View>
    );
=======
  return (
    <View style={styles.header}>
      <Image
        source={require('../image/DU_APP_LogoBlue.png')}
        style={{ width: 30, height: 40 }}
      />
    </View>
  );
>>>>>>> a8c0b21903eeb235e76f1be8c22b4da410312e88
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
  },
});
export default Header;
