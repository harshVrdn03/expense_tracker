import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'
import AuthStore from '../Store/AuthStore'

const Header = ({ path, route, icon }) => {

    const navigation = useNavigation()
    const { authUserInfo } = AuthStore()
    console.log(authUserInfo)
    const handleGoBack = () => {
        navigation.goBack()
    }
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={handleGoBack}>
                <View style={styles.headerBack}>
                    <Ionicons name="arrow-back" size={26} color='#42224A' />
                </View>
            </TouchableOpacity>
            <View style={styles.header} >
                <Text style={styles.path}>{path}</Text>
            </View>
            {icon ?
                <View style={styles.headerIcon}>
                    {icon}
                </View>
                :
                <View style={styles.headerNullIcon} />
            }
        </View>
    )
}

{/* <View style={styles.headerIcon}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}>
                    <Image
                        source={{ uri: authUserInfo?.photo }}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>

            </View> */}
export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        flexDirection: 'row',
        height: responsiveHeight(8),
        alignItems: 'center',
    },
    header: {
        flex: 1,
        alignItems: 'center',
    },
    path: {
        fontSize: responsiveFontSize(2),
        color: '#42224A',
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },

    headerBack: {
        borderRadius: 15,
        padding: 10,
        backgroundColor: '#F7F4F7'
    },
    headerIcon: {
        borderRadius: 50,
        padding: 10,
        backgroundColor: '#F7F4F7',
    },
    headerNullIcon: {
        height: 48.6,
        width: 48.3
    },
    profileImage: {
        height: 46,
        width: 45

        // borderRadius: 25,
    },
    headerIcon: {
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#42224A'
    },
})
