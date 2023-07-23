import React, { useState } from 'react';
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
} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import ProfileCard from '../ProfilePage/ProfileCard';
import { colorTwo } from '../../../Global';

// Sample data for Thana, District, and Division
const thanaList = ['Thana A', 'Thana B', 'Thana C', 'Thana D'];
const districtList = ['District X', 'District Y', 'District Z'];
const divisionList = ['Division 1', 'Division 2', 'Division 3'];

const SignupForm = ({ data, route }) => {
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

  // Step 2: Address Information
  const [presentAddress, setPresentAddress] = useState('');
  const [presentThana, setPresentThana] = useState('');
  const [presentDistrict, setPresentDistrict] = useState('');
  const [presentDivision, setPresentDivision] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [permanentThana, setPermanentThana] = useState('');
  const [permanentDistrict, setPermanentDistrict] = useState('');
  const [permanentDivision, setPermanentDivision] = useState('');

  const handleProfilePhotoUpload = () => {
    // ... (same as before)
  };

  const validateStep1 = () => {
    const errors = {};
    if (!studentName) {
      errors.studentName = 'Student name is required';
    }
    if (!studentNamebn) {
      errors.studentNamebn = 'Student name in Bangla is required';
    }
   
    if (!religion) {
      errors.religion = 'Religion is required';
    }
    if (!dateOfBirth) {
      errors.dateOfBirth = 'Date of Birth is required';
    }
    if (!bloodGroup) {
      errors.bloodGroup = 'Blood Group is required';
    }
    if (!profilePhoto) {
      errors.profilePhoto = 'Profile Photo is required';
    }
    if (!phone) {
      errors.phone = 'Phone number is required';
    }
    if (!email) {
      errors.email = 'Email is required';
    }

    return errors;
  };

  const handleStep1Next = () => {
    const errors = validateStep1();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
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
    <View>
      {currentStep === 1 && (
        <View>
          {/* Profile Photo Upload */}
          <Box alignItems="center" my={4}>
            <ProfileCard
              photo={'https://v2.result.du.ac.bd/assets/student.png'}
              name={data['student-profile'].name_en}
              dept={data['student-profile']['aca-body']}
                          hall={data['student-profile']['hall-name']}
                          id={route.reg}
            />
            <Button onPress={handleProfilePhotoUpload} my={2}>
              {profilePhoto ? 'Change Profile Photo' : 'Select Profile Photo'}
            </Button>
          </Box>
          <Box style={styles.container}>
            <VStack space={4}>
              {/* Student Name */}
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
              <Button
                onPress={handleStep1Next}
                disabled={Object.keys(errors).length > 0}
                bg={colorTwo}
              >
                Next {Object.keys(errors).length}
              </Button>
            </VStack>
          </Box>
        </View>
      )}

      {currentStep === 2 && (
        <View>
          <Box mt={4} style={styles.container}>
            <VStack space={4}>
              {/* Present Address */}
              <FormControl isRequired isInvalid={'presentAddress' in errors}>
                <FormControl.Label>Present Address</FormControl.Label>
                <Input
                  value={presentAddress}
                  onChangeText={setPresentAddress}
                  placeholder="Enter present address"
                />
                {'presentAddress' in errors && (
                  <FormControl.ErrorMessage>
                    {errors.presentAddress}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              {/* Select Present Thana */}
              <FormControl isRequired isInvalid={'presentThana' in errors}>
                <FormControl.Label>Present Thana</FormControl.Label>
                <Select
                  selectedValue={presentThana}
                  minWidth={200}
                  accessibilityLabel="Select Present Thana"
                  placeholder="Select Present Thana"
                  onValueChange={setPresentThana}
                >
                  {thanaList.map((thana) => (
                    <Select.Item key={thana} label={thana} value={thana} />
                  ))}
                </Select>
                {'presentThana' in errors && (
                  <FormControl.ErrorMessage>
                    {errors.presentThana}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              {/* Select Present District */}
              <FormControl isRequired isInvalid={'presentDistrict' in errors}>
                <FormControl.Label>Present District</FormControl.Label>
                <Select
                  selectedValue={presentDistrict}
                  minWidth={200}
                  accessibilityLabel="Select Present District"
                  placeholder="Select Present District"
                  onValueChange={setPresentDistrict}
                >
                  {districtList.map((district) => (
                    <Select.Item
                      key={district}
                      label={district}
                      value={district}
                    />
                  ))}
                </Select>
                {'presentDistrict' in errors && (
                  <FormControl.ErrorMessage>
                    {errors.presentDistrict}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              {/* Select Present Division */}
              <FormControl isRequired isInvalid={'presentDivision' in errors}>
                <FormControl.Label>Present Division</FormControl.Label>
                <Select
                  selectedValue={presentDivision}
                  minWidth={200}
                  accessibilityLabel="Select Present Division"
                  placeholder="Select Present Division"
                  onValueChange={setPresentDivision}
                >
                  {divisionList.map((division) => (
                    <Select.Item
                      key={division}
                      label={division}
                      value={division}
                    />
                  ))}
                </Select>
                {'presentDivision' in errors && (
                  <FormControl.ErrorMessage>
                    {errors.presentDivision}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              {/* Permanent Address */}
              <FormControl isRequired isInvalid={'permanentAddress' in errors}>
                <FormControl.Label>Permanent Address</FormControl.Label>
                <Input
                  value={permanentAddress}
                  onChangeText={setPermanentAddress}
                  placeholder="Enter permanent address"
                />
                {'permanentAddress' in errors && (
                  <FormControl.ErrorMessage>
                    {errors.permanentAddress}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              {/* Select Permanent Thana */}
              <FormControl isRequired isInvalid={'permanentThana' in errors}>
                <FormControl.Label>Permanent Thana</FormControl.Label>
                <Select
                  selectedValue={permanentThana}
                  minWidth={200}
                  accessibilityLabel="Select Permanent Thana"
                  placeholder="Select Permanent Thana"
                  onValueChange={setPermanentThana}
                >
                  {thanaList.map((thana) => (
                    <Select.Item key={thana} label={thana} value={thana} />
                  ))}
                </Select>
                {'permanentThana' in errors && (
                  <FormControl.ErrorMessage>
                    {errors.permanentThana}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              {/* Select Permanent District */}
              <FormControl isRequired isInvalid={'permanentDistrict' in errors}>
                <FormControl.Label>Permanent District</FormControl.Label>
                <Select
                  selectedValue={permanentDistrict}
                  minWidth={200}
                  accessibilityLabel="Select Permanent District"
                  placeholder="Select Permanent District"
                  onValueChange={setPermanentDistrict}
                >
                  {districtList.map((district) => (
                    <Select.Item
                      key={district}
                      label={district}
                      value={district}
                    />
                  ))}
                </Select>
                {'permanentDistrict' in errors && (
                  <FormControl.ErrorMessage>
                    {errors.permanentDistrict}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              {/* Select Permanent Division */}
              <FormControl isRequired isInvalid={'permanentDivision' in errors}>
                <FormControl.Label>Permanent Division</FormControl.Label>
                <Select
                  selectedValue={permanentDivision}
                  minWidth={200}
                  accessibilityLabel="Select Permanent Division"
                  placeholder="Select Permanent Division"
                  onValueChange={setPermanentDivision}
                >
                  {divisionList.map((division) => (
                    <Select.Item
                      key={division}
                      label={division}
                      value={division}
                    />
                  ))}
                </Select>
                {'permanentDivision' in errors && (
                  <FormControl.ErrorMessage>
                    {errors.permanentDivision}
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
