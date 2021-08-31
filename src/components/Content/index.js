import React from 'react';
import {
  Caption,
  Headline,
  Paragraph,
  Subheading,
  Title,
  Text,
  useTheme,
} from 'react-native-paper';
import createStyles from '@src/utils/createStyles';
import {Box} from 'react-native-design-utility';

const Content = props => {
  const {
    type = '',
    children,
    style = {},
    leftStyle = {},
    rightStyle = {},
    getLeftComponent,
    getRightComponent,
    leftProps = {},
    rightProps = {},
    centerProps = {},
    boxProps = {},
  } = props;
  // console.log(boxProps, 'boxProps');
  // console.log(centerProps, 'centerProps');
  // console.log(rightProps, 'rightProps');
  const theme = useTheme();
  const styles = getStyles({type, theme});
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
    <Box flexDirection="row" {...boxProps}>
      {getLeftComponent ? (
        <ContentComponent
          style={[styles.textStyle, styles.leftStyle, leftStyle]}
          {...leftProps}>
          {getLeftComponent()}
        </ContentComponent>
      ) : null}
      <ContentComponent
        style={[styles.textStyle, styles.centerStyle, style]}
        {...centerProps}>
        {children}
      </ContentComponent>
      {getRightComponent ? (
        <ContentComponent
          style={[styles.textStyle, styles.rightStyle, rightStyle]}
          {...rightProps}>
          {getRightComponent()}
        </ContentComponent>
      ) : null}
    </Box>
  );
};

const getStyles = ({type = 'text', theme}) => {
  const styles = {
    textStyle: {
      fontSize: type === 'title' ? 18 : 14,
      fontWeight: type === 'title' ? '500' : '300',
      flexWrap: 'wrap',
      color: theme.colors.light2,
    },
    leftStyle: {
      alignItems: 'center',
    },
    centerStyle: {
      flexGrow: 1,
    },
    rightStyle: {
      flex: 3,
      justifyContent: 'flex-end',
    },
  };
  return createStyles(styles);
};

export default Content;
