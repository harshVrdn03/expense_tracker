import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigation from './BottomNavigation';
import AddNewData from '../Screen/AddNewData';
import Statistics from '../Screen/Statistics';
import TopNavigation from './TopNavigation';
import Login from '../Screen/Login';
import AuthStore from '../Store/AuthStore';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from '../Screen/Profile';

const Stack = createStackNavigator();

const RouteNavigation = () => {
  const {
    isAuthenticated,
    setAuthentication,
    setUnAuthentication,
    setAuthUserInfo,
  } = AuthStore();
  const storeData = async () => {
    try {
      const data = await AsyncStorage.getItem('authUserId');
      setAuthUserInfo(JSON.parse(data));
    } catch (error) {
    }
  };
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        storeData();
        setAuthentication();
        navigation.navigate('Home');
      } else {
        // User is signed out
        setUnAuthentication();
        navigation.navigate('Login');
      }
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isAuthenticated ? 'Home' : 'Login'}>
      {!isAuthenticated ? (
        <Stack.Screen name="Login" component={Login} />
      ) : (
        <>
          <Stack.Screen name="Home" component={BottomNavigation} />
          {/* Uncomment the line below if you want to display TopNavigation when authenticated */}
          {/* <Stack.Screen name="Home" component={TopNavigation} /> */}
          <Stack.Screen name="AddNewData" component={AddNewData} />
          <Stack.Screen name="Statistics" component={Statistics} />
          <Stack.Screen name="Profile" component={Profile} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RouteNavigation;
