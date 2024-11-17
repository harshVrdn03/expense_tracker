import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../Components/Header';
import BannerCard from '../Components/BannerCard';
import Filter from '../Components/Filter';
import Chart from '../Components/Chart';

{
  /* <View style={styles.headerIcon}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}>
                    <Image
                        source={{ uri: authUserInfo?.photo }}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>

            </View> */
}
//   {icon ?
//     <View style={styles.headerIcon}>
//         {icon}
//     </View>
//     :
//     <View style={styles.headerNullIcon} />
// }

import ItemCard from '../Components/ItemCard';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {itemCardData} from '../data/itemCardData';
import DataStore from '../Store/DataStore';
import _ from 'lodash';
import {TouchableOpacity} from 'react-native-gesture-handler';
const Statistics = ({route}) => {
  const path = route?.params?.route;
  const {
    spentData,
    incomeData,
    setTotalAmountSpentByCategory,
    setTotalIncomeByCategory,
    totalAmountSpentByCategory,
    totalIncomeByCategory,
  } = DataStore();
  const [currentType, setCurrentType] = useState('Expense');
  const groupedByCategoryOfSpent = _.groupBy(spentData, 'category');
  const sumsByCategoryOfSpentObj = _.mapValues(
    groupedByCategoryOfSpent,
    transactions =>
      _.sumBy(transactions, transaction => Number(transaction.amount)),
  );
  const sumsByCategoryOfSpent = Object.keys(sumsByCategoryOfSpentObj).map(
    label => ({label, amount: sumsByCategoryOfSpentObj[label]}),
  );

  const groupedByCategoryOfIncome = _.groupBy(incomeData, 'category');
  const sumsByCategoryOfIncomeObj = _.mapValues(
    groupedByCategoryOfIncome,
    transactions =>
      _.sumBy(transactions, transaction => Number(transaction.amount)),
  );

  const sumsByCategoryOfIncome = Object.keys(sumsByCategoryOfIncomeObj).map(
    label => ({label, amount: sumsByCategoryOfIncomeObj[label]}),
  );

  const sortedData = itemCardData
    .slice()
    .sort((a, b) => b.itemSpent - a.itemSpent);

  const getDate = () => {
    const currentTime = new Date();
    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    const formattedDate = currentTime.toLocaleDateString('en-US', options);
    return formattedDate;
  };

  const calculateTotalSpentAmount = () => {
    const totalAmount = spentData.reduce((acc, item) => {
      return acc + parseInt(item.amount); // Assuming "amount" is a string, converting to integer for addition
    }, 0);

    return totalAmount;
  };

  useEffect(() => {
    calculateTotalSpentAmount();
    setTotalAmountSpentByCategory(sumsByCategoryOfSpent);
    setTotalIncomeByCategory(sumsByCategoryOfIncome);
  }, [spentData]);

  const data = {
    spent: calculateTotalSpentAmount(),
    date: getDate(),
  };

  return (
    <View style={styles.container}>
      <Header path={path} />

      <BannerCard data={data} currentType={currentType} />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {console.log(spentData.length, '======')}
        {spentData.length !== 0 && currentType === 'Expense' ? (
          <View style={styles.chart}>
            <Chart currentType={currentType} />
          </View>
        ) : (
          ''
        )}
        {incomeData.length !== 0 && currentType === 'Income' ? (
          <View style={styles.chart}>
            <Chart currentType={currentType} />
          </View>
        ) : (
          ''
        )}

        <View style={styles.spentContainer}>
          <View style={styles.category}>
            <TouchableOpacity onPress={() => setCurrentType('Expense')}>
              <Text
                style={[
                  styles.latestSpent,
                  currentType === 'Expense' && styles.selectedType,
                ]}>
                Expense
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCurrentType('Income')}>
              <Text
                style={[
                  styles.latestSpent,
                  currentType === 'Income' && styles.selectedType,
                ]}>
                Income
              </Text>
            </TouchableOpacity>
          </View>

          {(currentType === 'Income'
            ? totalIncomeByCategory
            : totalAmountSpentByCategory
          ).length > 0 ? (
            currentType === 'Income' ? (
              totalIncomeByCategory.map((card, index) => (
                <View style={styles.cardList} key={index}>
                  <ItemCard
                    itemName={card.label}
                    itemDate={''}
                    itemSpent={card.amount}
                  />
                </View>
              ))
            ) : (
              totalAmountSpentByCategory.map((card, index) => (
                <View style={styles.cardList} key={index}>
                  <ItemCard
                    itemName={card.label}
                    itemDate={''}
                    itemSpent={card.amount}
                  />
                </View>
              ))
            )
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.nodata}>No History</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  chart: {
    marginVertical: 20,
  },

  cardList: {
    marginBottom: 5,
  },
  scrollViewContent: {
    flexGrow: 1,
    // paddingBottom: 5, // Adjust as needed
  },

  spentContainer: {
    alignItems: 'center',
  },
  category: {
    width: responsiveWidth(90),
    height: responsiveHeight(5),
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  latestSpent: {
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 50,
    fontSize: responsiveFontSize(2),
    color: 'grey',
    fontWeight: 'bold',
    width: responsiveWidth(45),
  },
  selectedType: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
    backgroundColor: '#42224A',
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
