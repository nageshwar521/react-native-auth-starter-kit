import Content from '@src/components/Content';
import createStyles from '@src/utils/createStyles';
import React, {useRef, useState} from 'react';
import {ScrollView, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import {Box} from 'react-native-design-utility';
import FastImage from 'react-native-fast-image';
import {IconButton, Portal, useTheme} from 'react-native-paper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {TextInput} from '@src/components/Input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CardItem from '@src/screens/Dashboard/CardItem';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('screen');

const PostReview = ({postData = {}}) => {
  const theme = useTheme();
  const styles = getStyles({width, theme});

  const getUserRightComponent = () => {
    return {
      right: props => (
        <IconButton
          {...props}
          icon="dots-horizontal"
          color={theme.colors.primary}
        />
      ),
    };
  };

  return (
    <Box paddingHorizontal={20}>
      <CardItem
        {...postData}
        userDetailsPosition="top"
        borderRadius={0}
        userContainerStyle={styles.userContainerStyle}
        imageStyle={styles.imageStyle}
        containerStyle={styles.containerStyle}
        cardContentStyle={styles.cardContentStyle}
        userTextStyle={styles.userTitleStyle}
        userLeftStyle={styles.userLeftStyle}
        iconProps={{size: 50}}
        getUserRightComponent={getUserRightComponent}
        cardContentContainerProps={{bg: 'transparent', marginTop: 0}}
      />
    </Box>
  );
};

const getStyles = ({theme, width}) => {
  const itemWidth = width / 3;
  const itemHeight = width / 3;
  const styles = {
    userContainerStyle: {height: 70, alignItems: 'center'},
    userTitleStyle: {
      fontSize: 16,
      height: 25,
      minHeight: 25,
      fontWeight: '500',
    },
    userLeftStyle: {width: 50},
    containerStyle: {width: 'auto', backgroundColor: 'transparent'},
    cardContentStyle: {backgroundColor: 'transparent'},
    cardActionsStyle: {backgroundColor: 'transparent'},
    imageStyle: {height: 300},
  };
  return createStyles(styles);
};

export default PostReview;
