import * as React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import createStyles from '../../utils/createStyles';

const {width, height} = Dimensions.get('screen');

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

const CardItem = ({lastItem = false}) => {
  const styles = getStyles();
  return (
    <Card style={[styles.container, lastItem ? styles.lastItemstyle : null]}>
      <Card.Cover
        style={styles.imageStyle}
        source={{uri: 'https://picsum.photos/700'}}
        resizeMode="contain"
      />
      <Card.Content>
        <Title style={styles.contentTitleStyle}>Card title</Title>
        <Paragraph style={styles.contentTitleStyle}>Card content</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );
};

const getStyles = () => {
  const styles = {
    container: {width: (width - 60) / 2, margin: 10},
    contentTitleStyle: {
      fontSize: 14,
    },
    contentTextStyle: {
      fontSize: 12,
    },
    imageStyle: {height: 100},
    lastItemstyle: {marginRight: 0},
  };
  return createStyles(styles);
};

export default CardItem;
