import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import DataStore from '../Store/DataStore';

const Filter = () => {
  const [selectedTab, setSelectedTab] = useState('Days'); // State to track the selected tab
  const {setFilter} = DataStore();
  // Function to handle tab selection
  const handleTabPress = tabName => {
    setFilter(tabName);
    setSelectedTab(tabName);
  };

  return (
    <View style={styles.tabBarContainer}>
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'Days' && styles.selectedTab,
          ]}
          onPress={() => handleTabPress('Days')}>
          <Text
            style={
              selectedTab === 'Days' ? styles.selectedTabText : styles.tabText
            }>
            Days
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'Months' && styles.selectedTab,
          ]}
          onPress={() => handleTabPress('Months')}>
          <Text
            style={
              selectedTab === 'Months' ? styles.selectedTabText : styles.tabText
            }>
            Months
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'Year' && styles.selectedTab,
          ]}
          onPress={() => handleTabPress('Year')}>
          <Text
            style={
              selectedTab === 'Year' ? styles.selectedTabText : styles.tabText
            }>
            Year
          </Text>
        </TouchableOpacity>
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(5),
  },
  tabBar: {
    width: responsiveWidth(90),
    height: responsiveHeight(5),
    flexDirection: 'row',
    borderRadius: 50,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  selectedTab: {
    // borderWidth: 1,
    borderBottomColor: '#42224A',
    borderBottomWidth: 2,
  },
  selectedTabText: {
    color: '#42224A',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  tabText: {
    fontSize: responsiveFontSize(2),
    color: 'grey',
    fontWeight: 'bold',
  },
});
