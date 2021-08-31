import Content from '@src/components/Content';
import ListItem from '@src/components/ListItem';
import MultiSelectList from '@src/components/MultiSelectList';
import createStyles from '@src/utils/createStyles';
import moment from 'moment';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import {Box} from 'react-native-design-utility';
import {useTheme, Divider, Text} from 'react-native-paper';
import PhotoItem from '@src/components/Image/PhotoItem';
import * as Progress from 'react-native-progress';

const Separator = () => {
  const theme = useTheme();
  const {width} = useWindowDimensions();
  const styles = getStyles({theme, width});
  return (
    <Box flexDirection="row" alignItems="center" paddingVertical={10}>
      <Divider style={styles.dividerStyle} />
      <Progress.Circle
        style={styles.progressLeftStyle}
        color={theme.colors.primary}
        size={30}
        progress={100}
        thickness={2}
      />
      <Progress.Circle
        style={styles.progressRightStyle}
        color={theme.colors.primary}
        size={30}
        progress={100}
        thickness={2}
      />
      <Divider style={styles.dividerStyle} />
    </Box>
  );
};

const ClubItem = ({title, description, datePosted, imageUrl, photos = []}) => {
  const theme = useTheme();
  const {width} = useWindowDimensions();
  const styles = getStyles({theme, width});

  const getDescription = () => {
    return (
      <Box>
        <Text style={styles.textStyle}>{description}</Text>
        <Text style={styles.textStyle}>{moment(datePosted).toNow()}</Text>
      </Box>
    );
  };

  const renderListItem = ({item}) => {
    return <PhotoItem {...item} />;
  };

  return (
    <Box mb={20}>
      <ListItem
        shadow={false}
        leftIcon="account"
        title={title}
        getDescription={getDescription}
      />
      <Separator />
      <MultiSelectList
        numColumns={4}
        items={photos}
        listProps={{horizontal: true}}
        renderItem={renderListItem}
        listProps={{
          columnWrapperStyle: {
            flex: 1,
          },
        }}
      />
    </Box>
  );
};

const getStyles = ({theme, width}) => {
  const styles = {
    photoContainerStyle: {
      marginBottom: 10,
    },
    progressLeftStyle: {right: -5},
    progressRightStyle: {left: -5},
    dividerStyle: {
      height: 3,
      width: width / 2 - 38,
    },
    textStyle: {
      color: theme.colors.textDark,
    },
  };
  return createStyles(styles);
};

export default ClubItem;
