import React from 'react';
import {
  Center,
  VStack,
  HStack,
  Text,
  IconButton,
  NativeBaseProvider,
  Alert,
  CloseIcon,
} from 'native-base';

const AlertComponent = ({ status, text }) => {
  return (
    <Center>
      <Alert status={status} colorScheme={status} variant="left-accent">
        <VStack space={2} flexShrink={1} w="100%">
          <HStack
            flexShrink={1}
            space={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack flexShrink={1} space={2} alignItems="center">
              <Alert.Icon />
              <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                {text}
              </Text>
            </HStack>
            <IconButton
              variant="unstyled"
              _focus={{
                borderWidth: 0,
              }}
              icon={<CloseIcon size="3" />}
              _icon={{
                color: 'coolGray.600',
              }}
            />
          </HStack>
        </VStack>
      </Alert>
    </Center>
  );
};

export default AlertComponent;
