import { loginWithMobile, verifyOtp } from '@/services/authService';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import * as Yup from 'yup';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'VerifyOtp'>;

const VerifyOtp: React.FC<Props> = ({ navigation, route }) => {
    const { phoneNumber } = route.params;
    const [counter, setCounter] = useState(30); // Countdown timer
    const otpInputRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setCounter((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleResend = async () => {
        console.log('Resend mobile:', phoneNumber);
        // handle navigation or API call here
        try {
            const payload = {
                number: phoneNumber
            }
            let response = await loginWithMobile(payload); // ✅ You're using it
            console.log('Login success:', response);
            if (response.status === 200) {
                setCounter(30);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }

        // Trigger resend OTP API here
    };

    const handleOtpCall = async (values: { mobile: string }) => {
        // Trigger OTP call logic
    };

    const handleSubmit = async (values: { otp: string }) => {
        console.log('Submitted otp:', values.otp);
        // handle navigation or API call here
        try {
          const payload = {
            number: phoneNumber,
            otp : values.otp
          }
          const response = await verifyOtp(payload); // ✅ You're using it
          console.log('Verify success:', response);
          if(response.status === 200){
            await AsyncStorage.setItem('isLoggedIn', 'true');
            navigation.navigate('Home', {  });
          }
        } catch (error) {
          console.error('Verify failed:', error);
        }
      };
    return (
        <Formik
            initialValues={{ otp: '' }}
            validationSchema={Yup.object({
                otp: Yup.string()
                    .length(6, 'OTP must be 6 digits')
                    .required('OTP is required'),
            })}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
                <View style={styles.container}>
                    {/* Header Back Arrow */}
                    <TouchableOpacity onPress={() => ''} style={styles.backIcon}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>

                    {/* Heading */}
                    <Text style={styles.heading}>Enter the 6-digit OTP sent to</Text>
                    <Text style={styles.phone}>+91 {phoneNumber}</Text>

                    {/* OTP Input */}
                    <OTPTextView
                        ref={otpInputRef}
                        handleTextChange={handleChange('otp')}
                        inputCount={6}
                        keyboardType="numeric"
                        containerStyle={styles.otpContainer}
                        textInputStyle={styles.otpInput}
                        tintColor="#8a3ab9"
                    />
                    {touched.otp && errors.otp && (
                        <Text style={styles.errorText}>{errors.otp}</Text>
                    )}

                    {/* Resend section */}
                    <View style={styles.resendContainer}>
                        <Text style={styles.greyText}>Didn&apos;t receive the code? </Text>
                        <TouchableOpacity onPress={handleResend} disabled={counter !== 0}>
                            <Text style={[styles.resendText, counter !== 0 && { color: 'grey' }]}>
                                Resend
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.timerText}>
                            {counter !== 0 ? `  00:${counter < 10 ? `0${counter}` : counter}` : ''}
                        </Text>
                    </View>

                    {/* OTP Call */}
                    <TouchableOpacity onPress={handleOtpCall as any}>
                        <Text style={styles.callOtp}>Get OTP on call</Text>
                    </TouchableOpacity>

                    {/* Continue Button */}
                    <TouchableOpacity style={styles.continueBtn} onPress={handleSubmit as any}>
                        <Text style={styles.continueText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'white',
    },
    backIcon: {
        marginBottom: 24,
    },
    heading: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
    phone: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 8,
    },
    otpContainer: {
        marginTop: 20,
        alignSelf: 'center',
    },
    otpInput: {
        borderBottomWidth: 2,
        borderColor: '#8a3ab9',
        width: 40,
        height: 50,
        fontSize: 20,
        marginHorizontal: 5,
        textAlign: 'center',
        color: '#000',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
        alignSelf: 'center',
    },
    resendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        alignSelf: 'center',
    },
    greyText: {
        color: 'grey',
        fontSize: 14,
    },
    resendText: {
        fontWeight: '600',
        color: '#5a2d82',
        fontSize: 14,
    },
    timerText: {
        color: 'grey',
        fontSize: 14,
    },
    callOtp: {
        marginTop: 12,
        color: '#5a2d82',
        textAlign: 'center',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    continueBtn: {
        marginTop: 'auto',
        backgroundColor: '#792c8c',
        paddingVertical: 16,
        borderRadius: 0,
        alignItems: 'center',
    },
    continueText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default VerifyOtp;
