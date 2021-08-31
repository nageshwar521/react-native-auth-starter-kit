import React, {useState} from 'react';
import {useTheme, Switch} from 'react-native-paper';
import Button from '@src/components/Button';
import {getI18nMessage} from '@src/translations/messages';
import {
  emailLabel,
  submitButtonLabel,
  selectLabel,
  recentWorkLabel,
  collegeInstitutionLabel,
  addEducationLabel,
} from '@src/translations/keys';
import createStyles from '@src/utils/createStyles';
import Content from '@src/components/Content';
import {getShadow} from '@src/utils/common';
import {Box} from 'react-native-design-utility';
import DateTimeInput from '@src/components/Input/DateTimeInput';
import {TextInput} from '@src/components/Input';
import {useNavigation} from '@react-navigation/native';
import Modal from '@src/components/Modal';
import {ButtonGroup} from '@src/components/ButtonGroup/ButtonGroup';

const AddEducation = ({isVisible = true, onHide}) => {
  const theme = useTheme();
  const styles = getStyles({theme});
  const defaultFormData = {
    email: '',
    college: '',
    from: '',
    to: '',
    recentWork: '',
  };
  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = (fieldName, value) => {
    setFormData({...formData, [fieldName]: value});
  };

  const handleSubmitPress = () => {
    console.log('handleSubmitPress');
  };

  const handleHide = () => {
    if (onHide) {
      onHide();
    }
  };

  return (
    <Modal
      visible={isVisible}
      onHide={handleHide}
      title={getI18nMessage(addEducationLabel)}>
      <Box flexGrow={1}>
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
          placeholder={getI18nMessage(collegeInstitutionLabel)}
          style={styles.textInput}
          vertical
          value={formData['college']}
          onChange={handleChange.bind(null, 'college')}
        />
        <Box flexDirection="row">
          <Box f={1} mr={15}>
            <DateTimeInput
              gradient
              placeholder={getI18nMessage(selectLabel)}
              vertical
              value={formData['from']}
              onChange={handleChange.bind(null, 'from')}
            />
          </Box>
          <Box f={1} ml={15}>
            <DateTimeInput
              gradient
              placeholder={getI18nMessage(selectLabel)}
              vertical
              value={formData['to']}
              onChange={handleChange.bind(null, 'to')}
            />
          </Box>
        </Box>
      </Box>
      <Box flexDirection="row" mb={20} alignItems="center">
        <Box mr={10}>
          <Switch
            color={theme.colors.primary}
            trackColor={theme.colors.bgPrimary}
            value={formData['recentWork']}
            onValueChange={handleChange.bind(null, 'recentWork')}
          />
        </Box>
        <Box>
          <Content>{getI18nMessage(recentWorkLabel)}</Content>
        </Box>
      </Box>
      <Box>
        <ButtonGroup
          showLeft={false}
          primaryProps={{
            label: getI18nMessage(submitButtonLabel),
            onPress: handleSubmitPress,
          }}
        />
      </Box>
    </Modal>
  );
};

const getStyles = ({theme}) => {
  const styles = {
    container: {
      flex: 1,
      flexDirection: 'column',
    },
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
      margin: 0,
      padding: 0,
      ...getShadow(),
    },
  };
  return createStyles(styles);
};

export {AddEducation};
