import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React from 'react';
import {
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as Yup from 'yup';
import { RootStackParamList } from '../../navigation/types';
import { loginWithMobile } from '../../services/authService';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login: React.FC<Props> = ({ navigation }) => {
  const mobileSchema = Yup.object().shape({
    mobile: Yup.string()
      .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')
      .required('Mobile number is required'),
  });

  const handleSubmit = async (values: { mobile: string }) => {
    try {
      const response = await loginWithMobile({ number: values.mobile });
      if (response.status === 200) {
        navigation.navigate('VerifyOtp', { phoneNumber: values.mobile });
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'android' ? -80 : 0} // optional
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require('../../assets/images/background.png')}
          style={styles.background}
          resizeMode="cover"
        >
          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <View style={styles.overlay}>
              <View style={styles.logo}>
                <Image source={require('../../assets/images/birthright-logo.png')} />
              </View>
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
          </ScrollView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  background: {
    height: '100%',
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  logo: {
    position: 'absolute',
    top: 60,
    left: 20,
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
    top: '45%',
    left: '8%',
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
    //backgroundColor : '#7E3A93',
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

export default Login;
