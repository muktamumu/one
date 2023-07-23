import React, { useState } from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  Button,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Text, HStack, VStack } from 'native-base';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { serverURL } from '../../../Global';

const ProfileCard = ({ photo, name, dept, hall, id = null }) => {
  const [photoN, setPhoto] = useState();
  const [loading, setLoading] = useState(false);

  async function handlePhotoUpload() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled && result.assets.length > 0) {
      setPhoto(result.assets[0]);
      uploadPhoto(result.assets[0].uri);
    }
  }

const uploadPhoto = async (uri) => {
  setLoading(true);
  try {
    // Convert the image to Blob
    const response = await fetch(uri);
    const blob = await response.blob();

    // Create a FormData object to send the file and additional parameters
    const formData = new FormData();
    formData.append('photo', blob, id + '.jpg');
    formData.append('directory', dept); // Don't use 'removeSpacesAndSpecialCharacters'
    formData.append('name', id);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', serverURL + 'uploadProfilePhoto');
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log('Upload response:', data);
      } else {
        console.log('Error uploading photo:', xhr.responseText);
      }
      setLoading(false);
    };
    xhr.onerror = (error) => {
      console.log('Error uploading photo:', error);
      setLoading(false);
    };
    xhr.send(formData);
  } catch (error) {
    setLoading(false);
    console.log('Error uploading photo:', error);
  }
};


  function removeSpacesAndSpecialCharacters(inputString) {
    // Use a regular expression to match all spaces and special characters
    // The regex /\s|\W/g will match any character that is not a letter or a digit, including spaces
    const regex = /\s|\W/g;

    // Use the replace method to remove all matched characters with an empty string
    // The g flag will cause the replace operation to be performed on all occurrences of the matched pattern
    const resultString = inputString.replace(regex, '');

    return resultString;
  }

  const resizeImage = async (uri, maxSize) => {
    const image = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const imageSize = image.length;
    const scaleFactor = imageSize / maxSize;

    if (scaleFactor <= 1) {
      return { uri };
    }

    const newWidth = Math.floor(200);
    const newHeight = Math.floor(200 / scaleFactor);

    const resizedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: newWidth, height: newHeight } }],
      { format: ImageManipulator.SaveFormat.JPEG, compress: 1 }
    );

    return { uri: resizedImage.uri };
  };

  const isUpload =
    photoN === 'https://v2.result.du.ac.bd/assets/student.png' ? 1 : 0;

  return (
    <ImageBackground
      source={require('../../image/App-Card-Bg.png')}
      style={{ height: 150, width: '100%' }}
    >
      <View
        style={{
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          alignItems: 'center',
          padding: 36,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          maxWidth: '80%',
          marginLeft: '10%',
        }}
      >
        <HStack>
          {id ? (
            <TouchableOpacity onPress={handlePhotoUpload}>
              <Image
                style={{ width: 80, height: 80, borderRadius: 5 }}
                source={{ uri: photo }}
                my={2}
              />
            </TouchableOpacity>
          ) : (
            <Image
              style={{ width: 80, height: 80, borderRadius: 5 }}
              source={{ uri: photo }}
              my={2}
            />
          )}

          <VStack ml={5}>
            <Text
              color={'muted.50'}
              fontSize="xl"
              shadow={2}
              fontWeight="bold"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {name}
            </Text>
            <Text
              color={'muted.200'}
              fontSize="md"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {dept}
            </Text>
            <Text
              color={'muted.200'}
              fontSize="md"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {hall}
            </Text>
          </VStack>
        </HStack>
      </View>
    </ImageBackground>
  );
};

export default ProfileCard;
