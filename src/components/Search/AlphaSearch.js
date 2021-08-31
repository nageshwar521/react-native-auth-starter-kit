import React from 'react';
import {List, Searchbar, Text, useTheme} from 'react-native-paper';
import createStyles from '@src/utils/createStyles';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native';
import {generateId, getShadow} from '@src/utils/common';
import {useSelector} from 'react-redux';
import {Box} from 'react-native-design-utility';

const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const AlphaSearch = ({selectedItem = '', onFilterPress}) => {
  const theme = useTheme();
  const styles = getStyles({theme});
  const currentTheme = useSelector(state => state.common.currentTheme);

  const handleFilterChange = query => {
    if (onFilterPress) {
      onFilterPress(query);
    }
  };

  return (
    <Box position="absolute" right={0} top={0} bottom={0}>
      {alphabets.split('').map(alphabet => {
        const isSelected = selectedItem === alphabet;
        return (
          <TouchableOpacity
            style={[
              styles.alphabetButtonStyle,
              isSelected ? styles.selectedAlphabetButtonStyle : null,
            ]}
            onPress={handleFilterChange.bind(null, alphabet)}
            key={`${alphabet}_${generateId()}`}>
            <Text
              style={[
                styles.alphabetTextStyle,
                isSelected ? styles.selectedAlphabetTextStyle : null,
              ]}>
              {alphabet}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Box>
  );
};

const getStyles = ({theme}) => {
  const styles = {
    alphabetTextStyle: {
      color: theme.colors.primary,
      fontSize: 12,
      marginVertical: 5,
    },
    selectedAlphabetTextStyle: {
      color: theme.colors.primary,
      fontSize: 16,
    },
  };
  return createStyles(styles);
};

export {AlphaSearch};
