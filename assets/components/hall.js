import React from 'react';
import { View, TouchableOpacity, Image,Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from './Card';

const  hall = () => {
  const navigation = useNavigation();

  const handleHeaderClick = (props) => {
   
    navigation.navigate('Profile');
  };

  return (
   <View>
     <View style={styles.headerContainer}>
      <TouchableOpacity onPress={handleHeaderClick}>
        <Image source={require('../image/belllogo.png')} style={styles.bellIcon} />
      </TouchableOpacity>
          <Text style={{color:'white',marginRight:30}}>hall information </Text>

      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image source={require('../image/hall.jpg')} style={styles.drawerIcon} />
      </TouchableOpacity>
   </View>


      <View>
      <View  >
        
         
       
         <View style={{alignItems:"center"}} >
              
               
               
         </View>
                
           <View>
             <Text style={{color:"white",fontSize:25,marginLeft:140}} >উম্মে সালমা</Text>
             <Text style={{color:"white",fontSize:25,marginLeft:100}}>সেশন ঃ২০১৭-১৮</Text>
             </View>

             <View style={{marginTop:40}} >
               <Card/>
             </View>

         </View>
      </View>
      
       




    </View>
  );
};

const styles = {
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: 'black',
  },
  bellIcon: {
    width: 27,
    height: 27,
  },
  logo: {
    width: 50,
    height: 50,
  },
  drawerIcon: {
    width: 27,
    height: 27,
  },
};

export default hall;
