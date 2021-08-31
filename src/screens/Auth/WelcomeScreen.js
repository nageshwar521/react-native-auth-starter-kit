import React, {useState} from 'react';
import {SafeAreaView, View, Dimensions, Pressable} from 'react-native';
import {useTheme, List, Divider} from 'react-native-paper';
import Container from '@src/components/Container';
import Button from '@src/components/Button';
import {getI18nMessage} from '@src/translations/messages';
import {
  backLabel,
  nextLabel,
  addInterestsTitleLabel,
  addInterestsSubTitleLabel,
  educationJobDetailsTitleLabel,
  educationJobDetailsSubTitleLabel,
  occupationInterestLabel,
  locationsInterestLabel,
  selectOptionsLabel,
  welcomeTitleLabel,
  welcomeSubTitleLabel,
  followLabel,
} from '@src/translations/keys';
import createStyles from '@src/utils/createStyles';
import Content from '@src/components/Content';
import {getShadow} from '@src/utils/common';
import {Box} from 'react-native-design-utility';
import {useNavigation} from '@react-navigation/native';
import MultiSelectList from '@src/components/MultiSelectList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DropdownInput} from '@src/components/Input';
import FastImage from 'react-native-fast-image';
import {ButtonGroup} from '@src/components/ButtonGroup/ButtonGroup';

const {width} = Dimensions.get('screen');

const followerList = [
  {
    label: 'Marie Winter 1',
    value: 'Marie Winter 1',
    subtitle: 'India',
    imageUrl: '',
  },
  {
    label: 'Marie Winter 2',
    value: 'Marie Winter 2',
    subtitle: 'United States',
    imageUrl: '',
  },
  {
    label: 'Marie Winter 3',
    value: 'Marie Winter 3',
    subtitle: 'Canada',
    imageUrl: '',
  },
  {
    label: 'Marie Winter 4',
    value: 'Marie Winter 4',
    subtitle: 'India',
    imageUrl: '',
  },
  {
    label: 'Marie Winter 5',
    value: 'Marie Winter 5',
    subtitle: 'India',
    imageUrl: '',
  },
];

const WelcomeScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = getStyles({theme});
  const defaultFormData = {
    selectedFollowers: [],
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
    boxProps: {flex: 1},
    centerProps: {style: styles.subtitleStyle},
  };

  const handleSelect = params => {
    const selectedValue = params.value;
    const selectedItems = formData['selectedFollowers'];
    const prevSelectedValue = selectedItems.join(',');
    let newSelectedItems = [];
    if (prevSelectedValue.includes(selectedValue)) {
      newSelectedItems = selectedItems.filter(item => item !== selectedValue);
    } else {
      newSelectedItems = [selectedValue, ...selectedItems];
    }
    setFormData({...formData, ['selectedFollowers']: newSelectedItems});
  };

  const handleContinuePress = () => {
    navigation.navigate('AppStack', {
      params: {screen: 'HomeNavigation', params: {screen: 'Profile'}},
    });
  };

  const handleBackPress = () => {
    navigation.navigate('EducationCareer');
  };

  const renderSeparator = () => {
    return <Divider style={styles.dividerStyle} />;
  };

  const renderListItem = ({item}) => {
    const selectedValue = formData['selectedFollowers'].join(',');
    const isSelected = selectedValue.includes(item.value);
    const centerProps = {
      style: styles.followStyle,
    };
    let iconProps = {
      right: props => (
        <Button
          containerStyle={styles.buttonContainerStyle}
          borderWidth={1}
          borderColor={theme.colors.textDark}
          borderRadius={10}
          onPress={handleSelect.bind(null, item)}>
          <Content centerProps={centerProps}>
            {getI18nMessage(followLabel)}
          </Content>
        </Button>
      ),
    };
    if (isSelected) {
      iconProps = {
        right: props => (
          <Button
            bgColor={theme.colors.primary}
            textStyle={theme.colors.primary}
            containerStyle={styles.buttonContainerStyle}
            borderWidth={1}
            borderColor={theme.colors.border}
            borderRadius={10}
            onPress={handleSelect.bind(null, item)}>
            <Icon name="check" size={24} style={styles.rightIconStyle} />
          </Button>
        ),
      };
    }
    let imageProps = {
      left: props => (
        <List.Icon
          {...props}
          color={theme.colors.textDark}
          icon="image-outline"
        />
      ),
    };
    if (item.imageUrl) {
      imageProps = {
        left: props => (
          <FastImage
            style={styles.listImageStyle}
            height={50}
            width={50}
            resizeMode="contain"
            source={{uri: item.imageUrl}}
            {...props}
          />
        ),
      };
    }
    return (
      <View style={[styles.listItemContainerStyle]}>
        <List.Item
          style={styles.listItemStyle}
          key={`${item.label}_${Math.random() * 10000000}`}
          title={item.label}
          description={item.subtitle}
          titleStyle={{color: theme.colors.textDark, fontWeight: '500'}}
          descriptionStyle={{color: theme.colors.textDark}}
          {...iconProps}
          {...imageProps}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Container
        showImage
        style={styles.container}
        title={getI18nMessage(welcomeTitleLabel)}
        subtitle={getI18nMessage(welcomeSubTitleLabel)}
        titleProps={titleProps}
        subtitleProps={subtitleProps}
        headerContainerProps={{
          paddingHorizontal: 0,
          marginHorizontal: 15,
        }}
        contentContainerProps={{p: 10}}>
        <Box flexGrow={1}>
          <MultiSelectList
            items={followerList}
            selectedItems={formData['selectedFollowers']}
            onChange={handleChange.bind(null, 'selectedFollowers')}
            renderItem={renderListItem}
            listProps={{ItemSeparatorComponent: renderSeparator}}
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
    labelStyle: {
      color: theme.colors.dark3,
      paddingBottom: 10,
    },
    titleStyle: {
      fontWeight: '500',
    },
    subtitleStyle: {
      flexDirection: 'row',
      flexWrap: 'wrap',
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
    listItemContainerStyle: {
      backgroundColor: theme.colors.bgPrimary,
    },
    listItemStyle: {
      borderRadius: 10,
    },
    dividerStyle: {
      backgroundColor: theme.colors.border,
    },
    listImageStyle: {borderRadius: 10},
    selectedListItemContainerStyle: {
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    rightIconStyle: {
      margin: 0,
      top: -3,
      color: theme.colors.light2,
    },
    followStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      color: theme.colors.primary,
    },
    buttonContainerStyle: {
      margin: 8,
      width: 80,
      height: 40,
    },
  };
  return createStyles(styles);
};

export {WelcomeScreen};
