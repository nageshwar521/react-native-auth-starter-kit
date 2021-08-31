import * as React from 'react';
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  useTheme,
  Divider,
} from 'react-native-paper';
import createStyles from '@src/utils/createStyles';
import {Box, Text} from 'react-native-design-utility';
import {Dimensions, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getShadow, hexToRGBA} from '@src/utils/common';
import RoundedButton from '@src/components/Button/RoundedButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('screen');

const CARD_WIDTH = width - 30;

const MemoryItem = ({
  headerTitle,
  headerDesc,
  containerStyle = {},
  headerContainerStyle = {},
  headerTitleStyle = {},
  headerDescStyle = {},
  headerLeftStyle = {},
  content,
  footerProps = {},
  leftProps = {},
  rightProps = {},
  onPress,
  onMorePress,
}) => {
  const theme = useTheme();
  const styles = getStyles({theme});

  const handleRightPress = () => {
    if (onMorePress) {
      onMorePress();
    }
  };

  const getRightButton = item => {
    return (
      <TouchableOpacity onPress={handleRightPress}>
        <Icon size={22} color={theme.colors.light2} name="dots-horizontal" />
      </TouchableOpacity>
    );
  };

  const rightComponentProps = {right: getRightButton, ...rightProps};

  const handleButtonPress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <Card style={[styles.container, containerStyle]}>
      <Box position="absolute" top={0} left={0} right={0} bottom={0}>
        <FastImage
          resizeMode="contain"
          source={require('@assets/images/memories.png')}
          style={styles.bgImage}
        />
      </Box>

      <Box padding={10}>
        <Card.Title
          style={[styles.headerContainerStyle, headerContainerStyle]}
          titleStyle={[styles.headerTitleStyle, headerTitleStyle]}
          subtitleStyle={[styles.headerDescStyle, headerDescStyle]}
          title={headerTitle}
          subtitle={headerDesc}
          {...rightComponentProps}
        />
        <Box paddingHorizontal={10} marginBottom={10}>
          {content}
        </Box>
        <Box flexGrow={1} />
        <Box flexDirection="row" {...footerProps}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={handleButtonPress}>
            <Text color={theme.colors.light2} style={styles.buttonTextStyle}>
              Go to Cheers Room
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Card>
  );
};

const getStyles = ({theme, borderRadius}) => {
  const styles = {
    container: {
      borderRadius: borderRadius,
      backgroundColor: 'transparent',
      width: CARD_WIDTH,
      height: CARD_WIDTH,
    },
    bgImage: {width: CARD_WIDTH, height: CARD_WIDTH},
    contentTitleStyle: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.textDark,
    },
    imageStyle: {height: 120, borderRadius: borderRadius},
    cardContentStyle: {
      borderRadius: borderRadius,
      overflow: 'hidden',
      marginBottom: 10,
    },
    cardTitleDescStyle: {
      color: theme.colors.textDark,
      fontWeight: '300',
      fontSize: 12,
    },
    headerContainerStyle: {minHeight: 40, height: 40},
    headerTitleStyle: {
      fontSize: 18,
      color: theme.colors.light2,
      fontWeight: '500',
      fontFamily: 'Montserrat-Bold',
      padding: 0,
    },
    headerLeftStyle: {
      width: 24,
    },
    userDateStyle: {
      fontSize: 12,
      fontWeight: '300',
      color: theme.colors.textDark,
    },
    lastItemstyle: {marginRight: 0},
    cardActionsStyle: {
      paddingHorizontal: 15,
      paddingTop: 12,
      justifyContent: 'space-between',
    },
    actionButtonStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      backgroundColor: hexToRGBA(theme.colors.dark2, 40),
    },
    actionButtonIconStyle: {paddingRight: 3, fontWeight: '100'},
    actionButtonTextStyle: {fontWeight: '300'},
    buttonStyle: {
      flex: 1,
      borderRadius: 10,
      paddingVertical: 10,
      padding: 10,
      marginHorizontal: 20,
      backgroundColor: hexToRGBA('#FF8F00', 50),
      ...getShadow(),
    },
    buttonTextStyle: {
      textAlign: 'center',
      fontWeight: '500',
    },
  };
  return createStyles(styles);
};

export default MemoryItem;
