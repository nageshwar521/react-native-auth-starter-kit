import * as React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  useTheme,
  Divider,
} from 'react-native-paper';
import createStyles from '@src/utils/createStyles';
import ListItem from '@src/components/ListItem';
import Content from '@src/components/Content';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {Box, Text} from 'react-native-design-utility';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RoundedButton from '@src/components/Button/RoundedButton';
import {AudioPlayer} from '@src/components/Player/AudioPlayer';

const {width, height} = Dimensions.get('screen');

const MatchItem = ({
  title,
  username,
  userdesc,
  description,
  iconProps = {},
  userImgUrl,
  imageProps = {},
  lastItem = false,
  userLeftProps,
  userRightProps,
  userDetailsPosition = 'middle',
  getUserLeftComponent,
  getUserRightComponent,
  datePosted,
  containerStyle = {},
  userContainerStyle = {},
  userTextStyle = {},
  userDescStyle = {},
  userLeftStyle = {},
  cardContentStyle = {},
  cardActionsStyle = {},
  imageStyle = {},
  borderRadius = 20,
  cardContentContainerProps = {},
  postImgUrl,
  colors = [],
  contentTitleStyle = {},
  cardTitleDescStyle = {},
  descType = 'text',
}) => {
  const theme = useTheme();
  const styles = getStyles({theme, borderRadius});
  let defaultLeftProps = {
    left: props =>
      !userImgUrl ? (
        <Avatar.Icon
          {...props}
          icon="account"
          size={24}
          color={theme.colors.light2}
          {...iconProps}
        />
      ) : (
        <FastImage
          style={[styles.listImageStyle, listImageStyle]}
          height={50}
          width={50}
          resizeMode="contain"
          source={{uri: userImgUrl}}
          {...imageProps}
        />
      ),
  };
  let defaultRightProps = {
    right: props => (
      <Box flexDirection="row" alignItems="center">
        <Text color={theme.colors.textDark} fontSize={12} paddingRight={10}>
          {moment(datePosted).fromNow()}
        </Text>
        <RoundedButton size={26} colors={colors}>
          <Icon size={18} name="play" color={theme.colors.black} />
        </RoundedButton>
      </Box>
    ),
  };
  const leftProps = getUserLeftComponent
    ? getUserLeftComponent()
    : userLeftProps || defaultLeftProps;
  const rightProps = getUserRightComponent
    ? getUserRightComponent()
    : userRightProps || defaultRightProps;

  const getPostImage = () => (
    <Box padding={10}>
      {!postImgUrl ? (
        <Icon
          name="image"
          size={42}
          color={theme.colors.textDark}
          {...iconProps}
        />
      ) : (
        <FastImage
          style={[styles.listImageStyle, listImageStyle]}
          height={50}
          width={50}
          resizeMode="contain"
          source={{uri: postImgUrl}}
          {...imageProps}
        />
      )}
    </Box>
  );

  const getUserDetails = () => {
    return (
      <>
        <Box paddingHorizontal={15}>
          <Card.Title
            style={[styles.userContainerStyle, userContainerStyle]}
            titleStyle={[styles.userTextStyle, userTextStyle]}
            subtitleStyle={[styles.userDescStyle, userDescStyle]}
            leftStyle={[styles.userLeftStyle, userLeftStyle]}
            title={username}
            subtitle={userdesc}
            {...leftProps}
            {...rightProps}
          />
        </Box>
        <Divider />
      </>
    );
  };

  return (
    <Card
      style={[
        styles.container,
        lastItem ? styles.lastItemstyle : null,
        containerStyle,
      ]}>
      <Box
        bg={theme.colors.light2}
        borderRadius={borderRadius}
        paddingVertical={10}
        {...cardContentContainerProps}>
        <Box
          flexDirection="row"
          alignItems="center"
          style={[styles.cardContentStyle, cardContentStyle]}>
          <Box>{getPostImage()}</Box>
          <Box>
            <Title style={[styles.contentTitleStyle, contentTitleStyle]}>
              {title}
            </Title>
            {descType === 'audio' ? (
              <AudioPlayer />
            ) : (
              <Paragraph
                style={[styles.cardTitleDescStyle, cardTitleDescStyle]}>
                {description}
              </Paragraph>
            )}
          </Box>
        </Box>
        <Divider />
        {getUserDetails()}
        <Card.Actions style={[styles.cardActionsStyle, cardActionsStyle]}>
          <TouchableOpacity style={styles.actionButtonStyle}>
            <Icon
              name="flower-outline"
              size={20}
              color={theme.colors.border}
              style={styles.actionButtonIconStyle}
            />
            <Content centerProps={{style: styles.actionButtonTextStyle}}>
              0
            </Content>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtonStyle}>
            <Icon
              name="flash-outline"
              size={20}
              color={theme.colors.border}
              style={styles.actionButtonIconStyle}
            />
            <Content centerProps={{style: styles.actionButtonTextStyle}}>
              0
            </Content>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtonStyle}>
            <Icon
              name="walk"
              size={20}
              color={theme.colors.border}
              style={styles.actionButtonIconStyle}
            />
            <Content centerProps={{style: styles.actionButtonTextStyle}}>
              0
            </Content>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtonStyle}>
            <Icon
              name="handshake"
              size={20}
              color={theme.colors.border}
              style={styles.actionButtonIconStyle}
            />
            <Content centerProps={{style: styles.actionButtonTextStyle}}>
              0
            </Content>
          </TouchableOpacity>
        </Card.Actions>
      </Box>
    </Card>
  );
};

const getStyles = ({theme, borderRadius}) => {
  const styles = {
    container: {
      borderRadius: borderRadius,
      marginBottom: 20,
    },
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
    userContainerStyle: {
      fontSize: 14,
      paddingLeft: 0,
      minHeight: 44,
    },
    userTextStyle: {fontSize: 12, color: theme.colors.textDark},
    userLeftStyle: {
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
    actionButtonStyle: {flexDirection: 'row', alignItems: 'center'},
    actionButtonIconStyle: {paddingRight: 3, fontWeight: '100'},
    actionButtonTextStyle: {fontWeight: '300'},
  };
  return createStyles(styles);
};

export default MatchItem;
