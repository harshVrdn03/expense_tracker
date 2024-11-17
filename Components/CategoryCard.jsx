import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'

const CategoryCard = ({ data }) => {
    return (
        <View activeOpacity={0.5} style={styles.container}>
            <View style={styles.cardContainer}>
                <View style={styles.profile}>
                    <Text style={styles.logo}>{data.slice(0, 1)}</Text>
                </View>
                <View style={styles.dataName}>
                    <Text style={styles.text}>{data}</Text>
                </View>
            </View>

        </View>
    )
}

export default CategoryCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',

    },
    cardContainer: {
        flexDirection: 'row',
        height: responsiveHeight(6),
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f7f4f7',
    },
    profile: {
        height: 40,
        width: 40,
        borderRadius: 15,
        backgroundColor: '#f7f4f7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        textTransform: 'capitalize',
        fontSize: responsiveFontSize(2),
        color: '#42224A'
    },
    dataName: {
        flex: 1,
        marginLeft: 20

    },
    text: {
        textTransform: 'capitalize',
        fontSize: responsiveFontSize(2),
        color: '#42224A'
    }
})