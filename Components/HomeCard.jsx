import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { RadialGradient, Stop, Circle } from 'react-native-svg';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { BarChart } from 'react-native-gifted-charts';
import DataStore from '../Store/DataStore';
import _ from 'lodash';
const HomeCard = ({ cardData }) => {
  const { spentData, currentFilter } = DataStore();
  const numericSpentData = spentData.map(item => ({
    ...item,
    amount: parseFloat(item.amount),
  }));
  const barGraphDaysData = _.groupBy(numericSpentData, 'date');
  const sumBarGraphDaysData = _.mapValues(barGraphDaysData, transactions =>
    _.sumBy(transactions, 'amount'),
  );
  const arrayBarGraphDaysData = _.map(sumBarGraphDaysData, (value, label) => {
    const labelComponents = label.split(' ');
    const newLabel = labelComponents[2] + ' ' + labelComponents[1];

    return {
      label: newLabel,
      value,
      frontColor: '#42224A',
    };
  });
  // Group data by month and year and calculate sum of amounts for each month
  const barGraphMonthsData = _.groupBy(numericSpentData, item => {
    const dateComponents = item.date.split(' ');
    return `${dateComponents[1]} ${dateComponents[3]}`;
  });
  const sumBarGraphMonthsData = _.mapValues(barGraphMonthsData, transactions =>
    _.sumBy(transactions, 'amount'),
  );
  const arrayBarGraphMonthsData = _.map(
    sumBarGraphMonthsData,
    (value, label) => ({ label, value, frontColor: '#42224A' }),
  );

  // Group data by year and calculate sum of amounts for each year
  const barGraphYearsData = _.groupBy(numericSpentData, item => {
    const dateComponents = item.date.split(' ');
    return `${dateComponents[3]}`;
  });
  const sumBarGraphYearsData = _.mapValues(barGraphYearsData, transactions =>
    _.sumBy(transactions, 'amount'),
  );
  const arrayBarGraphYearsData = _.map(
    sumBarGraphYearsData,
    (value, label) => ({ label, value, frontColor: '#42224A' }),
  );

  return (
    <View style={styles.container}>
      {spentData.length !== 0 ? (
        <BarChart
          barWidth={22}
          noOfSections={5}
          barBorderRadius={4}
          frontColor="lightgray"
          data={
            currentFilter === 'Days'
              ? arrayBarGraphDaysData
              : currentFilter === 'Months'
                ? arrayBarGraphMonthsData
                : arrayBarGraphYearsData
          }
          yAxisThickness={0}
          xAxisThickness={0}
          hideRules
          rotateLabel
          isAnimated
          xAxisLabelTextStyle={{ color: 'grey' }}
          yAxisTextStyle={{ color: 'grey' }}
        />
      ) : (
        ''
      )}
    </View>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#F7F4F7',
    paddingBottom: 30,
  },
  // priceContainer: {
  //   width: '100%',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingHorizontal: 30,
  //   position: 'absolute',
  //   top: 30,
  // },
  // textContainer: {
  //   alignItems: 'flex-start',
  // },
  // price: {
  //   color: 'white',
  //   fontWeight: '700',
  //   fontSize: responsiveFontSize(3),
  // },
  // balance: {
  //   color: 'white',
  //   fontWeight: '400',
  //   fontSize: responsiveFontSize(2),
  // },
  // balanceContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingHorizontal: 30,
  //   position: 'absolute',
  //   bottom: 30,
  //   width: '100%',
  // },
  // balanceItem: {
  //   alignItems: 'center',
  // },
  // balanceLabel: {
  //   color: 'white',
  //   fontSize: responsiveFontSize(1.8),
  //   fontWeight: '400',
  // },
  // balanceAmount: {
  //   color: 'white',
  //   fontSize: responsiveFontSize(2),
  //   fontWeight: '700',
  //   marginTop: 5,
  // },
});
