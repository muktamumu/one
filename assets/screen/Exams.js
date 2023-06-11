import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {
  bgColor,
  colorFour,
  colorOne,
  colorThree,
  colorTwo,
  headerBgColor,
} from '../../Global';
import Header from '../components/AppHeader';

const LeftContent = (props) => <Avatar.Icon {...props} icon="note" />;

const Exams = ({ navigation, setLoggedIn, props }) => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header />
        <Text style={styles.header} color={colorOne}>
          EXAMINATIONS
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: headerBgColor,
  },
  header: {
    margin: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default Exams;
