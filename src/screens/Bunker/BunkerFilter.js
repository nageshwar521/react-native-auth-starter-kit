import React, {useState} from 'react';
import {useTheme, Switch, Button} from 'react-native-paper';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import createStyles from '@src/utils/createStyles';
import Content from '@src/components/Content';
import {getShadow} from '@src/utils/common';
import {Box, Text} from 'react-native-design-utility';
import DateTimeInput from '@src/components/Input/DateTimeInput';
import {DropdownInput, TextInput} from '@src/components/Input';
import {useNavigation} from '@react-navigation/native';
import Modal from '@src/components/Modal';
import {ButtonGroup} from '@src/components/ButtonGroup/ButtonGroup';
import {DashboardItem} from '@src/modules/Dashboard/DashboardItem';
import PrimaryButton from '@src/components/Button/PrimaryButton';
import {TouchableOpacity} from 'react-native';

const genders = ['Male', 'Female', 'Other'];

const BunkerFilter = ({isVisible = true, onHide, isSortVisible = false}) => {
  const theme = useTheme();
  const styles = getStyles({theme});
  const navigation = useNavigation();
  const [ageValues, setAgeValues] = useState([18, 50]);
  const [milesValues, setMilesValues] = useState([1, 50]);
  const [genderValue, setGenderValue] = useState('');
  const [sortValue, setSortValue] = useState('');

  const handleAgeFilterChange = values => {
    setAgeValues(values);
  };

  const handleMileFilterChange = values => {
    setMilesValues(values);
  };

  const handleGenderFilterChange = value => {
    setGenderValue(value);
  };

  const handleSortChange = value => {
    setSortValue(value);
  };

  const handleApplyFiltersPress = () => {
    console.log('handleApplyFiltersPress');
  };

  const handleResetFiltersPress = () => {
    console.log('handleResetFiltersPress');
  };

  const handleHide = () => {
    if (onHide) {
      onHide();
    }
  };

  const getLabel = (title, subtitle) => {
    return (
      <Box flexDirection="row">
        <Text fontWeight="500" color={theme.colors.textDark} paddingRight={3}>
          {title}
        </Text>
        {subtitle ? (
          <Text color={theme.colors.textLight}>{subtitle}</Text>
        ) : null}
      </Box>
    );
  };

  return (
    <Modal visible={isVisible} onHide={handleHide} title="Filters">
      <Box flexGrow={1} paddingHorizontal={5} marginBottom={15}>
        <DashboardItem getTitle={getLabel.bind(null, 'Age', '(Years)')}>
          <Box paddingHorizontal={20}>
            <MultiSlider
              values={ageValues}
              sliderLength={280}
              onValuesChange={handleAgeFilterChange}
              min={18}
              max={80}
              step={1}
              allowOverlap={false}
              snapped
            />
          </Box>
        </DashboardItem>
        <DashboardItem getTitle={getLabel.bind(null, 'Location', '(in Miles)')}>
          <Box paddingHorizontal={20}>
            <MultiSlider
              values={milesValues}
              sliderLength={280}
              onValuesChange={handleMileFilterChange}
              min={1}
              max={100}
              step={1}
              allowOverlap={false}
              snapped
            />
          </Box>
        </DashboardItem>
        <DashboardItem title="Gender">
          <Box flexDirection="row">
            {genders.map(genderItem => {
              const isSelected = genderValue === genderItem;
              return (
                <Button
                  style={[
                    styles.genderButtonStyle,
                    isSelected ? styles.selectedGenderButtonStyle : null,
                  ]}
                  labelStyle={[
                    styles.genderButtonLabelStyle,
                    isSelected ? styles.selectedGenderButtonLabelStyle : null,
                  ]}
                  onPress={handleGenderFilterChange.bind(null, genderItem)}>
                  {genderItem}
                </Button>
              );
            })}
          </Box>
        </DashboardItem>
        {isSortVisible ? (
          <DashboardItem getTitle={getLabel.bind(null, 'Sort By')}>
            <Box>
              <DropdownInput
                gradient
                placeholder="Sorting Options"
                vertical
                items={[
                  {label: "What's New", value: "What's New"},
                  {
                    label: 'Bunker Reach - Low to High',
                    value: 'Bunker Reach - Low to High',
                  },
                  {
                    label: 'Bunker Reach - High to Low',
                    value: 'Bunker Reach - High to Low',
                  },
                  {label: 'Most Liked', value: 'Most Liked'},
                  {label: 'Most Commented', value: 'Most Commented'},
                ]}
                value={sortValue}
                onChange={handleSortChange}
              />
            </Box>
          </DashboardItem>
        ) : null}
      </Box>
      <Box paddingHorizontal={5}>
        <PrimaryButton
          label="APPLY FILTERS"
          onPress={handleApplyFiltersPress}
        />
      </Box>
      <Box>
        <TouchableOpacity
          onPress={handleResetFiltersPress}
          style={styles.resetButtonStyle}>
          <Text color={theme.colors.border}>Reset Filters</Text>
        </TouchableOpacity>
      </Box>
    </Modal>
  );
};

const getStyles = ({theme}) => {
  const styles = {
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    titleStyle: {
      fontWeight: '500',
    },
    genderButtonStyle: {
      borderWidth: 1,
      borderColor: theme.colors.textLight,
      borderRadius: 5,
      marginRight: 5,
    },
    selectedGenderButtonStyle: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    genderButtonLabelStyle: {
      color: theme.colors.textLight,
    },
    selectedGenderButtonLabelStyle: {
      color: theme.colors.light2,
    },
    resetButtonStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
    },
  };
  return createStyles(styles);
};

export {BunkerFilter};
