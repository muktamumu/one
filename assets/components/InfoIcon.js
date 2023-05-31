import React from 'react';
import {Text, TextInput, View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const InfoIcon = () => {
    return (
        <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between',margin:10}}>
            <View>
                <TextInput style={{
                    borderColor:'#9E9E9E',
                    borderWidth:1,
                    marginRight:10,
                    width:50,
                    height:50,
                    paddingHorizontal:10
                }}>
                    <Icon name="id-card-o" size={25} color="#000"  />
                </TextInput>
                <Text >প্রোফাইল</Text>
            </View>

            <View>
                <TextInput style={{
                    borderColor:'#9E9E9E',
                    borderWidth:1,
                    marginRight:10,
                    width:50,
                    height:50,
                    paddingHorizontal:10
                }}>
                    <Icon name="pencil" size={25} color="#000"  />
                </TextInput>
                <Text >ফরম পূরণ</Text>
            </View>


            <View>
                <TextInput style={{
                    borderColor:'#9E9E9E',
                    borderWidth:1,
                    marginRight:5,
                    width:50,
                    height:50,
                    paddingHorizontal:10
                }}>
                    <Icon name="graduation-cap" size={25} color="#000"  />
                </TextInput>
                <Text >ফলাফল</Text>
            </View>

            <View>
                <TextInput style={{
                    borderColor:'#9E9E9E',
                    borderWidth:1,
                    marginRight:10,
                    width:50,
                    height:50,
                    paddingHorizontal:10
                }}>
                    <Icon name="home" size={25} color="#000"  />
                </TextInput>
                <Text >হল তথ্য</Text>
            </View>

            <View>
                <TextInput style={{
                    borderColor:'#9E9E9E',
                    borderWidth:1,
                    marginRight:10,
                    width:50,
                    height:50,
                    paddingHorizontal:10,
                }}>
                    <Icon name="money" size={25} color="#000"  />
                </TextInput>
                <Text>বিভাগ তথ্য</Text>
            </View>
        </View>
    );
};

export default InfoIcon;