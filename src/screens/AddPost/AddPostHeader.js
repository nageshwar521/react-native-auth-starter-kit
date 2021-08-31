import React from 'react';
import {TouchableOpacity, useWindowDimensions} from 'react-native';
import {Box} from 'react-native-design-utility';
import {useTheme, Divider, Badge, Chip} from 'react-native-paper';
import createStyles from '@src/utils/createStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddPostHeader = ({currentStep = 1, totalSteps = 1, onClosePress}) => {
  const theme = useTheme();
  const {width} = useWindowDimensions();
  const styles = getStyles({theme, width});

  const handleClosePress = () => {
    if (onClosePress) {
      onClosePress();
    }
  };

  return (
    <Box flexDirection="row" alignItems="center" marginBottom={30}>
      <Divider style={styles.dividerStyle} />
      <Box
        alignItems="center"
        justifyContent="center"
        position="absolute"
        bg={theme.colors.primary}
        top={0}
        bottom={0}
        left={20}>
        <Chip
          style={styles.stepContainerStyle}
          textStyle={styles.stepTextStyle}>
          {currentStep === totalSteps
            ? 'Review'
            : `Step ${currentStep} of ${totalSteps}`}
        </Chip>
      </Box>
      <Box
        alignItems="center"
        justifyContent="center"
        position="absolute"
        top={0}
        bottom={0}
        right={20}>
        <Badge
          size={30}
          onPress={handleClosePress}
          style={styles.closeButtonStyle}>
          <Icon name="close" size={18} style={styles.closeTextStyle} />
        </Badge>
      </Box>
    </Box>
  );
};

const getStyles = ({theme, width}) => {
  const styles = {
    dividerStyle: {
      height: 3,
      width,
      backgroundColor: theme.colors.primary,
    },
    stepContainerStyle: {backgroundColor: theme.colors.primary},
    stepTextStyle: {
      color: theme.colors.light2,
      fontWeight: '500',
    },
    closeButtonStyle: {
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeTextStyle: {
      color: theme.colors.light2,
    },
  };
  return createStyles(styles);
};

export default AddPostHeader;
