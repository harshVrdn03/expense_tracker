import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Home from '../Screen/Home';
import Statistics from '../Screen/Statistics';
import AddNew from '../Screen/AddNew';
import Profile from '../Screen/Profile';
import Category from '../Screen/Category';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: responsiveHeight(7.7), paddingBottom: 5, backgroundColor: '#ffffff', },
        tabBarShowLabel: false,
        tabStyle: {
          backgroundColor: 'transparent',
        },
        labelStyle: {
          fontSize: 13,
        },
        tabBarActiveTintColor: '#8F659A',
      }}>
      <Tab.Screen
        name={'HomeTab'}
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name={'home-outline'}
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'Add new'}
        component={AddNew}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name={'pluscircle'} size={45} color={'#8F659A'} />
          ),
        }}
        initialParams={{ route: 'select category' }}
      />
      <Tab.Screen
        name={'Statistics'}
        component={Statistics}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name={'chart-line'}
              size={24}
              color={color}
            />
          ),
        }}
        initialParams={{ route: 'statistics' }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
