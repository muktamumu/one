import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Button,
} from 'react-native';
import Card from '../components/ProfileCard';
import { bgColor } from '../../Global';
import Header from '../components/AppHeader';

const Dashboard = ({ navigation, setLoggedIn, props }) => {
  return (
    <View>
      <View>
        <Card />
      </View>
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
        </View>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title="Logout"
          onPress={() => {
            setLoggedIn(false);
          }}
        />
      </View>
    </View>
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
    fontWeight: 600,
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
