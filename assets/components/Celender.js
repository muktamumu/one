import React, { useState } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const Celender = () => {
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateSelect = (date) => {
        setSelectedDate(date.dateString);
    };

    return (
        <View >
            <Calendar
                markedDates={{
                    [selectedDate]: { selected: true, selectedColor: 'blue' },
                }}
                onDayPress={handleDateSelect}
            />
        </View>
    );
};

export default Celender;
