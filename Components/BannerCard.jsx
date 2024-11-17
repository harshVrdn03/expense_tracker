import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import DataStore from '../Store/DataStore';

const BannerCard = ({ data, currentType }) => {
  const { total } = DataStore();
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.content}>
          <Text style={styles.spent}>
            Total
            {currentType === 'Expense'
              ? ` Spent ₹ ${total.spent}`
              : ` Income ₹ ${total.income}`}
          </Text>
        </View>
        <View>
          <Text style={styles.date}>{data.date}</Text>
        </View>
      </View>
    </View>
  );
};

export default BannerCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: responsiveWidth(90),
    height: responsiveHeight(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginVertical: 5,
  },
  spent: {
    fontSize: responsiveFontSize(3),
    fontWeight: '700',
    color: '#42224A',
  },
  date: {
    fontSize: responsiveFontSize(2),
    color: 'grey',
    fontWeight: '500',
  },
});
