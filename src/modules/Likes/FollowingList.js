import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {useTheme, List, Divider, Text} from 'react-native-paper';
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
  messageLabel,
} from '@src/translations/keys';
import createStyles from '@src/utils/createStyles';
import Content from '@src/components/Content';
import {generateId, getShadow} from '@src/utils/common';
import {Box} from 'react-native-design-utility';
import {useNavigation} from '@react-navigation/native';
import MultiSelectList from '@src/components/MultiSelectList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DropdownInput} from '@src/components/Input';
import FastImage from 'react-native-fast-image';

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

const FollowingList = () => {
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
    centerProps: {style: styles.headerTitleStyle},
  };

  const handleMessagePress = () => {
    console.log('handleMessagePress');
  };

  const renderSeparator = () => {
    return <Divider style={styles.dividerStyle} />;
  };

  const renderListItem = ({item}) => {
    const iconProps = {
      right: props => (
        <Button
          bgColor={theme.colors.primary}
          textStyle={theme.colors.primary}
          containerStyle={styles.buttonContainerStyle}
          borderWidth={1}
          borderColor={theme.colors.border}
          borderRadius={10}
          onPress={handleMessagePress.bind(null, item)}>
          <Text style={styles.rightMessageTextStyle}>
            {getI18nMessage(messageLabel)}
          </Text>
        </Button>
      ),
    };
    let imageProps = {
      left: props => (
        <List.Icon icon="image-outline" color={theme.colors.textDark} />
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
          key={generateId()}
          title={item.label}
          description={item.subtitle}
          descriptionStyle={styles.descStyle}
          {...iconProps}
          {...imageProps}
        />
      </View>
    );
  };

  return (
    <MultiSelectList
      items={followerList}
      renderItem={renderListItem}
      listProps={{ItemSeparatorComponent: renderSeparator}}
    />
  );
};

const getStyles = ({theme}) => {
  const styles = {
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    headerTitleStyle: {paddingLeft: 10},
    labelStyle: {
      color: theme.colors.dark3,
      paddingBottom: 10,
    },
    titleStyle: {
      color: theme.colors.light2,
      fontWeight: '500',
    },
    descStyle: {
      color: theme.colors.textDark,
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
    rightMessageTextStyle: {
      fontFamily: 'Montserrat-Bold',
      fontSize: 12,
      fontWeight: '500',
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
    },
  };
  return createStyles(styles);
};

export {FollowingList};
