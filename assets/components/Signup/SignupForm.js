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
} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import ProfileCard from '../ProfilePage/ProfileCard';
import { colorTwo, serverURL } from '../../../Global';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';


const SignupForm = ({ data, route, alertT }) => {

  useEffect(() => {
    getAddress();
  }, []);

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
        .get(serverURL + 'getAddress')
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

  function selectDiv(id,setter) {
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

    if (!religion) {
      errors.religion = 'Please tell us your Religion!';
    }
    if (!dateOfBirth) {
      errors.dateOfBirth = 'Don’t forget to tell us your Birth Date!';
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
      errors.presentAddress = 'Present address is required';
    }
    if (!presentThana) {
      errors.presentThana = 'Present Thana is required';
    }
    if (!presentDistrict) {
      errors.presentDistrict = 'Present District is required';
    }
    if (!presentDivision) {
      errors.presentDivision = 'Present Division is required';
    }
    if (!permanentAddress) {
      errors.permanentAddress = 'Permanent address is required';
    }
    if (!permanentThana) {
      errors.permanentThana = 'Permanent Thana is required';
    }
    if (!permanentDistrict) {
      errors.permanentDistrict = 'Permanent District is required';
    }
    if (!permanentDivision) {
      errors.permanentDivision = 'Permanent Division is required';
    }

    return errors;
  };

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
        studentName,
        studentNamebn,
        fatherName,
        motherName,
        religion,
        dateOfBirth,
        bloodGroup,
        profilePhoto,
        phone,
        email,
        presentAddress,
        presentThana,
        presentDistrict,
        presentDivision,
        permanentAddress,
        permanentThana,
        permanentDistrict,
        permanentDivision,
      };

      // Call the function to send data to the API
      sendFormDataToAPI(formData);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View>
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
                  <Heading size={'sm'}>
                    You need to save some essential information in Britto.
                  </Heading>
                </Badge>
                {/* Student Name */}
                {!receivedPhoto && (
                  <Badge colorScheme="info" alignSelf="center">
                    {receivedPhoto}
                  </Badge>
                )}

                <FormControl isInvalid={'studentName' in errors}>
                  <FormControl.Label>Student Name (English)</FormControl.Label>
                  <Input
                    value={studentName}
                    onChangeText={setStudentName}
                    placeholder="Enter student name"
                    isReadOnly
                  />
                  {'studentName' in errors && (
                    <FormControl.ErrorMessage>
                      {errors.studentName}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>

                {/* Student Name in Bangla */}
                <FormControl isInvalid={'studentNamebn' in errors}>
                  <FormControl.Label>Student Name (Bangla)</FormControl.Label>
                  <Input
                    value={studentNamebn}
                    onChangeText={setStudentNamebn}
                    isReadOnly
                    placeholder="Enter student name in Bangla"
                  />
                  {'studentNamebn' in errors && (
                    <FormControl.ErrorMessage>
                      {errors.studentNamebn}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
                {/* Phone */}
                <FormControl isInvalid={'phone' in errors}>
                  <FormControl.Label>Phone Number</FormControl.Label>
                  <Input
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    maxLength={11}
                    placeholder="Enter Your Running Phone Number"
                  />
                  {'phone' in errors && (
                    <FormControl.ErrorMessage>
                      {errors.phone}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
                {/* Email */}
                <FormControl isInvalid={'email' in errors}>
                  <FormControl.Label>Email Address</FormControl.Label>
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
                  <FormControl.Label>Date of Birth</FormControl.Label>
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
                  <FormControl.Label>Blood Group</FormControl.Label>
                  <Select
                    selectedValue={bloodGroup}
                    minWidth={200}
                    accessibilityLabel="Select Religion"
                    placeholder="Select Religion"
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
                  <FormControl.Label>Religion</FormControl.Label>
                  <Select
                    selectedValue={religion}
                    minWidth={200}
                    accessibilityLabel="Select Religion"
                    placeholder="Select Religion"
                    readOnly={true} // Prevent the keyboard from opening
                    onValueChange={setReligion}
                  >
                    <Select.Item label="Islam" value="1" />
                    <Select.Item label="Hinduism" value="1" />
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
                <FormControl isInvalid={'presentDivision' in errors}>
                  <FormControl.Label>Present Division</FormControl.Label>
                  <Select
                    selectedValue={presentDivision}
                    minWidth={200}
                    accessibilityLabel="Select Present Division"
                    placeholder="Select Present Division"
                    onValueChange={(v) => selectDiv(v, setPresentDivision)}
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

                  {'presentDivision' in errors && (
                    <FormControl.ErrorMessage>
                      {errors.presentDivision}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
                {/* Select Present District */}
                <FormControl isInvalid={'presentDistrict' in errors}>
                  <FormControl.Label>Present District</FormControl.Label>
                  <Select
                    selectedValue={presentDistrict}
                    minWidth={200}
                    accessibilityLabel="Select Present District"
                    placeholder="Select Present District"
                    readOnly={true} // Prevent the keyboard from opening
                    onValueChange={(v) => selectDis(v, setPresentDistrict)}
                  >
                    {filteredDistrictList.map((district) => (
                      <Select.Item
                        key={district.id}
                        label={district.name}
                        value={district.id}
                      />
                    ))}
                    <Select.Item label="Please Select Division First" />
                  </Select>
                </FormControl>

                {/* Select Present Thana */}
                <FormControl isInvalid={'presentThana' in errors}>
                  <FormControl.Label>Present Thana</FormControl.Label>
                  <Select
                    selectedValue={presentThana}
                    minWidth={200}
                    accessibilityLabel="Select Present Thana"
                    readOnly={true} // Prevent the keyboard from opening
                    placeholder="Select Present Thana"
                    onValueChange={(v) => selectTha(v, setPresentThana)}
                  >
                    {filterthanaList.map((thana) => (
                      <Select.Item
                        key={thana.id}
                        label={thana.name}
                        value={thana.id}
                      />
                    ))}
                    <Select.Item label="Please Select District First" />
                  </Select>
                  {'presentThana' in errors && (
                    <FormControl.ErrorMessage>
                      {errors.presentThana}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>

                {/* Present Address */}
                <FormControl isInvalid={'presentAddress' in errors}>
                  <FormControl.Label>Present Address</FormControl.Label>
                  <Input
                    value={presentAddress}
                    onChangeText={setPresentAddress}
                    placeholder="Hall Room No, House No, Road No ..."
                  />
                  {'presentAddress' in errors && (
                    <FormControl.ErrorMessage>
                      {errors.presentAddress}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
                <Divider />
                <Badge colorScheme={'info'}>
                  <Heading size={'sm'}>Permanent Address</Heading>
                </Badge>

                {/* Permanent Address */}

                {/* Select Permanent Division */}
                <FormControl isInvalid={'permanentDivision' in errors}>
                  <FormControl.Label>Permanent Division</FormControl.Label>
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
                  <FormControl.Label>Permanent District</FormControl.Label>
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
                  <FormControl.Label>Permanent Thana</FormControl.Label>
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

                {/* Select Present Union */}
                <FormControl isInvalid={'presentThana' in errors}>
                  <FormControl.Label>Permanent Union</FormControl.Label>
                  <Select
                    selectedValue={presentUnion}
                    readOnly={true} // Prevent the keyboard from opening
                    minWidth={200}
                    accessibilityLabel="Select Present Union"
                    placeholder="Select Present Union"
                    onValueChange={setPresentUnion}
                  >
                    {filterunionList.map((thana) => (
                      <Select.Item
                        key={thana.id}
                        label={thana.name}
                        value={thana.id}
                      />
                    ))}
                    <Select.Item label="Please Select District First" />
                  </Select>
                  {'presentThana' in errors && (
                    <FormControl.ErrorMessage>
                      {errors.presentThana}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={'permanentAddress' in errors}>
                  <FormControl.Label>Street Address</FormControl.Label>
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
                  disabled={Object.keys(errors).length > 0}
                >
                  Sign Up
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
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
});

export default SignupForm;
