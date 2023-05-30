import React from 'react';
import {Text, TextInput, View} from "react-native";

const Field = () => {
    return (
        <View>
            <TextInput style={{
                borderColor:'#9E9E9E',
                borderWidth:1,
                margin:5,
                width:'98%'


            }}>
                <Text style={{ color:'white',backgroundColor:'black',fontSize:21,fontWeight:'bold', margin:10}}>নোটিশ</Text>
                <Text style={{fontSize:16,fontWeight:'bold', marginLeft:5}}>   ৪র্থ বর্ষ, ৭ম সেমিস্টারের ফলাফল প্রকাশিত ..</Text>


            </TextInput>

            <View style={{flexDirection:'row', alignItems:'center',marginLeft:160}}>
                <View>
                    <TextInput style={{
                        backgroundColor:'black',
                        borderWidth:2,
                        margin:5,
                        width:10,
                        height:10}}>
                    </TextInput>
                </View>

                <View>
                    <TextInput style={{
                        borderColor:'black',
                        borderWidth:2,
                        margin:5,
                        width:10,
                        height:10}}>
                    </TextInput>
                </View>

                <View>
                    <TextInput style={{
                        borderColor:'black',
                        borderWidth:2,
                        margin:5,
                        width:10,
                        height:10}}>
                    </TextInput>
                </View>
            </View>
        </View>


    );
};

export default Field;