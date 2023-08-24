import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import {
  Box,
  VStack,
  FormControl,
  Input,
  Select,
  Button,
  Text,
  Image,
  Heading,
  Icon,
  Badge,
  Divider,
  Spinner,
} from 'native-base';
import ProfileCard from '../ProfilePage/ProfileCard';
import { colorTwo, colorOne, serverURL, nodejs } from '../../../Global';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Localization from 'expo-localization';
import * as Device from 'expo-device';
import NetInfo from '@react-native-community/netinfo';

const SignupForm = ({ data, route, alertT, login, setUserData }) => {
  // LOGIN SUCCESS DATA
  const reg = route.reg;
  const pass = route.pass;

  const osVersion =
    Constants.platform?.android?.versionCode ||
    Constants.platform?.ios?.systemVersion;
  const deviceName = Constants.deviceName + ' - ' + Constants.deviceModel + '';
  const statusBarHeight = Constants.statusBarHeight;
  const sessionId = Constants.sessionId;
  const lang = Localization.locale;

  const [netInfo, setnetInfo] = useState();
  const [ipAddress, setipAddress] = useState();

  const checkNetworkConnectivity = async () => {
    const netInfoState = await NetInfo.fetch();
    setnetInfo(JSON.stringify(netInfoState));
    setipAddress(netInfoState.details.ipAddress);
  };

  const device = JSON.stringify(Device);

  // CREATE USER DATA
  const ticket = route.ticket;

  const deptName = data['student-profile']['aca-body'];
  const hallName = data['student-profile']['hall-name'];
  const hallId = data['student-profile']['hall'];
  const deptId = data['student-profile']['acBody'];
  const lastEnroll = data['student-profile']['last-enroll'];

  const classRoll = lastEnroll['enroll-info']['class-roll'];
  const year = lastEnroll['enroll-info']['curriculum-year'];
  const semester = lastEnroll['enroll-info']['semester'];
  const session = lastEnroll['enroll-info']['session'];

  useEffect(() => {
    getAddress();
    checkNetworkConnectivity();
  }, [divisionList, thanaList, districtList, unionList]);

  const [divisionList, setDivisionList] = useState([]);
  const [thanaList, setthanaList] = useState([]);
  const [filterthanaList, setfilterthanaList] = useState([]);
  const [filterthanaListP, setfilterthanaListP] = useState([]);
  const [districtList, setdistrictList] = useState([]);
  const [districtListP, setdistrictListP] = useState([]);
  const [filteredDistrictList, setFilteredDistrictList] = useState([]);
  const [filteredDistrictListP, setFilteredDistrictListP] = useState([]);
  const [unionList, setunionlist] = useState([]);
  const [filterunionList, setfilterunionlist] = useState([]);

  async function getAddress() {
    try {
      axios
        .get(nodejs + 'auth/getAddress')
        .then((response) => {
          setDivisionList(response.data.divisions);
          setthanaList(response.data.upazilas);
          setdistrictList(response.data.districts);
          setunionlist(response.data.unions);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function selectDiv(id, setter) {
    setter(id);

    const filteredDistricts = districtList.filter(
      (district) => district.division_id === id
    );
    setFilteredDistrictList(filteredDistricts);
  }

  function selectDis(id, setter) {
    setter(id);

    const filteredDistricts = thanaList.filter(
      (district) => district.district_id === id
    );
    setfilterthanaList(filteredDistricts);
  }

  function selectTha(id, setter) {
    setter(id);
  }

  function selectDivP(id, setter) {
    setter(id);

    const filteredDistricts = districtList.filter(
      (district) => district.division_id === id
    );
    setFilteredDistrictListP(filteredDistricts);
  }

  function selectDisP(id, setter) {
    setter(id);

    const filteredDistricts = thanaList.filter(
      (district) => district.district_id === id
    );
    setfilterthanaListP(filteredDistricts);
  }

  function selectThaP(id, setter) {
    setter(id);
    const filteredDistricts = unionList.filter(
      (district) => district.upazilla_id === id
    );
    setfilterunionlist(filteredDistricts);
  }

  const [currentStep, setCurrentStep] = useState(1); // Step 1: Student Info, Step 2: Address Info

  // Step 1: Student Information
  const [studentName, setStudentName] = useState(
    data['student-profile'].name_en
  );
  const [studentNamebn, setStudentNamebn] = useState(
    data['student-profile'].name_bn
  );

  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [religion, setReligion] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [receivedPhoto, setReceivedPhoto] = useState(null);
  const [gender, setGender] = useState();

  const handleReceivedPhoto = (photo) => {
    setReceivedPhoto(photo);
  };

  // Step 2: Address Information
  const [presentAddress, setPresentAddress] = useState('');
  const [presentThana, setPresentThana] = useState('');
  const [presentUnion, setPresentUnion] = useState('');
  const [presentDistrict, setPresentDistrict] = useState('');
  const [presentDivision, setPresentDivision] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [permanentThana, setPermanentThana] = useState('');
  const [permanentDistrict, setPermanentDistrict] = useState('');
  const [permanentDivision, setPermanentDivision] = useState('');

  const validateStep1 = () => {
    const errors = {};

    if (!fatherName) {
      errors.religion = 'Please enter Your Father Name!';
    }
    if (!motherName) {
      errors.religion = 'Please enter your Mother Name!';
    }
    if (!religion) {
      errors.religion = 'Please tell us your Religion!';
    }
    if (!dateOfBirth) {
      errors.dateOfBirth = 'Don not forget to tell us your Birth Date!';
    }
    if (!bloodGroup) {
      errors.bloodGroup = 'We need your blood group to know you better!';
    }

    if (!phone) {
      errors.phone = 'Share your phone number so we can stay connected!';
    }
    if (!email) {
      errors.email = 'We love to have your email for magical updates!';
    }
    if (!receivedPhoto) {
      errors.receivedPhoto = 'Do not forget to upload your picture!';
    }

    return errors;
  };

  const handleStep1Next = () => {
    const errors = validateStep1();
    if (Object.keys(errors).length > 0) {
      const errorKeys = Object.keys(errors);
      const lastKey = errorKeys[errorKeys.length - 1];
      alertT(errors[lastKey]);
      return;
    }
    setCurrentStep(2); // Move to Step 2
  };

  const validateStep2 = () => {
    const errors = {};
    if (!presentAddress) {
      errors.presentAddress = 'Please Enter Present address.';
    }

    if (!permanentThana) {
      errors.permanentThana = 'Please Select Permanent Thana';
    }
    if (!permanentDistrict) {
      errors.permanentDistrict = 'Please Select Permanent District';
    }
    if (!permanentDivision) {
      errors.permanentDivision = 'Please Select Permanent Division';
    }

    return errors;
  };

  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    if (currentStep === 1) {
      const errors = validateStep1();
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }
      setCurrentStep(2); // Move to Step 2
    } else {
      const errors = validateStep2();
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }
      // Prepare the data to be sent to the API
      const formData = {
        reg,
        pass,
        netInfo,
        deviceName,
        osVersion,
        lang,
        statusBarHeight,
        sessionId,
        ipAddress,
        device,
        ticket,
        studentName,
        studentNamebn,
        fatherName,
        motherName,
        phone,
        email,
        dateOfBirth,
        bloodGroup,
        profilePhoto,
        religion,
        presentAddress,
        presentUnion,
        permanentAddress,
        permanentThana,
        permanentDistrict,
        permanentDivision,
        hallName,
        deptName,
        session,
        classRoll,
        year,
        semester,
        receivedPhoto,
        deptId,
        hallId,
        gender,
      };

      try {
        setLoading(true);
        axios
          .get(nodejs + 'auth/signup', { params: formData })
          .then((response) => {
            console.log(response.data)
            if (response.data.status === 200) {
              handleLogin(response.data);
            } else {
              alertT('Something Went Wrong.');
            }
          })
          .catch((error) => {
            console.log('response error: ' + error);
          });
      } catch (error) {
        console.log('catch error: ' + error);
      }
    }
  };

  const handleLogin = async (res) => {
    try {
      await AsyncStorage.setItem('reg', reg);
      await AsyncStorage.setItem('token', JSON.stringify(res.token));
      await AsyncStorage.setItem('photo', receivedPhoto);
      await AsyncStorage.setItem('name', studentName);
      await AsyncStorage.setItem('hall', hallName);
      await AsyncStorage.setItem('dept', deptName);

      setUserData([
        reg,
        res.token,
        receivedPhoto,
        studentName,
        hallName,
        deptName,
      ]);
      login(true);
      
    } catch (error) {
      alertT('Login Error. ');
      console.error(error);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={{ marginBottom: 20 }}>
        {/* Profile Photo Upload */}
        <Box alignItems="center">
          <ProfileCard
            photo={
              'https://v2.result.du.ac.bd/assets/assets/Britto/student.png'
            }
            name={data['student-profile'].name_en}
            dept={data['student-profile']['aca-body']}
            hall={data['student-profile']['hall-name']}
            id={route.reg}
            onPhotoReceived={handleReceivedPhoto}
          />
        </Box>

        {currentStep === 1 && (
          <View>
            <Box style={styles.container}>
              <VStack space={4}>
                <Badge colorScheme={'info'}>
                  <Heading size={'sm'} textAlign={'center'}>
                    You need to save some essential information in Britto.
                  </Heading>
                </Badge>
                {/* Student Name */}
                <FormControl isInvalid={'father' in errors}>
                  <FormControl.Label>Father's Name</FormControl.Label>
                  <Input
                    value={fatherName}
                    onChangeText={setFatherName}
                    placeholder="Enter Your Father's Name"
                  />
                </FormControl>
                <FormControl isInvalid={'father' in errors}>
                  <FormControl.Label style={styles.redLabel}>
                    Mother's Name
                  </FormControl.Label>
                  <Input
                    value={motherName}
                    onChangeText={setMotherName}
                    placeholder="Enter Your Mother's Name"
                  />
                </FormControl>
                {/* Phone */}
                <FormControl isInvalid={'phone' in errors}>
                  <FormControl.Label style={styles.redLabel}>
                    Phone Number
                  </FormControl.Label>
                  <Input
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    maxLength={11}
                    placeholder="Enter Your Phone Number"
                  />
                  {'phone' in errors && (
                    <FormControl.ErrorMessage>
                      {errors.phone}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
                {/* Email */}
                <FormControl isInvalid={'email' in errors}>
                  <FormControl.Label style={styles.redLabel}>
                    Email Address
                  </FormControl.Label>
                  <Input
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter Your Email Address"
                  />
                  {'email' in errors && (
                    <FormControl.ErrorMessage>
                      {errors.email}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>

                {/* Date of Birth */}
                <FormControl isInvalid={'dateOfBirth' in errors}>
                  <FormControl.Label style={styles.redLabel}>
                    Date of Birth
                  </FormControl.Label>
                  {/* Use a DatePicker component for easy date selection */}
                  <Input
                    value={dateOfBirth}
                    onChangeText={setDateOfBirth}
                    placeholder="YYYY-MM-DD"
                    keyboardType={
                      Platform.OS === 'ios'
                        ? 'numbers-and-punctuation'
                        : 'numeric'
                    }
                  />
                  {'dateOfBirth' in errors && (
                    <FormControl.ErrorMessage>
                      {errors.dateOfBirth}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>

                {/* Blood Group */}
                <FormControl isInvalid={'bloodGroup' in errors}>
                  <FormControl.Label style={styles.redLabel}>
                    Gender
                  </FormControl.Label>
                  <Select
                    selectedValue={gender}
                    minWidth={200}
                    accessibilityLabel="Select Gender"
                    placeholder="Select Gender"
                    readOnly={true} // Prevent the keyboard from opening
                    onValueChange={setGender}
                  >
                    <Select.Item label="Male" value="1" />
                    <Select.Item label="Female" value="2" />
                    <Select.Item label="Others" value="3" />
                  </Select>
                </FormControl>

                {/* Blood Group */}
                <FormControl isInvalid={'bloodGroup' in errors}>
                  <FormControl.Label style={styles.redLabel}>
                    Blood Group
                  </FormControl.Label>
                  <Select
                    selectedValue={bloodGroup}
                    minWidth={200}
                    accessibilityLabel="Select Blood Group"
                    placeholder="Select Blood Group"
                    readOnly={true} // Prevent the keyboard from opening
                    onValueChange={setBloodGroup}
                  >
                    <Select.Item label="A+" value="A+" />
                    <Select.Item label="A-" value="A-" />
                    <Select.Item label="B+" value="B+" />
                    <Select.Item label="B-" value="B-" />
                    <Select.Item label="O+" value="O+" />
                    <Select.Item label="O-" value="O-" />
                    <Select.Item label="AB+" value="AB+" />
                    <Select.Item label="AB-" value="AB-" />
                    <Select.Item label="I Don't Know Yet." value="X" />
                  </Select>
                  {'bloodGroup' in errors && (
                    <FormControl.ErrorMessage>
                      {errors.bloodGroup}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>

                {/* Religion */}
                <FormControl isInvalid={'religion' in errors}>
                  <FormControl.Label style={styles.redLabel}>
                    Religion
                  </FormControl.Label>
                  <Select
                    selectedValue={religion}
                    minWidth={200}
                    accessibilityLabel="Select Religion"
                    placeholder="Select Religion"
                    readOnly={true} // Prevent the keyboard from opening
                    onValueChange={setReligion}
                  >
                    <Select.Item label="Islam" value="1" />
                    <Select.Item label="Hinduism" value="2" />
                    <Select.Item label="Buddhism" value="3" />
                    <Select.Item label="Christianity" value="4" />
                    <Select.Item label="Other" value="0" />
                  </Select>
                  {'religion' in errors && (
                    <FormControl.ErrorMessage>
                      {errors.religion}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
                <Button onPress={handleStep1Next} bg={colorTwo}>
                  Next
                </Button>
              </VStack>
            </Box>
          </View>
        )}

        {currentStep === 2 && (
          <View>
            <Box mt={4} style={styles.container}>
              <VStack space={4}>
                <Badge colorScheme={'info'}>
                  <Heading size={'sm'}>Present Address</Heading>
                </Badge>

                {/* Present Address */}
                <FormControl isInvalid={'presentAddress' in errors}>
                  <FormControl.Label style={styles.redLabel}>
                    Present Address
                  </FormControl.Label>
                  <Input
                    value={presentAddress}
                    onChangeText={setPresentAddress}
                    placeholder="Hall Room No, House No, Road No ..."
                  />
                </FormControl>
                <Divider />
                <Badge colorScheme={'info'}>
                  <Heading size={'sm'}>Permanent Address</Heading>
                </Badge>

                {/* Permanent Address */}

                {/* Select Permanent Division */}
                <FormControl isInvalid={'permanentDivision' in errors}>
                  <FormControl.Label style={styles.redLabel}>
                    Permanent Division
                  </FormControl.Label>
                  <Select
                    selectedValue={permanentDivision}
                    minWidth={200}
                    accessibilityLabel="Select Permanent Division"
                    placeholder="Select Permanent Division"
                    onValueChange={(v) => selectDivP(v, setPermanentDivision)}
                    readOnly={true} // Prevent the keyboard from opening
                  >
                    {divisionList.map((division) => (
                      <Select.Item
                        key={division.id}
                        label={division.name}
                        value={division.id}
                      />
                    ))}
                  </Select>
                  {'permanentDivision' in errors && (
                    <FormControl.ErrorMessage>
                      {errors.permanentDivision}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
                {/* Select Permanent District */}
                <FormControl isInvalid={'permanentDistrict' in errors}>
                  <FormControl.Label style={styles.redLabel}>
                    Permanent District
                  </FormControl.Label>
                  <Select
                    selectedValue={permanentDistrict}
                    minWidth={200}
                    accessibilityLabel="Select Permanent District"
                    placeholder="Select Permanent District"
                    readOnly={true} // Prevent the keyboard from opening
                    onValueChange={(v) => selectDisP(v, setPermanentDistrict)}
                  >
                    {filteredDistrictListP.map((district) => (
                      <Select.Item
                        key={district.id}
                        label={district.name}
                        value={district.id}
                        readOnly={true} // Prevent the keyboard from opening
                      />
                    ))}
                    <Select.Item label="Please Select Division First" />
                  </Select>
                  {'permanentDistrict' in errors && (
                    <FormControl.ErrorMessage>
                      {errors.permanentDistrict}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>

                {/* Select Permanent Thana */}
                <FormControl isInvalid={'permanentThana' in errors}>
                  <FormControl.Label style={styles.redLabel}>
                    Permanent Thana
                  </FormControl.Label>
                  <Select
                    selectedValue={permanentThana}
                    minWidth={200}
                    accessibilityLabel="Select Permanent Thana"
                    placeholder="Select Permanent Thana"
                    onValueChange={(v) => selectThaP(v, setPermanentThana)}
                  >
                    {filterthanaListP.map((thana) => (
                      <Select.Item
                        key={thana.id}
                        label={thana.name}
                        readOnly={true} // Prevent the keyboard from opening
                        value={thana.id}
                      />
                    ))}
                    <Select.Item label="Please Select District First" />
                  </Select>
                  {'permanentThana' in errors && (
                    <FormControl.ErrorMessage>
                      {errors.permanentThana}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={'permanentAddress' in errors}>
                  <FormControl.Label style={styles.redLabel}>
                    Street Address
                  </FormControl.Label>
                  <Input
                    value={permanentAddress}
                    onChangeText={setPermanentAddress}
                    placeholder="House No, Road Number, Village Name"
                  />
                  {'permanentAddress' in errors && (
                    <FormControl.ErrorMessage>
                      {errors.permanentAddress}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>

                <Button
                  onPress={handleSignup}
                 // disabled={loading}
                  colorScheme={'blue'}
                >
                  {loading ? <Spinner /> : 'Go To Dashboard'}
                </Button>
              </VStack>
            </Box>
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: '18%',
    padding: 16,
    color: colorTwo,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
  },
  redLabel: {
  },
});

export default SignupForm;
