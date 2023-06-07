import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = () => {
  return (
    <View style={styles.header}>
      <Image
        source={require('../image/DU_APP_LogoBlue.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    paddingVertical: 10,
  },
  logo: { width: 90, height: 30 },
});
export default Header;
