import {formatDistance} from 'date-fns';
import * as React from 'react';
import {View} from 'react-native';
import {IconButton, List, useTheme, Colors} from 'react-native-paper';
import {messages} from '../../locales/messages';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import createStyles from '../../utils/createStyles';

const TaskItem = ({
  selection = false,
  removable = false,
  isSelected = false,
  onDeletePress,
  onOpenDetails,
  id,
  title,
  description,
  ...props
}) => {
  const styles = getStyles();
  const navigation = useNavigation();
  const [expanded, setExpanded] = React.useState(false);
  const {colors} = useTheme();
  let extraProps = {};
  const {targetDate} = props;
  if (selection) {
    extraProps['left'] = () => (
      <List.Icon
        color={isSelected ? colors.primary : colors.text}
        icon={isSelected ? 'checkbox-marked' : 'checkbox-blank-outline'}
      />
    );
  }
  if (removable) {
    extraProps['right'] = () => (
      <IconButton icon="delete" onPress={onDeletePress} />
    );
  }
  const getDescription = () => {
    return formatDistance(new Date(targetDate), new Date(), {addSuffix: true});
  };
  const handlePress = () => {
    setExpanded(!expanded);
  };
  const handleOpen = () => {
    // onEditPress();
    const item = {
      title,
      description,
    };
    if (onOpenDetails) {
      onOpenDetails(item);
    }
  };
  const handleDelete = () => {
    onDeletePress();
  };
  return (
    <List.Accordion
      title={title}
      description={getDescription()}
      expanded={expanded}
      onPress={handlePress}>
      <View style={styles.row}>
        <IconButton
          icon="file-document-edit-online"
          style={styles.openButton}
          size={20}
          onPress={handleOpen}
        />
        <IconButton
          icon="delete"
          style={styles.deleteButton}
          size={20}
          onPress={handleDelete}
        />
      </View>
    </List.Accordion>
  );
};

const getStyles = () => {
  const styles = {
    row: {
      flexDirection: 'row',
      padding: 10,
      paddingTop: 0,
      justifyContent: 'flex-end',
    },
    openButton: {
      backgroundColor: '#1E88E5',
    },
    deleteButton: {
      backgroundColor: '#ef5350',
    },
  };

  return createStyles(styles);
};

export default TaskItem;
