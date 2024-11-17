import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableHighlightBase,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CategoryCard from '../Components/CategoryCard';
import { TouchableNativeFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Expend = () => {
  const navigation = useNavigation();

  const expendData = [
    'Food',
    'Clothing',
    'Fruit',
    'Shopping',
    'Transportation',
    'Home',
    'Travel',
    'Wine',
    'Bills',
    'Gifts',
    'Education',
    'Vegetables',
    'Snacks',
    'Telephone',
    'Baby',
    'Sports',
    'Tax',
    'Electronics',
    'Health',
    'Entertainment',
    'Car',
    'Social',
    'Insurance',
    'office',
    'Books',
    'Cigarette',
    'Pet',
    'Beauty',
    'Hamburger',
  ];

  const handleAddEvent = expend => {
    navigation.navigate('AddNewData', { itemName: expend, label: 'expend' });
  };
  return (
    <ScrollView style={styles.container}>
      {expendData.map(expend => (
        <TouchableOpacity key={expend} onPress={() => handleAddEvent(expend)}>
          <View style={styles.categoryCard}>
            <CategoryCard data={expend} />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Expend;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff'
  },
  categoryCard: {
    paddingTop: 10,
    justifyContent: 'center'
  }
});
