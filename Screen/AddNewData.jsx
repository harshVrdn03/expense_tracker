import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  DatePickerAndroid,
  ActivityIndicator,
  Alert,
  Platform,
  ToastAndroid,
} from 'react-native';
import Header from '../Components/Header';
import firestore from '@react-native-firebase/firestore';
import AuthStore from '../Store/AuthStore';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import uuid from 'react-native-uuid';
import DateTimePicker from '@react-native-community/datetimepicker';
import _ from 'lodash';

const AddNewData = ({route}) => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const data = route?.params?.itemName;
  const label = route?.params?.label;
  const {authUserInfo} = AuthStore();
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'android');
    setDate(currentDate);
    setShow(false);
  };

  const showToast = () => {
    ToastAndroid.show(
      'Please enter a valid number for the amount',
      ToastAndroid.SHORT,
    );
  };

  const addSpendData = async () => {
    setLoading(true);
    const number = _.toNumber(amount);

    if (isNaN(number) || !isFinite(number)) {
      showToast();
      setLoading(false);
      return;
    }

    const userDocument = firestore().collection('Users').doc(authUserInfo.id);

    userDocument
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          const userData = snapshot.data();
          const spentDataArray = userData.spentData || [];
          const incomeDataArray = userData.incomeData || [];

          if (!amount) {
            Alert.alert('Please enter an amount');
            return;
          }

          const newData = {
            id: uuid.v4(),
            category: data,
            amount: amount,
            note: note,
            date: date.toDateString(),
          };

          if (label === 'expend') {
            const updatedSpentData = [...spentDataArray, newData];
            return userDocument.update({
              spentData: updatedSpentData,
            });
          } else {
            const updatedIncomeData = [...incomeDataArray, newData];
            return userDocument.update({
              incomeData: updatedIncomeData,
            });
          }
        }
      })
      .catch(error => {
        console.error('Error updating user document:', error);
      })
      .finally(() => {
        setLoading(false);
        if (amount) {
          navigation.navigate('HomeTab');
        }
      });
  };

  const showDatePicker = async () => {
    setShow(!show);
  };

  return (
    <View style={styles.container}>
      <Header path={data} />
      {show && (
        <DateTimePicker
          testID="datetimepicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Amount:</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={text => setAmount(text)}
          placeholderTextColor={'grey'}
          placeholder="Enter amount"
          keyboardType="number-pad"
        />

        <Text style={styles.label}>Note:</Text>
        <TextInput
          style={styles.input}
          value={note}
          onChangeText={text => setNote(text)}
          placeholderTextColor={'grey'}
          placeholder="Enter note"
          multiline
        />

        <Text style={styles.label}>Date:</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={showDatePicker}>
          <Text style={styles.datePickerButtonText}>{date.toDateString()}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={addSpendData}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.saveButtonText}>Save</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AddNewData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  label: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#42224A',
  },
  input: {
    height: responsiveHeight(4.5),
    borderColor: '#8F659A',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#42224A',
    shadowColor: '#42224A',
    // shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  datePickerButton: {
    height: responsiveHeight(4.5),
    borderColor: '#8F659A',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#8F659A',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  datePickerButtonText: {
    color: '#42224A',
  },
  saveButton: {
    backgroundColor: '#42224A',
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(4.5),
    margin: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
});
