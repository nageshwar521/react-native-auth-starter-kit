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
import {Box} from 'react-native-design-utility';
import Button from '@src/components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('screen');

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

const CardItem = ({
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
}) => {
  const theme = useTheme();
  const styles = getStyles({theme, borderRadius});
  let defaultLeftProps = {
    left: props =>
      !userImgUrl ? (
        <Avatar.Icon
          {...props}
          icon="account-outline"
          size={24}
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
      <Content centerProps={{style: styles.userDateStyle}}>
        {moment(datePosted).fromNow()}
      </Content>
    ),
  };
  const leftProps = getUserLeftComponent
    ? getUserLeftComponent()
    : userLeftProps || defaultLeftProps;
  const rightProps = getUserRightComponent
    ? getUserRightComponent()
    : userRightProps || defaultRightProps;

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
      {userDetailsPosition === 'top' ? getUserDetails() : null}
      <Card.Cover
        style={[styles.imageStyle, imageStyle]}
        theme={{roundness: borderRadius}}
        source={{uri: 'https://picsum.photos/700'}}
        resizeMode="cover"
      />
      <Box
        bg={theme.colors.light2}
        marginTop={-30}
        borderRadius={borderRadius}
        paddingVertical={10}
        {...cardContentContainerProps}>
        <Card.Content style={[styles.cardContentStyle, cardContentStyle]}>
          <Title style={styles.contentTitleStyle}>{title}</Title>
          <Paragraph style={styles.cardTitleDescStyle}>{description}</Paragraph>
        </Card.Content>
        <Divider />
        {userDetailsPosition === 'middle' ? getUserDetails() : null}
        <Card.Actions style={[styles.cardActionsStyle, cardActionsStyle]}>
          <TouchableOpacity style={styles.actionButtonStyle}>
            <Icon
              name="heart-outline"
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
              name="message-text-outline"
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
              name="share-outline"
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
              name="eye-circle-outline"
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

export default CardItem;
