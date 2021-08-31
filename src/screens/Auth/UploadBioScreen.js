import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {useTheme} from 'react-native-paper';
import Container from '@src/components/Container';
import {getI18nMessage} from '@src/translations/messages';
import {
  nextLabel,
  bioUploadTitleLabel,
  bioUploadSubTitleLabel,
  bioLabel,
} from '@src/translations/keys';
import createStyles from '@src/utils/createStyles';
import Content from '@src/components/Content';
import {getShadow} from '@src/utils/common';
import {Box} from 'react-native-design-utility';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from '@src/components/Input';
import Thumbnail from '@src/components/Thumbnail';
import {ButtonGroup} from '@src/components/ButtonGroup/ButtonGroup';
import TextArea from '@src/components/Input/TextArea';
import {SafeAreaView} from 'react-native-safe-area-context';

const UploadBioScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = getStyles({theme});
  const defaultFormData = {
    imageUrl: '',
    bio: '',
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
      return <Content>2 of 4</Content>;
    },
  };

  const handleContinuePress = () => {
    navigation.navigate('AddInterests');
  };

  const handleBackPress = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Container
        style={styles.container}
        title={getI18nMessage(bioUploadTitleLabel)}
        subtitle={getI18nMessage(bioUploadSubTitleLabel)}
        subtitleProps={subtitleProps}
        titleProps={titleProps}>
        <Box flexGrow={1}>
          <Box flexDirection="row" alignItems="center" justifyContent="center">
            <Thumbnail
              vertical
              imageUrl={formData['imageUrl']}
              onChange={handleChange.bind(null, 'imageUrl')}
              backgroundStyle={styles.uploadBackgroundStyle}
            />
          </Box>
          <TextArea
            numberOfLines={12}
            gradient
            vertical
            value={formData['bio']}
            onChange={handleChange.bind(null, 'bio')}
            placeholder={getI18nMessage(bioLabel)}
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

export {UploadBioScreen};
