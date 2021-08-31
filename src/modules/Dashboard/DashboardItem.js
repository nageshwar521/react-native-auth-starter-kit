import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import Content from '@src/components/Content';
import Button from '@src/components//Button';
import {Box} from 'react-native-design-utility';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getShadow} from '@src/utils/common';
import {useNavigation} from '@react-navigation/native';
import createStyles from '@src/utils/createStyles';

const DashboardItem = ({
  title,
  titleProps = {},
  buttonLabel,
  buttonProps = {},
  children,
  buttonTextProps = {},
  headerContainerProps = {},
  getTitle,
}) => {
  const theme = useTheme();
  const styles = getStyles({theme});

  return (
    <Box mt={10}>
      <Box
        flexDirection="row"
        alignItems="center"
        marginBottom={10}
        {...headerContainerProps}>
        <Box f={2} flexDirection="row">
          {title ? (
            <Text style={styles.labelStyle}>{title}</Text>
          ) : getTitle ? (
            getTitle()
          ) : null}
        </Box>
        {buttonLabel ? (
          <Box f={1} flexDirection="row" justifyContent="end">
            <TouchableOpacity style={[styles.buttonStyle]} {...buttonProps}>
              <Text style={styles.buttonLabelStyle}>{buttonLabel}</Text>
            </TouchableOpacity>
          </Box>
        ) : null}
      </Box>
      {children}
    </Box>
  );
};

const getStyles = ({theme}) => {
  const styles = {
    labelStyle: {
      flexGrow: 1,
      color: theme.colors.textDark,
      fontWeight: '500',
      fontSize: 18,
    },
    buttonStyle: {
      borderBottomWidth: 1,
      borderColor: theme.colors.primary,
    },
    buttonLabelStyle: {
      color: theme.colors.primary,
      fontWeight: '500',
      fontFamily: 'Montserrat-Bold',
    },
  };
  return createStyles(styles);
};

export {DashboardItem};
