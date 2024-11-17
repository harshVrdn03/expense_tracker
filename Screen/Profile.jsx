import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../Components/Header';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthStore from '../Store/AuthStore';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import DataStore from '../Store/DataStore';

const Profile = ({route}) => {
  const [loading, setLoading] = useState(false);
  const {setUnAuthentication} = AuthStore();
  const {authUserInfo} = AuthStore();
  const {total} = DataStore();
  const navigation = useNavigation();
  const path = route?.params?.route;
  const removeAuth = async () => {
    try {
      await AsyncStorage.removeItem('a');
    } catch (error) {
      // console.error('Error removing authentication ID:', error);
    }
  };
  GoogleSignin.configure({
    webClientId:
      '11781049291-kkm566dldvjkekbri3vak3tts2g5d9vf.apps.googleusercontent.com',
    offlineAccess: true,
  });

  const signOut = async () => {
    setLoading(true);
    try {
      await auth().signOut();
      setUnAuthentication();
      removeAuth();
      GoogleSignin.revokeAccess();
      setLoading(false);
      navigation.navigate('Login');
    } catch (error) {
      setLoading(false);
      console.error('Sign-Out Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header path={'Profile'} />
      <View style={styles.cardContainer}>
        <View style={styles.header}>
          <View style={styles.profileImage}>
            {authUserInfo?.photo ? (
              <Image source={{uri: authUserInfo?.photo}} style={styles.Image} />
            ) : (
              ''
            )}
          </View>
          <View style={styles.headerText}>
            <Text style={styles.userName}>{authUserInfo?.name}</Text>
            {loading ? (
              <View style={styles.signOutButton}>
                <ActivityIndicator size="small" color="#fff" />
              </View>
            ) : (
              <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
                <Text style={styles.signOutText}>Sign Out</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Overview</Text>

        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>Income</Text>
              <Text style={styles.infoBelanceText}>₹{total.income}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>Spent</Text>
              <Text style={styles.infoBelanceText}>₹{total.spent}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>Amount</Text>
              <Text style={styles.infoBelanceText}>
                ₹{total.income - total.spent}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  cardContainer: {
    justifyContent: 'center',
    // padding: 20,
    paddingTop: 20,
    width: responsiveWidth(90), // Responsive width for the card
    borderRadius: 12,
    marginVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    borderWidth: 1.5,
    borderColor: '#42224A',
    borderRadius: 50,
    overflow: 'hidden',
  },
  Image: {
    width: 100,
    height: 100,
  },
  headerText: {
    color: '#42224A',
    marginLeft: 20,
  },
  userName: {
    color: '#42224A',
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  signOutButton: {
    backgroundColor: '#42224A',
    alignItems: 'center',
    padding: 8,
    borderRadius: 5,
    marginTop: 8,
  },
  signOutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.8),
  },
  sectionTitle: {
    color: '#42224A',
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    marginVertical: 15,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoBox: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
  },
  infoText: {
    fontSize: responsiveFontSize(1.8),
    color: '#42224A',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoBelanceText: {
    fontSize: 14,
    color: 'green',
  },
});
