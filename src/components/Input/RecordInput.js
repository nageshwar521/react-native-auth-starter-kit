import React from 'react';
import createStyles from '@src/utils/createStyles';
import {ScrollView, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import {Box} from 'react-native-design-utility';
import {IconButton, Portal, useTheme} from 'react-native-paper';
import {SearchBar} from '@src/components/Search/SearchBar';

const {width} = Dimensions.get('screen');

const RecordInput = ({
  icon = 'microphone-outline',
  placeholder = 'Record your thoughts...',
  inputProps = {},
}) => {
  const theme = useTheme();
  const styles = getStyles({width, theme});

  return (
    <SearchBar
      placeholder={placeholder}
      searchBarProps={{
        icon,
      }}
      {...inputProps}
    />
  );
};

const getStyles = ({theme, width}) => {
  const styles = {};
  return createStyles(styles);
};

export default RecordInput;
