import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { RootStackParamList } from '../navigation/types';
import login from './authentication/login';
import VerifyOtp from './authentication/verify-otp';
import Dashboard from './dashboard';
import Doctors from './doctors';
import Home from './home';
import RegistrationScreen from './registration';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
       <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={login} options={{ headerShown: false }} />
        <Stack.Screen name="VerifyOtp" component={VerifyOtp} options={{ headerShown: false }} />
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
         <Stack.Screen name="Doctors" component={Doctors} options={{ headerShown: false }} />
         <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
