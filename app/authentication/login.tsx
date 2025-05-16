// MobileNumberScreen.tsx
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';
import { RootStackParamList } from '../../navigation/types';
import { loginWithMobile } from '../../services/authService';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const login: React.FC<Props> = ({ navigation }) => {
  const mobileSchema = Yup.object().shape({
    mobile: Yup.string()
      .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')
      .required('Mobile number is required'),
  });

  const handleSubmit = async (values: { mobile: string }) => {
    console.log('Submitted mobile:', values.mobile);
    // handle navigation or API call here
    try {
      const payload = {
        number: values.mobile
      }
      const response = await loginWithMobile(payload); // ✅ You're using it
      console.log('Login success:', response);
      if(response.status == 200){
        navigation.navigate('VerifyOtp', { phoneNumber: values.mobile });
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')} // Replace with actual image
      style={styles.background}
      resizeMode="cover"

    >
      <View style={styles.overlay}>
        <Text style={styles.logoText}>BirthRight</Text>
        <Text style={styles.subText}>BY RAINBOW HOSPITALS</Text>
        <Text style={styles.tagline}>Your Right to a Safe Delivery</Text>

        <View style={styles.titleHeader}>
          <Text style={styles.title}>No. 1 Hospital in</Text>
          <Text style={styles.subtitle}>Child and Women Care in India</Text>
        </View>

        <View style={styles.formContainer}>
          <Formik
            initialValues={{ mobile: '' }}
            validationSchema={mobileSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <Text style={styles.inputLabel}>Lets get started! Enter your mobile number</Text>
                <View style={styles.inputWrapper}>
                  <Text style={styles.prefix}>+91</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    maxLength={10}
                    placeholder="Enter mobile number"
                    onChangeText={handleChange('mobile')}
                    onBlur={handleBlur('mobile')}
                    value={values.mobile}
                  />
                </View>
                {touched.mobile && errors.mobile && (
                  <Text style={styles.errorText}>{errors.mobile}</Text>
                )}

                <TouchableOpacity style={styles.signInLink}>
                  <Text style={styles.linkText}>Trouble signing in?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleSubmit as any}>
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    overflow: 'hidden'
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  logoText: {
    position: 'absolute',
    top: 60,
    left: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7A1EA1',
  },
  subText: {
    position: 'absolute',
    top: 90,
    left: 20,
    fontSize: 12,
    color: '#333',
  },
  tagline: {
    position: 'absolute',
    top: 105,
    left: 20,
    fontSize: 12,
    fontStyle: 'italic',
    color: '#555',
  },
  titleHeader: {
    position: 'absolute',
    bottom: '40%'

  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6D6D6D',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6D6D6D',
    marginBottom: 30,
  },
  formContainer: {
    //backgroundColor: '#7A1EA1',
    padding: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  inputLabel: {
    color: '#fff',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  prefix: {
    marginRight: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  errorText: {
    color: '#FFDADA',
    marginTop: 5,
    fontSize: 12,
  },
  signInLink: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  linkText: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#7A1EA1',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default login;
