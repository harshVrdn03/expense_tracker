import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateInput = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isPickerVisible, setPickerVisible] = useState(false);

    const handleDateChange = (event, date) => {
        setPickerVisible(true);
        if (date !== undefined) {
            setSelectedDate(date);
        }
        setPickerVisible(false);
    };

    const togglePicker = () => {
        // Toggle picker visibility
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleDateChange}
            >
                <View>
                    <Text></Text>
                </View>
                <View>
                    {isPickerVisible && (
                        <DateTimePicker
                            style={styles.datePickerStyle}
                            value={selectedDate}
                            mode="date"
                            display="default"

                        />
                    )}
                </View>
            </TouchableOpacity>


            <Text>Selected Date: {selectedDate.toDateString()}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        marginTop: 10,
    },
    datePickerStyle: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 1,
        width: 200,

        marginTop: 10,
    },
});

export default DateInput;
