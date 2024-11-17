import React from 'react'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Expend from '../Screen/Expend'
import Income from '../Screen/Income'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

const Tab = createMaterialTopTabNavigator();

const CategoryNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='expend'
            screenOptions={{
                tabBarActiveTintColor: '#42224A',
                tabBarIndicatorStyle: {
                    backgroundColor: '#42224A'
                },
                tabBarLabelStyle: {
                    textTransform: 'capitalize',
                    fontSize: responsiveFontSize(2),
                    fontWeight: 'bold'
                },
                tabBarStyle: {
                    backgroundColor: '#fff'
                }
            }}
        >
            <Tab.Screen
                name='expend'
                component={Expend}
                options={{
                    // tabBarLabelStyle: styles.tabBarLabel,
                }}
            />
            <Tab.Screen
                name='income'
                component={Income}
                options={{
                    // tabBarLabelStyle: styles.tabBarLabel,
                }}
            />
        </Tab.Navigator>
    )
}

export default CategoryNavigation
