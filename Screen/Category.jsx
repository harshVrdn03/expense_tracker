import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Components/Header';

const Category = ({ route }) => {
    const path = route?.params?.route;

    return (
        <View style={styles.container}>
            <Header
                path={path}
            />
        </View>
    )
}

export default Category

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})