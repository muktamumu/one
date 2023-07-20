import { Alert, Linking, Platform } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Notifications } from 'expo';

export async function requestCameraPermission() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);

  if (status !== 'granted') {
    Alert.alert(
      'Permission required',
      'Please grant camera permission to use this feature.',
      [{ text: 'OK' }]
    );
    return false;
  }

  return true;
}

export async function pickImageFromCamera() {
  const hasPermission = await requestCameraPermission();

  if (!hasPermission) {
    return null;
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 0.7,
  });

  if (!result.cancelled) {
    return result.uri;
  }

  return null;
}

export async function pickImageFromGallery() {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== 'granted') {
    Alert.alert(
      'Permission required',
      'Please grant gallery access permission to use this feature.',
      [{ text: 'OK' }]
    );
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 0.7,
  });

  if (!result.cancelled) {
    return result.uri;
  }

  return null;
}

export function formatDate(date, options) {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formatOptions = { ...defaultOptions, ...options };

  return new Date(date).toLocaleDateString(undefined, formatOptions);
}

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function convertCurrency(amount, fromCurrency, toCurrency) {
  // Conversion logic here
  // Replace this with an actual conversion API call or algorithm
  return amount * 0.85;
}

export function openExternalLink(url) {
  Linking.openURL(url).catch(() => {
    Alert.alert(
      'Link cannot be opened',
      'There was an error opening the link.',
      [{ text: 'OK' }]
    );
  });
}

export function showToast(message) {
  // Code for displaying toast notification
  // Implement your preferred toast library or custom logic here
}

export function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return Permissions.askAsync(Permissions.NOTIFICATIONS)
    .then(({ status }) => {
      if (status !== 'granted') {
        throw new Error('Permission not granted for push notifications');
      }

      return Notifications.getExpoPushTokenAsync();
    })
    .then(({ data }) => data);
}

// Other utility functions...

export default {
  requestCameraPermission,
  pickImageFromCamera,
  pickImageFromGallery,
  formatDate,
  capitalizeFirstLetter,
  isValidEmail,
  convertCurrency,
  openExternalLink,
  showToast,
  registerForPushNotificationsAsync,
  // Export other utility functions here
};
