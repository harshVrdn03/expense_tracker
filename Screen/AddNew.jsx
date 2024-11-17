import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CategoryNavigation from '../Navigation/CategoryNavigation'
import Header from '../Components/Header'


const AddNew = ({ route }) => {
    const path = route?.params?.route;
    return (
        <View style={styles.container}>
            <Header
                path={path}
            />
            <CategoryNavigation />
        </View>
    )
}

export default AddNew

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})