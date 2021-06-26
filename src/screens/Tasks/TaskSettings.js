import * as React from 'react';
import Header from '../../components/Header';
import {messages} from '../../locales/messages';
import Container from '../../components/Container';
import createStyles from '../../utils/createStyles';
import {useNavigation} from '@react-navigation/core';
import Content from '../../components/Content';

const TaskSettings = () => {
  const navigation = useNavigation();
  const styles = getStyles();

  const getActions = () => {
    return [];
  };

  const goToHome = () => {
    navigation.openDrawer();
  };

  return (
    <React.Fragment>
      <Header
        leftIcon="menu"
        title={messages.task_settings_header_title}
        subtitle={messages.task_settings_header_desc}
        actions={getActions()}
        onLeftPress={goToHome}
      />
      <Container style={styles.container}>
        <Content>Task Settings</Content>
      </Container>
    </React.Fragment>
  );
};

const getStyles = () => {
  const styles = {
    container: {
      padding: 20,
      backgroundColor: '#FFF',
    },
    row: {
      flexDirection: 'row',
      padding: 10,
      paddingRight: 0,
      justifyContent: 'flex-end',
    },
    updateButton: {
      backgroundColor: '#1E88E5',
    },
    deleteButton: {
      backgroundColor: '#ef5350',
    },
  };

  return createStyles(styles);
};

export default TaskSettings;
