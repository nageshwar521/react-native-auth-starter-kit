import React, {useState} from 'react';
import {SafeAreaView, View, TouchableOpacity} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
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
  loginTitle,
  loginSubTitle,
  forgotPasswordTitle,
  forgotPasswordSubTitle,
} from '@src/translations/keys';
import createStyles from '@src/utils/createStyles';
import Content from '@src/components/Content';
import {getShadow} from '@src/utils/common';
import {Box} from 'react-native-design-utility';
import {gradientWrapper} from '@src/utils/gradientWrapper';
import DateTimeInput from '@src/components/Input/DateTimeInput';
import {DropdownInput, TextInput} from '@src/components/Input';
import {useNavigation} from '@react-navigation/native';
import {ButtonGroup} from '@src/components/ButtonGroup/ButtonGroup';

const ForgotPasswordScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = getStyles({theme});
  const defaultFormData = {
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    dob: '',
    password: '',
    cPassword: '',
  };
  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = (fieldName, value) => {
    setFormData({...formData, [fieldName]: value});
  };

  const titleProps = {
    type: 'title',
  };
  const subtitleProps = {
    rightProps: {justifyContent: 'flex-end', backgroundColor: 'red'},
    getRightComponent: () => {
      return '1 of 4';
    },
  };

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleSubmitPress = () => {
    navigation.navigate('Alert', {prevScreen: 'Login'});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Container
        style={styles.container}
        title={getI18nMessage(forgotPasswordTitle)}
        subtitle={getI18nMessage(forgotPasswordSubTitle)}>
        <Box>
          <TextInput
            gradient
            placeholder={getI18nMessage(emailLabel)}
            style={styles.textInput}
            vertical
            value={formData['email']}
            onChange={handleChange.bind(null, 'email')}
          />
        </Box>
        <ButtonGroup
          primaryProps={{label: 'SUBMIT', onPress: handleSubmitPress}}
          showLeft={false}
        />
        <Box paddingVertical={20} flexDirection="row" justifyContent="center">
          <TouchableOpacity onPress={handleLoginPress}>
            <Text style={styles.alreadyAccTextStyle}>Go to Login</Text>
          </TouchableOpacity>
        </Box>
      </Container>
    </SafeAreaView>
  );
};

const getStyles = ({theme}) => {
  const styles = {
    container: {
      flex: 1,
    },
    flexGrow: {flexGrow: 1},
    titleStyle: {
      fontWeight: '500',
    },
    centerStyle: {},
    rightPaginationStyle: {},
    textInput: {
      fontSize: 18,
      fontFamily: 'Montserrat-SemiBold',
    },
    textInputBgSplitLeft: {
      flex: 1,
      marginRight: 5,
    },
    textInputBgSplitRight: {
      flex: 1,
      marginLeft: 5,
    },
    textInputSplitLeft: {
      flex: 1,
      fontSize: 18,
      fontFamily: 'Montserrat-SemiBold',
    },
    textInputSplitRight: {
      flex: 1,
      fontSize: 18,
      fontFamily: 'Montserrat-SemiBold',
    },
    continueButtonTextStyle: {
      color: theme.colors.light2,
      fontSize: 19,
      fontWeight: '500',
      fontFamily: 'Montserrat-SemiBold',
    },
    continueButtonContainerStyle: {
      borderRadius: 15,
      ...getShadow(),
    },
    alreadyAccTextStyle: {
      color: theme.colors.textDark,
      fontWeight: '500',
      fontFamily: 'Montserrat-Bold',
    },
    loginTextStyle: {
      color: theme.colors.textDark,
      fontWeight: '500',
      fontFamily: 'Montserrat-Bold',
    },
  };
  return createStyles(styles);
};

export {ForgotPasswordScreen};
