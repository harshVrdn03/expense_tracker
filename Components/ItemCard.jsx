import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import ModalStore from '../Store/ModalStore';


const ItemCard = ({ itemId, itemName, itemNote, itemSpent }) => {

  return (


    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.profile}>
          <Text style={styles.profileIcon}>{itemName.slice(0, 1)}</Text>
        </View>
        <View style={styles.itemDetail}>
          <View style={styles.itemName}>
            <Text style={styles.name}>{itemName}</Text>
            <Text style={styles.spent}>₹{itemSpent}</Text>
          </View>
          {
            itemNote && itemNote ? (<View style={styles.itemNote}>
              <Text style={styles.date} numberOfLines={1}>{itemNote}</Text>
            </View>) : ""
          }

        </View>
      </View>
    </View>





  );
};

export default ItemCard;
{/* {deleteModalVisible && <DeleteModal />} */ }
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  card: {
    width: responsiveWidth(90),
    height: responsiveHeight(10),
    paddingHorizontal: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profile: {
    height: 60,
    width: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F4F7',
  },
  profileIcon: {
    color: '#42224A',
    fontSize: responsiveFontSize(3),
  },
  itemDetail: {
    flex: 1,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  itemName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  itemNote: {
    width: '70%',
    marginVertical: 2,
  },
  name: {
    fontSize: responsiveFontSize(2),
    color: '#42224A',
    fontWeight: '600',
  },
  date: {
    fontSize: responsiveFontSize(1.5),
    color: 'grey',
    fontWeight: '300',
  },
  spent: {
    fontSize: responsiveFontSize(2),
    color: '#42224A',
    fontWeight: '600',
  },
});
