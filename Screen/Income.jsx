import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CategoryCard from '../Components/CategoryCard';
import { useNavigation } from '@react-navigation/native';

const Income = () => {
  const navigation = useNavigation();

  const incomeData = [
    'Rental',
    'Grants',
    'Dividends',
    'Refunds',
    'Salary',
    'Sale',
    'Awards',
    'Coupons',
    'Others',
  ];

  const handleAddEvent = income => {
    navigation.navigate('AddNewData', { itemName: income, label: 'income' });
  };
  return (
    <ScrollView style={styles.container}>
      {incomeData.map(income => (
        <TouchableOpacity key={income} onPress={() => handleAddEvent(income)}>
          <View style={styles.categoryCard}>
            <CategoryCard data={income} />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Income;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF'
  },
  categoryCard: {
    paddingTop: 10,
  },
  text: {
    color: 'black',
  },
});
