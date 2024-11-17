import React from 'react'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import Home from '../Screen/Home';
import Statistics from '../Screen/Statistics';
import AddNew from '../Screen/AddNew';
import Category from '../Screen/Category';
import Profile from '../Screen/Profile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
const Tab = createMaterialTopTabNavigator();

const TopNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='home'
            screenOptions={{
                headerShown: false,
                tabBarStyle: { height: responsiveHeight(7.7), paddingBottom: 5 },
                tabBarShowLabel: false,
            }}
            tabBarOptions={{
                tabStyle: {
                    backgroundColor: 'transparent'
                },
                labelStyle: {
                    fontSize: 13,
                },
                activeTintColor: '#333',

            }}
        >
            <Tab.Screen
                name={'Home'}
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name={'home-outline'} size={30} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name={'Statistics'}
                component={Statistics}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name={'chart-line'} size={24} color={color} />
                    ),
                }}
                initialParams={{ route: 'statistics' }}
            />
            <Tab.Screen
                name={'Add new'}
                component={AddNew}
                options={{
                    tabBarIcon: ({ color }) => (
                        <AntDesign name={'pluscircle'} size={45} color={'black'} />
                    ),
                }}
                initialParams={{ route: 'select any category' }}
            />
            <Tab.Screen
                name={'Category'}
                component={Category}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name={'file-send-outline'} size={26} color={color} />
                    ),
                }}
                initialParams={{ route: 'category' }}
            />
            <Tab.Screen
                name={'Profile'}
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name={'account-outline'} size={30} color={color} />
                    ),
                }}
                initialParams={{ route: 'profile' }}
            />

        </Tab.Navigator>
    )
}

export default TopNavigation
