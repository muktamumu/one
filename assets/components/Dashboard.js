import React from 'react';
import {View,  StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from './Card';
import Field from './Field';
import InfoIcon from './InfoIcon';
import Celender from './Celender';



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