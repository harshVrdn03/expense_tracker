import React from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Alert } from 'react-native';
import ModalStore from '../Store/ModalStore';
import AuthStore from '../Store/AuthStore';
import firestore from '@react-native-firebase/firestore';
import ItemCard from './ItemCard';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const DeleteModal = ({ id }) => {
    const { authUserInfo } = AuthStore()
    const { deleteModalVisible, setDeleteModalVisible } = ModalStore()
    const { deleteId, setDeleteId } = ModalStore()

    const handleDeleteItem = async () => {

        try {
            const userDocumentRef = firestore().collection('Users').doc(authUserInfo?.id);

            const userDocument = await userDocumentRef.get();
            const userData = userDocument.data();
            const updatedSpentData = userData.spentData.filter(item => item.id !== deleteId?.id);

            await userDocumentRef.update({
                spentData: updatedSpentData,
            });

            setDeleteModalVisible(false);
            console.log('Item deleted from spentData successfully!');
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleCancleItem = () => {
        setDeleteModalVisible(false)
    }


    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={deleteModalVisible}
                onRequestClose={() => {
                    setDeleteModalVisible(!deleteModalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ItemCard
                            itemId={deleteId?.id}
                            itemName={deleteId?.category}
                            itemNote={deleteId?.note}
                            itemSpent={deleteId?.amount}
                        />
                        <View style={styles.buttonContainer}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={handleCancleItem}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={handleDeleteItem}>
                                <Text style={styles.textStyle}>Delete</Text>
                            </Pressable>

                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#00000078'
    },
    modalView: {
        margin: 20,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        paddingVertical: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonContainer: {
        width: responsiveWidth(90),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        gap: 10,
    },
    button: {
        flex: 1,
        borderRadius: 10,
        padding: 10,
        elevation: 1,
        marginHorizontal: 0,
    },

    buttonClose: {
        backgroundColor: '#42224A',
    },
    textStyle: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        color: "black",
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default DeleteModal;