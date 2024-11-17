import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  ActivityIndicator, // Import ActivityIndicator for the loading UI
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AuthStore from '../Store/AuthStore';
import firestore from '@react-native-firebase/firestore';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const Login = () => {
  const navigation = useNavigation();
  const {setAuthentication, setAuthUserInfo} = AuthStore();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '11781049291-kkm566dldvjkekbri3vak3tts2g5d9vf.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const addData = async (user, userId) => {
    const userDocument = await firestore().collection('Users').doc(userId);

    userDocument
      .set({...user}, {merge: true})
      .then(() => {})
      .catch(error => {
        console.error('Error adding user data: ', error);
      });
  };

  const setAuth = async auth => {
    try {
      await AsyncStorage.setItem('a', auth);
    } catch (error) {
      console.error('Error storing authentication ID:', error);
    }
  };

  async function onGoogleButtonPress() {
    try {
      setLoading(true);

      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken, user} = await GoogleSignin.signIn();
      try {
        await AsyncStorage.setItem('authUserId', JSON.stringify(user));
      } catch (error) {
        console.error('Error storing authentication ID:', error);
      }
      addData(user, user.id);
      setAuthentication();
      setAuthUserInfo(user);
      setAuth('true');
      navigation.navigate('Home');
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.backgroundImage}>
      <View style={styles.logo}>
        <View style={styles.expContianer}>
          <Text style={styles.exp}>Budget</Text>
          <View style={styles.sharpCorner}>
            <Text style={styles.man}>Tracker</Text>
          </View>
        </View>
        <View style={styles.subContianer}>
          <Text style={styles.sub}>Income & Expense</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.redContainer}>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={onGoogleButtonPress}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.googleText}>Sign in with Google</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: '#8F659A',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  redContainer: {
    alignItems: 'center',
    marginBottom: responsiveHeight(15),
  },
  googleButton: {
    width: responsiveWidth(90),
    borderWidth: 1,
    borderColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
  },
  googleText: {
    fontSize: responsiveScreenFontSize(1.8),
    fontWeight: 'bold',
    color: '#ffffff',
    opacity: 1,
    textAlign: 'center',
  },
  logo: {
    top: 180,
  },
  expContianer: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  exp: {
    fontSize: responsiveFontSize(6.3),
    fontWeight: '800',
    color: '#000000',
  },
  sharpCorner: {
    paddingHorizontal: 10,
    borderColor: '#fff',
    borderWidth: 1,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  man: {
    fontSize: responsiveFontSize(6.3),
    fontWeight: '800',
    textAlign: 'center',
    color: '#ffffff',
  },
  subContianer: {
    alignItems: 'center',
  },
  sub: {
    fontSize: responsiveFontSize(2.1),
    fontWeight: '500',
    color: '#ffffff',
  },
});

export default Login;
