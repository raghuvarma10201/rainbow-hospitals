import BasicHeader from '@/components/BasicHeader';
import { registerUser } from '@/services/authService';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import * as Yup from 'yup';
import { RootStackParamList } from './../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'RegistrationScreen'>;

const RegistrationScreen: React.FC<Props> = ({ navigation, route }) => {
  const { phoneNumber } = route.params; // Get phoneNumber from route params
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const registrationSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobile: Yup.string().matches(/^[6-9]\d{9}$/, 'Enter valid mobile number').required('Mobile number is required'),
    country: Yup.string().required('Country is required'),
    dob: Yup.date(),
    gender: Yup.string().required('Gender is required'),
    address: Yup.string().required('Address is required'),
    pincode: Yup.string().required('Pincode is required'),
    agree: Yup.boolean().oneOf([true], 'You must accept terms'),
    bloodGroup: Yup.string().required('Blood group is required'),
    rhFactor: Yup.string().required('RH factor is required'),
  });

  const handleSubmit = async (values: any) => {
    console.log('Submitted values:', values);
    try {
      const payload = {
        ForeName: values.title,
        MiddleName: values.firstName,
        LastName: values.lastName,
        Gender: values.gender,
        dtBirthDttm: values.dob,
        PhoneNo: values.mobile,
        MobileNo: values.mobile,
        EmailId: values.eamil,
        OrganisationUID: '8',
        MotherName: 'Test',
        Country: values.country,
        Bloodgroup: values.bloodGroup,
        RHfactor: values.rhFactor
      }
      const response = await registerUser(payload);
      console.log('Verify success:', response);
      if (response.status == 200) {
        console.log('Registration successful', response);
      }
    } catch (error) {
      console.error('Verify failed:', error);
    }
  };

  return (
    <ScrollView>
      <BasicHeader title="Registration" showBackButton />
      <View style={styles.container}>

        <Formik
          initialValues={{
            title: '',
            firstName: '',
            lastName: '',
            email: '',
            mobile: phoneNumber || '',
            country: '',
            dob: '',
            gender: '',
            address: '',
            pincode: '',
            agree: false,
            bloodGroup: '',
            rhFactor: '',
          }}
          validationSchema={registrationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue
          }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
              setFieldValue('agree', isEnabled);
            }, [setFieldValue]);

            return (
              <>
                <Text style={styles.label}>Title *</Text>
                <View >
                  <Picker style={styles.picker}
                    selectedValue={values.title}
                    onValueChange={value => setFieldValue('title', value)}
                  >
                    <Picker.Item label="Select Title" value="" />
                    <Picker.Item label="Mr" value="Mr" />
                    <Picker.Item label="Mrs" value="Mrs" />
                    <Picker.Item label="Miss" value="Miss" />
                  </Picker>
                </View>
                {touched.title && errors.title && <Text style={styles.error}>{errors.title}</Text>}

                <Text style={styles.label}>First Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter first name"
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                />
                {touched.firstName && errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}

                <Text style={styles.label}>Last Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter last name"
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                />
                {touched.lastName && errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

                <Text style={styles.label}>Email *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter email"
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

                <Text style={styles.label}>Mobile Number *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter mobile number"
                  keyboardType="numeric"
                  maxLength={10}
                  onChangeText={handleChange('mobile')}
                  onBlur={handleBlur('mobile')}
                  value={values.mobile}
                />
                {touched.mobile && errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}

                <Text style={styles.label}>Country *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter country"
                  onChangeText={handleChange('country')}
                  onBlur={handleBlur('country')}
                  value={values.country}
                />
                {touched.country && errors.country && <Text style={styles.error}>{errors.country}</Text>}

                <Text style={styles.label}>Date of Birth *</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
                  <Text>{values.dob ? new Date(values.dob).toLocaleDateString() : 'Select Date of Birth'}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    mode="date"
                    value={dob}
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) {
                        setDob(selectedDate);
                        setFieldValue('dob', selectedDate.toISOString());
                      }
                    }}
                  />
                )}
                {touched.dob && errors.dob && <Text style={styles.error}>{errors.dob}</Text>}

                <Text style={styles.label}>Gender *</Text>
                <View >
                  <Picker style={styles.picker}
                    selectedValue={values.gender}
                    onValueChange={value => setFieldValue('gender', value)}
                  >
                    <Picker.Item label="Select Gender" value="" />
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                    <Picker.Item label="Other" value="Other" />
                  </Picker>
                </View>
                {touched.gender && errors.gender && <Text style={styles.error}>{errors.gender}</Text>}

                <Text style={styles.label}>Blood Group *</Text>
                <View >
                  <Picker style={styles.picker}
                    selectedValue={values.bloodGroup}
                    onValueChange={value => setFieldValue('bloodGroup', value)}
                  >
                    <Picker.Item label="Select Blood Group" value="" />
                    <Picker.Item label="A" value="A" />
                    <Picker.Item label="B" value="B" />
                    <Picker.Item label="O" value="O" />
                    <Picker.Item label="AB" value="AB" />
                  </Picker>
                </View>
                {touched.bloodGroup && errors.bloodGroup && <Text style={styles.error}>{errors.bloodGroup}</Text>}

                <Text style={styles.label}>RH Factor *</Text>
                <View>
                  <Picker style={styles.picker}
                    selectedValue={values.rhFactor}
                    onValueChange={value => setFieldValue('rhFactor', value)}
                  >
                    <Picker.Item label="Select Rh Factor" value="" />
                    <Picker.Item label="positive" value="positive" />
                    <Picker.Item label="negative" value="negative" />
                  </Picker>
                </View>
                {touched.rhFactor && errors.rhFactor && <Text style={styles.error}>{errors.rhFactor}</Text>}

                <Text style={styles.label}>Address *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter address"
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values.address}
                />
                {touched.address && errors.address && <Text style={styles.error}>{errors.address}</Text>}

                <Text style={styles.label}>Pincode *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter pincode"
                  keyboardType="numeric"
                  onChangeText={handleChange('pincode')}
                  onBlur={handleBlur('pincode')}
                  value={values.pincode}
                />
                {touched.pincode && errors.pincode && <Text style={styles.error}>{errors.pincode}</Text>}

                <View style={styles.checkboxContainer}>
                  <Switch
                    value={isEnabled}
                    onValueChange={toggleSwitch}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                  />
                  <Text style={styles.checkboxLabel}>
                    By clicking here you agree to our{' '}
                    <Text style={{ textDecorationLine: 'underline', color: 'blue' }}>Terms of Service</Text> and{' '}
                    <Text style={{ textDecorationLine: 'underline', color: 'blue' }}>Privacy Policy</Text>
                  </Text>
                </View>
                {touched.agree && errors.agree && <Text style={styles.error}>{errors.agree}</Text>}

                <TouchableOpacity style={styles.button} onPress={handleSubmit as any}>
                  <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
              </>
            );
          }}
        </Formik>
      </View>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#9C27B0',
    borderRadius: 25,
    padding: 12,
    marginVertical: 8,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#9C27B0',
    borderRadius: 25,
    marginVertical: 8,
    paddingHorizontal: 8,
    padding: 12,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: '#9C27B0',
    borderRadius: 25,
    padding: 12,
    justifyContent: 'center',
    marginVertical: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  checkboxLabel: {
    marginLeft: 8,
    flex: 1,
    fontSize: 12,
  },
  button: {
    backgroundColor: '#7A1EA1',
    padding: 14,
    borderRadius: 0,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: '#f00',
    fontSize: 12,
    marginLeft: 4,
  },
  label: {
    marginTop: 10,
    marginBottom: 4,
    fontWeight: '600',
  }
});

export default RegistrationScreen;
