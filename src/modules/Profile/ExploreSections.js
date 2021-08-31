import React, {useState} from 'react';
import {useTheme, Switch, Text} from 'react-native-paper';
import Button from '@src/components/Button';
import {getI18nMessage} from '@src/translations/messages';
import {
  emailLabel,
  submitButtonLabel,
  selectLabel,
  recentWorkLabel,
  collegeInstitutionLabel,
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
import PrimaryButton from '@src/components/Button/PrimaryButton';
import SecondaryButton from '@src/components/Button/SecondaryButton';

const ExploreSections = ({isVisible, onHide}) => {
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
    console.log('ExploreSections handleHide');
    if (onHide) {
      onHide();
    }
  };

  const getSocialContent = () => {
    return (
      <Box flexDirection="row" paddingHorizontal={20}>
        <Box f={1}>
          <Text style={styles.primaryButtonLeftTextStyle}>Social = </Text>
        </Box>
        <Box f={1}>
          <Text style={styles.primaryButtonRightTextStyle}>HOME</Text>
        </Box>
      </Box>
    );
  };

  const getBunkerContent = () => {
    return (
      <Box flexDirection="row" paddingHorizontal={20}>
        <Box f={1}>
          <Text style={styles.secondaryButtonLeftTextStyle}>Private = </Text>
        </Box>
        <Box f={1}>
          <Text style={styles.secondaryButtonRightTextStyle}>BUNKER</Text>
        </Box>
      </Box>
    );
  };

  return (
    <Modal visible={isVisible} onHide={handleHide}>
      <Box mb={20}>
        <Text style={styles.textStyle}>Hey Maria...</Text>
        <Text style={styles.textStyle}>Let's explore Cheers!</Text>
        <Text style={styles.textStyle}>
          Are you a private or a social person?
        </Text>
      </Box>
      <Box mt={10} mb={30}>
        <PrimaryButton
          getContent={getSocialContent}
          margin={{marginBottom: 30}}
        />
        <SecondaryButton getContent={getBunkerContent} />
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
    textStyle: {
      color: theme.colors.textDark,
      marginBottom: 3,
    },
    textInput: {
      fontSize: 18,
      fontFamily: 'Montserrat-SemiBold',
    },
    primaryButtonLeftTextStyle: {color: theme.colors.light2},
    primaryButtonRightTextStyle: {
      color: theme.colors.light2,
      fontWeight: '500',
    },
    secondaryButtonLeftTextStyle: {color: theme.colors.dark1},
    secondaryButtonRightTextStyle: {
      color: theme.colors.primary1,
      fontWeight: '500',
      fontFamily: 'Montserrat-Bold',
    },
  };
  return createStyles(styles);
};

export {ExploreSections};
