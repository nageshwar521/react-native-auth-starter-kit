import React, {useState} from 'react';
import {Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
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
} from '@src/translations/keys';
import {DashboardItem} from '../Dashboard/DashboardItem';
import {addLabel, professionLabel} from '@src/translations/keys';
import {AddProfession} from './AddProfession';
import {AddEducation} from './AddEducation';

const PersonalDetails = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const styles = getStyles({theme});
  const [isVisible, setIsVisible] = useState(false);
  const [currentForm, setCurrentForm] = useState('');

  const getDescDetails = (items = []) => {
    return (
      <Box>
        {items.map(item => {
          return <Text key={item}>{item}</Text>;
        })}
      </Box>
    );
  };

  const handleAddPress = formName => {
    setIsVisible(true);
    setCurrentForm(formName);
  };

  const handleHide = () => {
    setIsVisible(false);
    setCurrentForm('');
  };

  const handleFollowersPress = () => {
    navigation.navigate('Likes');
  };

  return (
    <Box paddingTop={10}>
      <Box flexDirection="row" justifyContent="between" flexWrap="wrap">
        <ListItem
          view="grid"
          leftIcon="account-supervisor-outline"
          title="0"
          description={getI18nMessage(friendsLabel)}
          containerProps={{mb: 10, mr: 10, justifyContent: 'center'}}
        />
        <ListItem
          view="grid"
          leftIcon="bullseye"
          title="0"
          description={getI18nMessage(bunkerReachLabel)}
          containerProps={{mb: 20, ml: 10, justifyContent: 'center'}}
        />
        <ListItem
          view="grid"
          leftIcon="account-group"
          title="0"
          description={getI18nMessage(followingsLabel)}
          containerProps={{mt: 10, mr: 10, justifyContent: 'center'}}
          onPress={handleFollowersPress}
        />
        <ListItem
          view="grid"
          leftIcon="comment-account-outline"
          title="0"
          description={getI18nMessage(followersLabel)}
          containerProps={{mt: 10, ml: 10, justifyContent: 'center'}}
        />
      </Box>
      <Box>
        <DashboardItem
          title={getI18nMessage(professionLabel)}
          buttonLabel={getI18nMessage(addLabel)}
          buttonProps={{onPress: handleAddPress.bind(null, 'profession')}}>
          <ListItem
            leftIcon="briefcase-outline"
            title="Designer"
            description={getDescDetails([
              'L&T Technology Services',
              'June 2020 - Present',
            ])}
          />
        </DashboardItem>
        <DashboardItem
          title={getI18nMessage(educationLabel)}
          buttonLabel={getI18nMessage(addLabel)}
          buttonProps={{onPress: handleAddPress.bind(null, 'education')}}>
          <ListItem
            leftIcon="school-outline"
            title="Masters"
            description={getDescDetails(['MIT University', '2017 - 2020'])}
          />
        </DashboardItem>
      </Box>
      {currentForm === 'profession' ? (
        <AddProfession onHide={handleHide} />
      ) : null}
      {currentForm === 'education' ? (
        <AddEducation onHide={handleHide} />
      ) : null}
    </Box>
  );
};

const getStyles = ({theme}) => {
  const styles = {
    container: {
      padding: 5,
      flexDirection: 'column',
    },
  };
  return createStyles(styles);
};

export {PersonalDetails};
