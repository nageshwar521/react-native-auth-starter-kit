import createStyles from '@src/utils/createStyles';
import React from 'react';
import {FlatList, View, SectionList} from 'react-native';
import {List, Text, useTheme} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {generateId, getShadow} from '@src/utils/common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Box} from 'react-native-design-utility';

const MultiSelectList = ({
  onChange,
  items = [],
  selectedItems = [],
  numColumns = 1,
  renderItem,
  listProps = {},
  type = 'list',
  headerTitleProps = {},
  headerTitleStyle = {},
  renderSectionItemHeader,
}) => {
  const theme = useTheme();
  const styles = getStyles({theme});

  const handleSelect = params => {
    const selectedValue = params.value;
    const prevSelectedValue = selectedItems.join(',');
    let newSelectedItems = [];
    if (prevSelectedValue.includes(selectedValue)) {
      newSelectedItems = selectedItems.filter(item => item !== selectedValue);
    } else {
      newSelectedItems = [selectedValue, ...selectedItems];
    }
    if (onChange) {
      onChange(newSelectedItems);
    }
  };

  const renderListItem = ({item}) => {
    const selectedValue = selectedItems.join(',');
    const isSelected = selectedValue.includes(item.value);
    let iconProps = {
      right: props => (
        <Icon
          {...props}
          color="transparent"
          name="checkbox-marked-circle-outline"
        />
      ),
    };
    if (isSelected) {
      iconProps = {
        right: props => (
          <Icon
            {...props}
            style={styles.iconStyle}
            color={theme.colors.primary}
            name="checkbox-marked-circle-outline"
            size={22}
          />
        ),
      };
    }
    let imageProps = {
      left: props => <List.Icon {...props} icon="image-outline" />,
    };
    if (item.imageUrl) {
      imageProps = {
        left: props => (
          <FastImage
            style={styles.listImageStyle}
            height={50}
            width={50}
            resizeMode="contain"
            source={{uri: item.imageUrl}}
            {...props}
          />
        ),
      };
    }

    return (
      <View
        style={[
          styles.listItemContainerStyle,
          isSelected ? styles.selectedListItemContainerStyle : null,
        ]}>
        <List.Item
          style={styles.listItemStyle}
          key={item.label}
          title={item.label}
          onPress={handleSelect.bind(null, item)}
          {...iconProps}
          {...imageProps}
        />
      </View>
    );
  };

  const renderSectionHeader = ({section: {title}}) => {
    return (
      <Box p={10} {...headerTitleProps}>
        <Text style={[styles.headerTitleStyle, headerTitleStyle]}>{title}</Text>
      </Box>
    );
  };

  if (type === 'sections') {
    return (
      <SectionList
        numColumns={numColumns}
        keyExtractor={item => `${JSON.stringify(item)}_${generateId()}`}
        extraData={selectedItems}
        renderItem={renderItem ? renderItem : renderListItem}
        sections={items}
        renderSectionHeader={
          renderSectionItemHeader
            ? renderSectionItemHeader
            : renderSectionHeader
        }
        {...listProps}
      />
    );
  }

  return (
    <FlatList
      numColumns={numColumns}
      keyExtractor={item => `${JSON.stringify(item)}_${generateId()}`}
      extraData={selectedItems}
      renderItem={renderItem ? renderItem : renderListItem}
      data={items}
      {...listProps}
    />
  );
};

const getStyles = ({theme}) => {
  const styles = {
    listItemContainerStyle: {
      padding: 5,
      borderWidth: 2,
      borderColor: 'transparent',
      borderRadius: 10,
      margin: 5,
      marginBottom: 10,
      backgroundColor: theme.colors.light1,
      ...getShadow(),
    },
    listItemStyle: {
      borderRadius: 10,
    },
    listImageStyle: {borderRadius: 10},
    selectedListItemContainerStyle: {
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    iconStyle: {
      position: 'absolute',
      top: -8,
      right: -8,
    },
    headerTitleStyle: {
      color: theme.colors.textDark,
      textAlign: 'center',
    },
  };
  return createStyles(styles);
};

export default MultiSelectList;
