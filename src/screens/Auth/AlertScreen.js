import React, {useState} from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {Text, Title, Headline, useTheme} from 'react-native-paper';
import Container from '@src/components/Container';
import Button from '@src/components/Button';
import {getI18nMessage} from '@src/translations/messages';
import {
  registerSubTitle,
  registerTitle,
  registerPagination,
  firstNameLabel,
  lastNameLabel,
  emailLabel,
  passwordLabel,
  confirmPasswordLabel,
  continueLabel,
  genderLabel,
  dobLabel,
  bioLabel,
  backLabel,
  nextLabel,
  addInterestsTitleLabel,
  addInterestsSubTitleLabel,
} from '@src/translations/keys';
import createStyles from '@src/utils/createStyles';
import {Box} from 'react-native-design-utility';
import {useNavigation, useRoute} from '@react-navigation/native';
import Modal from '@src/components/Modal';
import FastImage from 'react-native-fast-image';
import {GradientWrapper} from '@src/components/Gradient/GradientWrapper';
import {getShadow} from '@src/utils/common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('screen');

const boxWidth = width - 100;

const AlertScreen = () => {
  const theme = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const styles = getStyles({theme, boxWidth});
  const prevScreen = route.params.prevScreen || 'Home';
  const pageName = route.params.pageName || '';

  const handleHide = () => {
    navigation.navigate(prevScreen);
  };

  let config = {
    image: require('@assets/images/reset_password.png'),
    title: 'Reset Link Sent',
    desc: 'Check your email and reset link',
  };

  if (pageName === 'register') {
    config = {
      image: require('@assets/images/register_success.png'),
      title: 'Successfully Registered',
      desc: 'Lets explore the cheers',
    };
  }

  return (
    <Box
      bg={theme.colors.bgPrimary}
      f={1}
      alignItems="center"
      justifyContent="center">
      <Box p={10} borderRadius={15} style={styles.boxStyle}>
        <Box
          alignItems="center"
          justifyContent="center"
          p={20}
          borderRadius={15}
          bg={theme.colors.bgPrimary}
          height={boxWidth}
          width={boxWidth}>
          <Box position="absolute" top={15} right={15}>
            <TouchableOpacity
              style={styles.closeButtonStyle}
              onPress={handleHide}>
              <Icon name="close" size={24} color={theme.colors.textDark} />
            </TouchableOpacity>
          </Box>
          {/* <FastImage style={styles.imageStyle} source={{uri: config.image}} /> */}
          <Headline style={styles.titleStyle}>{config.title}</Headline>
          <Text style={styles.descStyle}>{config.desc}</Text>
        </Box>
      </Box>
    </Box>
  );
};

const getStyles = ({theme, boxWidth}) => {
  const styles = {
    boxStyle: {...getShadow()},
    imageStyle: {},
    titleStyle: {fontSize: 18, fontWeight: '500'},
    descStyle: {fontWeight: '300'},
    closeButtonStyle: {color: theme.colors.textDark, padding: 10},
  };
  return createStyles(styles);
};

export {AlertScreen};
