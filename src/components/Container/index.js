import React from 'react';
import {View} from 'react-native';
import createStyles from '../../utils/createStyles';
import Content from '../Content';

const Container = ({
  style = {},
  titleStyle = {},
  title = '',
  children,
  titleProps = {},
  ...props
}) => {
  const styles = getStyles();
  return (
    <View style={[styles.container, style]}>
      {title ? (
        <Content style={[styles.title, titleStyle]} {...titleProps}>
          {title}
        </Content>
      ) : null}
      {children}
    </View>
  );
};

const getStyles = () => {
  const styles = {
    container: {
      padding: 20,
      backgroundColor: '#FFF',
    },
    title: {
      marginBottom: 20,
    },
  };

  return createStyles(styles);
};

export default Container;
