import React, {useEffect, useState} from 'react';
import {ScrollView, TextInput} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../components/Button';
import Header from '../../components/Header';
import {userLogout} from '../../redux/actions/authActions';
import createStyles from '../../utils/createStyles';
import CardItem from './CardItem';

const HomeScreen = () => {
  const styles = getStyles();
  const {status} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log('handleLogout');
    dispatch(userLogout());
  };

  const actions = [{label: 'Logout'}];

  return (
    <>
      <Header title="Home" actions={actions} onActionPress={handleLogout} />
      <Text>{status}</Text>
      <ScrollView>
        <Box p={5} justify="between" flexDirection="row" flexWrap="wrap">
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem style={styles.lastItem} />
        </Box>
      </ScrollView>
    </>
  );
};

const getStyles = () => {
  const styles = {
    lastItem: {
      marginRight: 'auto',
    },
  };
  return createStyles(styles);
};

export default HomeScreen;
