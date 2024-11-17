import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { PieChart } from 'react-native-chart-kit';

import DataStore from '../Store/DataStore';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const predefinedColors = [

  '#008080',
  '#4B0082',
  '#1E90FF',
  '#FF0000',
  '#00FFFF',
  '#800080',
  '#00CED1',
  '#20B2AA',
  '#8B4513',
  '#008B8B',
  '#5F9EA0',
  '#4682B4',
  '#B0E0E6',
  '#87CEEB',
  '#87CEFA',
  '#6495ED',
  '#4169E1',
  '#0000FF',
  '#000080',
  '#7B68EE',
  '#6A5ACD',
  '#483D8B',
  '#8A2BE2',
  '#9370DB',
  '#8B008B',
  '#A52A2A',
  '#CD5C5C',
  '#DC143C',
  '#800000',
  '#191970',

];

const Chart = ({ currentType }) => {
  const { totalAmountSpentByCategory, totalIncomeByCategory } = DataStore();
  console.log(totalAmountSpentByCategory);

  const totalAmountSpentByCategoryChart = totalAmountSpentByCategory.map(
    ({ amount, label }, index) => ({
      name: `₹ ${label}`,
      amount,
      color: predefinedColors[index % predefinedColors.length],
      legendFontColor: '#132329',
      legendFontSize: 15,
    }),
  );
  const totalIncomeByCategoryChart = totalIncomeByCategory.map(
    ({ amount, label }, index) => ({
      name: `₹${label}`,
      amount,
      color: predefinedColors[index % predefinedColors.length],
      legendFontColor: '#132329',
      legendFontSize: 15,
    }),
  );

  return (
    <View style={styles.container}>
      <PieChart
        data={
          currentType === 'Income'
            ? totalIncomeByCategoryChart
            : totalAmountSpentByCategoryChart
        }
        width={responsiveWidth(100)}
        height={200}
        chartConfig={{
          backgroundGradientFrom: '#1E2923',
          backgroundGradientTo: '#08130D',
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingHorizontal="20"
        absolute
      />
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
