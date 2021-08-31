import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {useTheme} from 'react-native-paper';
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
import Content from '@src/components/Content';
import {getShadow} from '@src/utils/common';
import {Box} from 'react-native-design-utility';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from '@src/components/Input';
import Thumbnail from '@src/components/Thumbnail';
import MultiSelectList from '@src/components/MultiSelectList';
import {ButtonGroup} from '@src/components/ButtonGroup/ButtonGroup';

const interestList = [
  {
    label: 'Photography by Design',
    value: 'Photography by Design',
    imageUrl: '',
  },
  {
    label: 'When nature hurts',
    value: 'When nature hurts',
    imageUrl: '',
  },
  {
    label: 'Unprofessional look for meeting',
    value: 'Unprofessional look for meeting',
    imageUrl: '',
  },
  {
    label: 'Footbal on rainyday',
    value: 'Footbal on rainyday',
    imageUrl: '',
  },
  {
    label: 'World outside my window',
    value: 'World outside my window',
    imageUrl: '',
  },
  {
    label: 'Winters with whiskey',
    value: 'Winters with whiskey',
    imageUrl: '',
  },
];

const AddInterestsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = getStyles({theme});
  const defaultFormData = {
    selectedInterests: [],
  };
  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = (fieldName, value) => {
    console.log('handleChange value', value);
    setFormData({...formData, [fieldName]: value});
  };

  const titleProps = {
    type: 'title',
    boxProps: {},
    centerProps: {},
  };
  const subtitleProps = {
    boxProps: {},
    centerProps: {},
    rightProps: {},
    getRightComponent: () => {
      return <Content>3 of 4</Content>;
    },
  };

  const handleContinuePress = () => {
    navigation.navigate('EducationCareer');
  };

  const handleBackPress = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Container
        style={styles.container}
        title={getI18nMessage(addInterestsTitleLabel)}
        subtitle={getI18nMessage(addInterestsSubTitleLabel)}
        subtitleProps={subtitleProps}
        titleProps={titleProps}>
        <Box flexGrow={1}>
          <MultiSelectList
            items={interestList}
            selectedItems={formData['selectedInterests']}
            onChange={handleChange.bind(null, 'selectedInterests')}
          />
        </Box>
        <ButtonGroup
          primaryProps={{label: 'NEXT', onPress: handleContinuePress}}
          secondaryProps={{label: 'BACK', onPress: handleBackPress}}
        />
      </Container>
    </SafeAreaView>
  );
};

const getStyles = ({theme}) => {
  const styles = {
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    uploadBackgroundStyle: {
      height: 'auto',
    },
    bioBackgroundStyle: {
      height: 200,
    },
    bioInput: {height: 200},
    titleStyle: {
      fontWeight: '500',
    },
    centerStyle: {},
    rightPaginationStyle: {},
    textInput: {
      fontSize: 18,
      fontFamily: 'Montserrat-SemiBold',
    },
    buttonBgSplitLeft: {
      marginRight: 5,
    },
    buttonBgSplitRight: {
      marginLeft: 5,
    },
    buttonSplitLeft: {
      flex: 1,
      fontSize: 18,
      fontFamily: 'Montserrat-SemiBold',
    },
    buttonSplitRight: {
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
      flex: 1,
      borderRadius: 15,
      margin: 0,
      padding: 0,
      ...getShadow(),
    },
    backButtonTextStyle: {
      color: theme.colors.primary,
      fontSize: 19,
      fontWeight: '500',
      fontFamily: 'Montserrat-SemiBold',
    },
    backButtonContainerStyle: {
      borderRadius: 15,
      margin: 0,
      padding: 0,
      ...getShadow(),
    },
  };
  return createStyles(styles);
};

export {AddInterestsScreen};
