import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Button,
} from 'react-native';
import Card from '../components/Card';
import { bgColor } from '../../Global';

const Dashboard = ({ navigation, setLoggedIn, props }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Card />
        </View>
        <View>
          <View style={styles.buttonBoxFull}>
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
                onPress={() => navigation.navigate('Exams')}
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
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.eachButton}
                onPress={() => props.navigation.navigate('result')}
              >
                <Image
                  source={require('../image/icon/result.png')}
                  style={styles.btnImg}
                />
                <Text style={styles.btnText}>Result </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.eachButton}
                onPress={() => props.navigation.navigate('Hall')}
              >
                <Image
                  source={require('../image/icon/hall3.png')}
                  style={styles.btnImg}
                />
                <Text style={styles.btnText}>Hall Info</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.eachButton}
                onPress={() => props.navigation.navigate('result')}
              >
                <Image
                  source={require('../image/icon/result.png')}
                  style={styles.btnImg}
                />
                <Text style={styles.btnText}>Result </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.eachButton}
                onPress={() => props.navigation.navigate('Hall')}
              >
                <Image
                  source={require('../image/icon/hall3.png')}
                  style={styles.btnImg}
                />
                <Text style={styles.btnText}>Hall Info</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.eachButton}
                onPress={() => props.navigation.navigate('result')}
              >
                <Image
                  source={require('../image/icon/result.png')}
                  style={styles.btnImg}
                />
                <Text style={styles.btnText}>Result </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.eachButton}
                onPress={() => props.navigation.navigate('dept')}
              >
                <Image
                  source={require('../image/icon/dept3.png')}
                  style={styles.btnImg}
                />
                <Text style={styles.btnText}>Dept.Info </Text>
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
    </SafeAreaView>
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
