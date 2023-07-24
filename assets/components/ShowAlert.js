import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Center, VStack, HStack, IconButton, Box } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const ShowAlert = ({ status, Tx, onClose, style }) => {
  const alertColor = getStatusColor(status);

  return (
    <View style={[styles.alertWrapper, style]}>
      <Center width={'90%'} alignSelf={'center'}>
        <Box
          style={[
            styles.alertContainer,
            {
              backgroundColor: `rgba(${alertColor}, 0.2)`,
              borderLeftColor: `rgba(${alertColor}, 5.9)`,
            },
          ]}
        >
          <HStack alignItems="center" justifyContent="space-between">
            <HStack flexShrink={1} space={2} alignItems="center">
              <Ionicons name={getStatusIcon(status)} size={24} />
              <Text style={styles.alertText}>{Tx}</Text>
            </HStack>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={'black'} />
            </TouchableOpacity>
          </HStack>
        </Box>
      </Center>
    </View>
  );
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'info':
      return 'information-circle';
    case 'success':
      return 'checkmark-circle';
    case 'error':
      return 'close-circle';
    case 'warning':
      return 'alert';
    default:
      return 'information-circle';
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'info':
      return '0, 122, 255';
    case 'success':
      return '52, 199, 89';
    case 'error':
      return '255, 59, 48';
    case 'warning':
      return '255, 159, 10';
    default:
      return '0, 122, 255';
  }
};

const styles = StyleSheet.create({
  alertWrapper: {
    position: 'absolute',
    top: '80%', // Position the alert at the bottom
    left: 0,
    right: 0,
    zIndex: 999,
  },
  alertContainer: {
    padding: 12,
    borderRadius: 5,
    width: '100%',
    borderLeftWidth: 5,
  },
  alertText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default ShowAlert;
