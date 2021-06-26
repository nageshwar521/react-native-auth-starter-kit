import React from 'react';
import {
  Caption,
  Headline,
  Paragraph,
  Subheading,
  Title,
  Text,
} from 'react-native-paper';
import createStyles from '../../utils/createStyles';

const Content = ({type = '', align = 'start', children, style, ...props}) => {
  const styles = getStyles({align});
  let ContentComponent = Text;
  if (type === 'headline') {
    ContentComponent = Headline;
  } else if (type === 'subheading') {
    ContentComponent = Subheading;
  } else if (type === 'paragraph') {
    ContentComponent = Paragraph;
  } else if (type === 'caption') {
    ContentComponent = Caption;
  } else if (type === 'title') {
    ContentComponent = Title;
  }
  return (
    <ContentComponent style={[styles.container, style]} {...props}>
      {children}
    </ContentComponent>
  );
};

const getStyles = ({align}) => {
  const styles = {
    container: {
      justifyContent:
        align === 'start'
          ? 'flex-start'
          : align === 'end'
          ? 'flex-end'
          : 'center',
    },
  };
  return createStyles(styles);
};

export default Content;
