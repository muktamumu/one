import AsyncStorage from '@react-native-async-storage/async-storage';

export const showError = (data) => {
  console.error(data);
};

export const logOutNow = async () => {
  try {
    await AsyncStorage.clear();
   // setLoggedIn(false);
  } catch (error) {
    console.error('Error clearing AsyncStorage data:', error);
  }
};

export const getTimeAge = (postedTime) => {
  const currentTime = new Date();
  const postedDate = new Date(postedTime);

  const timeDifference = currentTime - postedDate;

  // Convert time difference to appropriate units
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 7) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return postedDate.toLocaleDateString('en-US', options);
  } else if (days > 0) {
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else {
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
  }
};
