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

const LoginScreen = () => {
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
    console.log('handleChange value', value);
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
    navigation.navigate('Dashboard');
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  const handleForgotPress = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Container
        style={styles.container}
        title={getI18nMessage(loginTitle)}
        subtitle={getI18nMessage(loginSubTitle)}>
        <Box>
          <TextInput
            gradient
            placeholder={getI18nMessage(emailLabel)}
            style={styles.textInput}
            vertical
            value={formData['email']}
            onChange={handleChange.bind(null, 'email')}
          />
          <TextInput
            gradient
            placeholder={getI18nMessage(passwordLabel)}
            style={styles.textInput}
            vertical
            value={formData['password']}
            onChange={handleChange.bind(null, 'password')}
          />
        </Box>
        <ButtonGroup
          primaryProps={{label: 'LOGIN', onPress: handleLoginPress}}
          showLeft={false}
        />
        <Box paddingVertical={20} flexDirection="row" justifyContent="center">
          <TouchableOpacity onPress={handleForgotPress}>
            <Text style={styles.alreadyAccTextStyle}>Forgot Password?</Text>
          </TouchableOpacity>
        </Box>
        <View style={styles.flexGrow} />
        <Box paddingVertical={20} flexDirection="row" justifyContent="center">
          <Text style={styles.alreadyAccTextStyle}>
            Don't have an account? Register Now
          </Text>
        </Box>
        <ButtonGroup
          secondaryProps={{
            label: 'REGISTER',
            onPress: handleRegisterPress,
          }}
          showRight={false}
        />
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

export {LoginScreen};
