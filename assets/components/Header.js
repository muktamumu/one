import React from 'react';
import {View,  StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const Header = () => {
    return (
        <View style={styles.header}>
            <Icon name="bars" size={30} color="#ffffff" />
           <Image source={require('../image/DU-logo.jpg')} style={{width:30,height:40}}/>
            <Icon name="bell" size={30} color="#ffffff" />
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
        marginTop:2
    },
    title: {
        color: '#ffffff',
        fontSize: 20,
    },
});
export default Header;