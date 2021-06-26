import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styled from 'styled-components/native';
import createStyles from '../../utils/createStyles';
import TextInput from './TextInput';
import {formatDate} from '../../utils/dateUtils';

const DateTimePicker = ({
  mode = 'outlined',
  displayType = 'date',
  style = {},
  fieldStyle = {},
  size = 'medium',
  onChange,
  label,
  value,
  dateFormat = 'yyyy-MM-dd',
  ...props
}) => {
  // console.log('value');
  // console.log(props.value);
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const styles = getStyles({size});
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleChange = (selectedDate) => {
    hideDatePicker();

    if (onChange) {
      onChange(new Date(selectedDate));
    }
  };
  const dateValue = value instanceof Date ? value : new Date();
  return (
    <>
      <TextInput
        mode={mode}
        onFocus={showDatePicker}
        label={label}
        value={formatDate(dateValue, dateFormat)}
        {...props}
      />
      <DateTimePickerModal
        value={dateValue}
        is24Hour={true}
        mode={displayType}
        style={[styles.fieldStyle, fieldStyle]}
        isVisible={isDatePickerVisible}
        onConfirm={handleChange}
        onCancel={hideDatePicker}
      />
    </>
  );
};

const getStyles = ({size}) => {
  const styles = {
    container: {},
    fieldStyle: {
      padding: size === 'medium' ? 5 : size === 'small' ? 0 : 10,
    },
    flatStyle: {
      backgroundColor: '#E0E0E0',
      padding: 12,
    },
  };
  return createStyles(styles);
};

export default DateTimePicker;
