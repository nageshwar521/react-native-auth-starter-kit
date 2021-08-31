import React, {useState} from 'react';
import {Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import createStyles from '@src/utils/createStyles';
import Content from '@src/components/Content';
import {Box} from 'react-native-design-utility';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ListItem from '@src/components/ListItem';
import {getI18nMessage} from '@src/translations/messages';
import {
  addEducationLabel,
  addProfessionLabel,
  bunkerReachLabel,
  educationLabel,
  followersLabel,
  followingsLabel,
  friendsLabel,
  occupationalInterestsLabel,
  situationalInterestsLabel,
} from '@src/translations/keys';
import {DashboardItem} from '../Dashboard/DashboardItem';
import {addLabel, professionLabel} from '@src/translations/keys';
import Modal from '@src/components/Modal';
import {AddProfession} from './AddProfession';
import {AddEducation} from './AddEducation';
import {generateId} from '@src/utils/common';
import MultiSelectList from '@src/components/MultiSelectList';

const occupationInterests = [
  {
    label: 'Photography by Design',
    value: 'Photography by Design',
    imageUrl: '',
  },
];

const situationInterests = [
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

const CommentsDetails = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = getStyles({theme});
  const [isVisible, setIsVisible] = useState(false);
  const [currentForm, setCurrentForm] = useState('profession');

  const getRightArrow = () => {
    return (
      <Box position="absolute" right={10} bottom={10}>
        <Icon name="arrow-right" color={theme.colors.primary} size={16} />
      </Box>
    );
  };

  const renderItem = ({item}) => {
    return (
      <ListItem
        key={`${item.label}_${generateId()}`}
        containerProps={{mb: 20, align: 'center'}}
        leftIcon="briefcase-outline"
        title={item.label}
        description={item.label}
        titleStyle={styles.titleStyle}
        descStyle={styles.descStyle}
        getRightComponent={getRightArrow}
      />
    );
  };

  const handleAddPress = formName => {
    setIsVisible(true);
    setCurrentForm(formName);
  };

  const handleHide = () => {
    setIsVisible(false);
  };

  return (
    <Box paddingTop={10}>
      {situationInterests.map(listItem => {
        return renderItem({item: listItem});
      })}
    </Box>
  );
};

const getStyles = ({theme}) => {
  const styles = {
    container: {
      padding: 5,
      flexDirection: 'column',
    },
    textStyle: {
      color: theme.colors.textDark,
    },
    listTitleStyle: {
      fontSize: 14,
    },
    listDescStyle: {
      fontSize: 12,
    },
  };
  return createStyles(styles);
};

export {CommentsDetails};
