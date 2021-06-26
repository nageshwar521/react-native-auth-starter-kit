import React from 'react';
import {View} from 'react-native';
import {Avatar, Button, Text} from 'react-native-paper';
import {messages} from '../../locales/messages';
import createStyles from '../../utils/createStyles';

const ProfileCard = () => {
  const styles = getStyles();
  const handleEditProfile = () => {
    console.log('handleEditProfile');
  };
  return (
    <View style={styles.container}>
      <View style={styles.bgContainer}></View>
      <View style={styles.avatarContainer}>
        <Avatar.Image
          size={56}
          source={require('../../assets/images/user.png')}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.titleStyle}>Nageshwar Reddy Pandem</Text>
        <Text style={styles.subtitleStyle}>
          nageshwar.uideveloper@gmail.com
        </Text>
        <Button moode="text" onClick={handleEditProfile}>
          {messages.profile_edit_profile_button_label}
        </Button>
      </View>
    </View>
  );
};

const getStyles = () => {
  const styles = {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      marginBottom: 20,
    },
    avatarContainer: {
      position: 'absolute',
      top: '20%',
    },
    bgContainer: {
      height: 100,
    },
    detailsContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleStyle: {
      paddingVertical: 5,
    },
    subtitleStyle: {
      paddingBottom: 15,
    },
  };
  return createStyles(styles);
};

export default ProfileCard;
