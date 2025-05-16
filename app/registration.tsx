import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import * as Yup from 'yup';

const RegistrationScreen = () => {
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const registrationSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobile: Yup.string().matches(/^[6-9]\d{9}$/, 'Enter valid mobile number').required('Mobile number is required'),
    country: Yup.string().required('Country is required'),
    dob: Yup.date().required('Date of Birth is required'),
    gender: Yup.string().required('Gender is required'),
    address: Yup.string().required('Address is required'),
    pincode: Yup.string().required('Pincode is required'),
    agree: Yup.boolean().oneOf([true], 'You must accept terms'),
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Registration</Text>
      <Formik
        initialValues={{
          title: '',
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          country: '',
          dob: '',
          gender: '',
          address: '',
          pincode: '',
          agree: false
        }}
        validationSchema={registrationSchema}
        onSubmit={(values) => {
          console.log('Form Data:', values);
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
        }) => (
          <>
            <Text style={styles.label}>Title *</Text>
            <View style={styles.picker}>
              <Picker
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

            <TextInput
              style={styles.input}
              placeholder="Enter first name"
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
            />
            {touched.firstName && errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Enter last name"
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
            />
            {touched.lastName && errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Enter email"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

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

            <TextInput
              style={styles.input}
              placeholder="Enter country"
              onChangeText={handleChange('country')}
              onBlur={handleBlur('country')}
              value={values.country}
            />
            {touched.country && errors.country && <Text style={styles.error}>{errors.country}</Text>}

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

            <View style={styles.picker}>
              <Picker
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

            <TextInput
              style={styles.input}
              placeholder="Enter address"
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
            />
            {touched.address && errors.address && <Text style={styles.error}>{errors.address}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Enter pincode"
              keyboardType="numeric"
              onChangeText={handleChange('pincode')}
              onBlur={handleBlur('pincode')}
              value={values.pincode}
            />
            {touched.pincode && errors.pincode && <Text style={styles.error}>{errors.pincode}</Text>}

            {/* <View style={styles.checkboxContainer}>
              <CheckBox
                value={values.agree}
                onValueChange={(val: any) => setFieldValue('agree', val)}
              />
              <Text style={styles.checkboxLabel}>
                By clicking here you agree to our{' '}
                <Text style={{ textDecorationLine: 'underline', color: 'blue' }}>Terms of Service</Text> and{' '}
                <Text style={{ textDecorationLine: 'underline', color: 'blue' }}>Privacy Policy</Text>
              </Text>
            </View>
            {touched.agree && errors.agree && <Text style={styles.error}>{errors.agree}</Text>} */}

            <TouchableOpacity style={styles.button} onPress={handleSubmit as any}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
    borderRadius: 25,
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
