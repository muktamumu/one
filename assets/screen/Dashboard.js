import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Button,
} from 'react-native';
import { bgColor } from '../../Global';
import { Box, ScrollView } from 'native-base';
import ProfileCard from '../components/ProfilePage/ProfileCard';
import AppHeader from '../components/AppHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = ({ navigation, setLoggedIn, props, setUserData }) => {

  const logOut = async () => {
    try {
      await AsyncStorage.clear();
      setLoggedIn(false)
    } catch (error) {
      console.error('Error clearing AsyncStorage data:', error);
    }
  };


  return (
    <>
      <AppHeader title={'Dashboard'} />
      <Box alignItems="center">
        <ProfileCard
          photo={setUserData[2]}
          name={setUserData[3]}
          dept={setUserData[5]}
          hall={setUserData[4]}
          id={null}
          onPhotoReceived={null}
        />
      </Box>
      <ScrollView>
        <View>
          <View style={styles.buttonBoxFull}>
            {/* FIRST ROW : PROFILE | EXAM */}

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.eachButton}
                onPress={() => navigation.navigate('Profile')}
              >
                <Image
                  source={require('../image/icon/proBlue.png')}
                  style={styles.btnImg}
                />
                <Text style={styles.btnText}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.eachButton}
                onPress={() => navigation.navigate('ExamScreen')}
              >
                <Image
                  source={require('../image/icon/fromFill.png')}
                  style={styles.btnImg}
                />
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.btnText}
                >
                  Exam
                </Text>
              </TouchableOpacity>
            </View>

            {/* SECOND ROW : RESULT | MARKSHEET */}

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.eachButton}
                onPress={() => navigation.navigate('ResultScreen')}
              >
                <Image
                  source={require('../image/icon/result.png')}
                  style={styles.btnImg}
                />
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.btnText}
                >
                  Result
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.eachButton}
                onPress={() => navigation.navigate('MarksheetScreen')}
              >
                <Image
                  source={require('../image/icon/result.png')}
                  style={styles.btnImg}
                />
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.btnText}
                >
                  Marksheet
                </Text>
              </TouchableOpacity>
            </View>

            {/* THIRD ROW :  CERTIFICATE | NOTICE */}

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.eachButton}
                onPress={() => navigation.navigate('CertificateScreen')}
              >
                <Image
                  source={require('../image/icon/result.png')}
                  style={styles.btnImg}
                />
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.btnText}
                >
                  Certificate
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.eachButton}
                onPress={() => navigation.navigate('NoticeScreen')}
              >
                <Image
                  source={require('../image/icon/result.png')}
                  style={styles.btnImg}
                />
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.btnText}
                >
                  Notices
                </Text>
              </TouchableOpacity>
            </View>

            {/* FOURTH ROW :  DEPT | HALL */}

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.eachButton}
                onPress={() => navigation.navigate('DepartmentScreen')}
              >
                <Image
                  source={require('../image/icon/result.png')}
                  style={styles.btnImg}
                />
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.btnText}
                >
                  Department
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.eachButton}
                onPress={() => navigation.navigate('HallScreen')}
              >
                <Image
                  source={require('../image/icon/result.png')}
                  style={styles.btnImg}
                />
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.btnText}
                >
                  Hall
                </Text>
              </TouchableOpacity>
            </View>

            {/* FIVE ROW :  SYLLABUS | - */}

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.eachButton}
                onPress={() => navigation.navigate('SyllabusScreen')}
              >
                <Image
                  source={require('../image/icon/result.png')}
                  style={styles.btnImg}
                />
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.btnText}
                >
                  Syllabus
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.eachButton}
                onPress={() => navigation.navigate('HallScreen')}
              >
                <Image
                  source={require('../image/icon/result.png')}
                  style={styles.btnImg}
                />
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.btnText}
                >
                  Hall
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Button
            title="Logout"
            onPress={() => {
              logOut();
            }}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  btnImg: {
    width: 40,
    height: 40,
    margin: 5,
  },
  btnText: {
    fontSize: 20,
    overflow: 'visible',
    color: 'black',
  },
  eachButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '45%',
    margin: 10,
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },

  row: {
    flexDirection: 'row',
  },
  container: {},

  buttonBoxFull: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 10,
    borderRadius: 10,
    backgroundColor: bgColor,
    alignItems: 'center',
  },
});

export default Dashboard;
