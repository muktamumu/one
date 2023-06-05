import React from 'react';
import {View,  StyleSheet, Image,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const Header = () => {
    return (
        <View style={styles.header}>

           
           <Image source={require('../image.png/bers.png')} style={{width:20,height:20}}/>
          
           <Image source={require('../image/DU-logo.jpg')} style={{width:70,height:70}}/>
            <Icon name="bell" size={90} color="#ffffff" />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#333333',
        paddingHorizontal: 10,
        paddingVertical: 5,
       
    },
    title: {
        color: '#ffffff',
        fontSize: 20,
    },
});
export default Header;