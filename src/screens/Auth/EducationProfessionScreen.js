import React, {useState} from 'react';
import {SafeAreaView, View, Dimensions, Pressable} from 'react-native';
import {useTheme, List} from 'react-native-paper';
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
import {DashboardItem} from '@src/modules/Dashboard/DashboardItem';

const {width} = Dimensions.get('screen');

const educationList = [
  {
    label: 'High School',
    value: 'High School',
    imageUrl: '',
  },
  {
    label: 'Intermediate',
    value: 'Intermediate',
    imageUrl: '',
  },
  {
    label: 'Bachelors',
    value: 'Bachelors',
    imageUrl: '',
  },
  {
    label: 'Masters',
    value: 'Masters',
    imageUrl: '',
  },
  {
    label: 'PhD',
    value: 'PhD',
    imageUrl: '',
  },
];

const EducationProfessionScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = getStyles({theme});
  const defaultFormData = {
    education: '',
    occupation: '',
    locations: '',
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
    getRightComponent: () => {
      return <Content>3 of 4</Content>;
    },
  };

  const handleSelect = (fieldName, params) => {
    setFormData({...formData, [fieldName]: params.value});
  };

  const handleContinuePress = () => {
    navigation.navigate('Welcome');
  };

  const handleBackPress = () => {
    navigation.navigate('AddInterests');
  };

  const renderItem = ({item}) => {
    const selectedValue = formData['education'];
    const isSelected = selectedValue === item.value;
    let selectedIcon = null;
    if (isSelected) {
      selectedIcon = (
        <Icon
          style={styles.iconStyle}
          color={theme.colors.primary}
          name="checkbox-marked-circle-outline"
          size={22}
        />
      );
    }
    let image = (
      <Icon color={theme.colors.border} size={32} name="image-outline" />
    );
    if (item.imageUrl) {
      image = (
        <FastImage
          style={styles.listImageStyle}
          height={50}
          width={50}
          resizeMode="contain"
          source={{uri: item.imageUrl}}
          {...props}
        />
      );
    }
    return (
      <Pressable
        onPress={handleChange.bind(null, 'education', item.value)}
        style={[styles.listItemContainerStyle, ,]}>
        <View
          style={[
            styles.listImageStyle,
            isSelected ? styles.selectedListItemContainerStyle : null,
          ]}>
          {image}
          {selectedIcon}
        </View>
        <Content centerProps={{style: styles.listImageTextStyle}}>
          {item.label}
        </Content>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Container
        style={styles.container}
        title={getI18nMessage(educationJobDetailsTitleLabel)}
        subtitle={getI18nMessage(educationJobDetailsSubTitleLabel)}
        subtitleProps={subtitleProps}
        titleProps={titleProps}>
        <Box flexGrow={1}>
          <Box mb={20}>
            <MultiSelectList
              numColumns={3}
              items={educationList}
              selectedItems={formData['education']}
              onChange={handleChange.bind(null, 'education')}
              renderItem={renderItem}
              listProps={{
                columnWrapperStyle: {
                  flex: 1,
                  justifyContent: 'space-between',
                },
              }}
            />
          </Box>
          <Box>
            <DashboardItem title={getI18nMessage(occupationInterestLabel)}>
              <DropdownInput
                gradient
                placeholder={getI18nMessage(selectOptionsLabel)}
                vertical
                items={[
                  {label: 'Software Engineer', value: 'Software Engineer'},
                  {label: 'Photographer', value: 'Photographer'},
                  {label: 'Farmer', value: 'Farmer'},
                ]}
                value={formData['occupation']}
                onChange={handleChange.bind(null, 'occupation')}
              />
            </DashboardItem>
          </Box>
          <Box>
            <DashboardItem title={getI18nMessage(locationsInterestLabel)}>
              <DropdownInput
                gradient
                placeholder={getI18nMessage(selectOptionsLabel)}
                vertical
                items={[
                  {label: 'Software Engineer', value: 'Software Engineer'},
                  {label: 'Photographer', value: 'Photographer'},
                  {label: 'Farmer', value: 'Farmer'},
                ]}
                value={formData['occupation']}
                onChange={handleChange.bind(null, 'occupation')}
              />
            </DashboardItem>
          </Box>
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
      margin: 10,
      padding: 5,
      width: width / 3 - 30,
      alignItems: 'center',
    },
    listImageTextStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      color: theme.colors.textDark,
    },
    listItemStyle: {
      borderRadius: 10,
      width: width / 3 - 30,
    },
    listImageStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      borderWidth: 2,
      borderColor: 'transparent',
      backgroundColor: theme.colors.bgPrimary,
      width: width / 3 - 50,
      height: width / 3 - 50,
      marginBottom: 15,
      ...getShadow(),
    },
    selectedListItemContainerStyle: {
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    iconStyle: {
      position: 'absolute',
      bottom: 3,
      left: 3,
    },
  };
  return createStyles(styles);
};

export {EducationProfessionScreen};
