import React from 'react';
import {TextInput as TextInputField} from 'react-native-paper';
import styled from 'styled-components/native';
import createStyles from '../../utils/createStyles';

const StyledTextInputField = styled(TextInputField)`
  margin-bottom: 20px;
`;

const TextInput = ({
  mode = 'outlined',
  style = {},
  size = 'medium',
  onChange,
  autoCapitalize = 'none',
  ...props
}) => {
  const styles = getStyles({size});
  const handleChange = (val) => {
    if (onChange) {
      onChange(val);
    }
  };
  return (
    <StyledTextInputField
      style={[styles.container, style]}
      dense={size === 'small'}
      mode={mode}
      onChangeText={handleChange}
      autoCapitalize={autoCapitalize}
      {...props}
    />
  );
};

const getStyles = ({size}) => {
  const styles = {
    container: {
      padding: size === 'medium' ? 5 : size === 'small' ? 0 : 10,
    },
  };
  return createStyles(styles);
};

export default TextInput;
