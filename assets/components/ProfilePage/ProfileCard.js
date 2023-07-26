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
import { colorThree, serverURL } from '../../../Global';
import { Spinner } from 'native-base';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

const ProfileCard = ({
  photo,
  name,
  dept,
  hall,
  id = null,
  onPhotoReceived,
}) => {
  const [photoN, setPhoto] = useState();
  const [loading, setLoading] = useState(false);

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

  async function handlePhotoUpload() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true, // higher res on iOS
      aspect: [2, 2],
      quality: 1,
    });

    if (result.assets[0].cancelled) {
      return;
    }

    let resizedImage = await resizeImage(result.assets[0].uri, 5500 * 1024); // Resize the image to approximately 200KB

    let localUri = resizedImage.uri;

    // let localUri = result.assets[0].uri;
    let filename = localUri.split('/').pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append('photo', { uri: localUri, name: filename, type });
    formData.append('directory', removeSpacesAndSpecialCharacters(dept)); // Replace 'dept' with the correct department name
    formData.append('name', id); // Replace 'id' with the correct user ID

    try {
      setLoading(true);
      const response = await axios.post(
        serverURL + 'uploadProfilePhoto',
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }
      );

      if (response.data.status === 'success') {
        onPhotoReceived(response.data.file_url);
        setPhoto(response.data.file_url);
        setLoading(false);
      } else {
      }
    } catch (error) {}
  }

  function removeSpacesAndSpecialCharacters(inputString) {
    // Use a regular expression to match all spaces and special characters
    // The regex /\s|\W/g will match any character that is not a letter or a digit, including spaces
    const regex = /\s|\W/g;

    // Use the replace method to remove all matched characters with an empty string
    // The g flag will cause the replace operation to be performed on all occurrences of the matched pattern
    const resultString = inputString.replace(regex, '');

    return resultString;
  }

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
          padding: '8.4%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          maxWidth: '80%',
          marginLeft: '10%',
        }}
      >
        <HStack>
          {id ? (
            <TouchableOpacity onPress={handlePhotoUpload}>
              {loading ? (
                <Spinner
                  color={'blue'}
                  size={'lg'}
                  style={{ width: 80, height: 80, borderRadius: 5 }}
                />
              ) : (
                <Image
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 38,
                    borderWidth: 1,
                    borderColor: 'white',
                  }}
                  source={{ uri: photoN ? photoN : photo }}
                  my={2}
                />
              )}
            </TouchableOpacity>
          ) : (
            <Image
              style={{
                width: 80,
                height: 80,
                borderRadius: 5,
                borderRadius: 38,
                borderWidth: 1,
                borderColor: 'white',
              }}
              source={{ uri: photoN ? photoN : photo }}
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
