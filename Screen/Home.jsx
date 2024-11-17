import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import HomeCard from '../Components/HomeCard';
import ItemCard from '../Components/ItemCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import AuthStore from '../Store/AuthStore';
import firestore from '@react-native-firebase/firestore';
import DataStore from '../Store/DataStore';
import _ from 'lodash';
import ModalStore from '../Store/ModalStore';
import DeleteModal from '../Components/DeleteModal';
import Filter from '../Components/Filter';
const Home = () => {
  const navigation = useNavigation();
  const { authUserInfo } = AuthStore();
  const { spentData, setSpentData } = DataStore();
  const { incomeData, setIncomeData, total, setTotalIncome, setTotalSpent } =
    DataStore();

  const groupedByDateOfSpent = _.groupBy(spentData, 'date');
  const transformedData = _.map(groupedByDateOfSpent, (data, date) => ({
    date,
    data,
  }));
  const { deleteModalVisible, setDeleteModalVisible } = ModalStore();
  const { deleteId, setDeleteId } = ModalStore();

  const deleteHandler = transaction => {
    setDeleteId(transaction);
    setDeleteModalVisible(true);
    // Alert.alert(`Delete ${category}`)
  };
  useEffect(() => {
    const userDocument = firestore().collection('Users').doc(authUserInfo?.id);

    const unsubscribe = userDocument.onSnapshot(snapshot => {
      const userData = snapshot.data();

      const spentDataArray = userData?.spentData || [];
      const incomeDataArray = userData?.incomeData || [];
      setIncomeData(incomeDataArray);
      setSpentData(spentDataArray);
    });
    return () => unsubscribe();
  }, [authUserInfo?.id]);

  const getGreeting = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour < 12) {
      return 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  const calculateTotalSpentAmount = () => {
    const totalAmount = spentData.reduce((acc, item) => {
      return acc + parseInt(item.amount); // Assuming "amount" is a string, converting to integer for addition
    }, 0);
    // setTotalSpent(totalAmount);
    return totalAmount;
  };

  const calculateTotalIncomeAmount = () => {
    const totalAmount = incomeData.reduce((acc, item) => {
      return acc + parseInt(item.amount); // Assuming "amount" is a string, converting to integer for addition
    }, 0);

    return totalAmount;
  };

  const availableAmount = total.income - total.spent;

  useEffect(() => {
    setTotalSpent(calculateTotalSpentAmount());
    setTotalIncome(calculateTotalIncomeAmount());
  }, [spentData]);

  const handleHomeCard = () => {
    navigation.navigate('Statistics');
  };

  const homeCardData = {
    availableAmount: availableAmount,
    income: total.income,
    spent: total.spent,
  };

  console.log(spentData);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.userName}>{authUserInfo?.name}</Text>
        </View>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => navigation.navigate('Profile')}>
          {authUserInfo?.photo ? (
            <Image
              source={{ uri: authUserInfo?.photo }}
              style={styles.profileImage}
            />
          ) : (
            ''
          )}
        </TouchableOpacity>
      </View>
      {deleteModalVisible && <DeleteModal />}
      <Filter />
      <TouchableWithoutFeedback onPress={handleHomeCard}>
        <View style={styles.homeCard}>
          <HomeCard cardData={homeCardData} />
        </View>
      </TouchableWithoutFeedback>

      {transformedData && transformedData.length > 0 ? (
        <ScrollView style={styles.spentContainer}>
          {transformedData
            .map((card, index) => (
              <View key={index} style={styles.cardList}>
                {/* Display the date */}
                <Text style={styles.date}>{card.date}</Text>

                {/* Map over the data array to render ItemCard components */}
                {card.data
                  .map((transaction, transactionIndex) => (
                    <TouchableOpacity
                      key={transactionIndex}
                      onPress={() => deleteHandler(transaction)}>
                      <View style={{ marginBottom: 5 }}>
                        <ItemCard
                          key={transactionIndex}
                          itemId={transaction.id}
                          itemName={transaction.category}
                          itemNote={transaction.note}
                          itemSpent={transaction.amount}
                        />
                      </View>
                    </TouchableOpacity>
                  ))
                  .reverse()}
              </View>
            ))
            .reverse()}
        </ScrollView>
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.nodata}>No History</Text>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    height: responsiveHeight(8),
    alignItems: 'center',
  },
  header: {
    flex: 1,
  },
  greeting: {
    fontSize: responsiveFontSize(1.8),
    color: 'grey',
  },
  userName: {
    fontSize: responsiveFontSize(2.5),
    color: '#42224A',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  profileImage: {
    width: responsiveWidth(11),
    height: responsiveHeight(5),
    // borderRadius: 25,
  },
  headerIcon: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#42224A',
    overflow: 'hidden',
  },
  homeCard: {
    marginVertical: 20,
    justifyContent: 'center',
  },

  date: {
    color: 'grey',
    marginBottom: 5,
    paddingHorizontal: 20,
    fontSize: responsiveFontSize(1.6),
    fontWeight: '500',
  },
  noDataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodata: {
    color: 'grey',
    fontWeight: '400',
    fontSize: responsiveFontSize(1.5),
  },
});
