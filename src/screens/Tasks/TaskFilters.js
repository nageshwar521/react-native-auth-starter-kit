import * as React from 'react';
import {View, Dimensions} from 'react-native';
import {
  List,
  Switch,
  useTheme,
  RadioButton,
  IconButton,
} from 'react-native-paper';
import Button from '../../components/Button';
import {messages} from '../../locales/messages';
import styled from 'styled-components/native';
import createStyles from '../../utils/createStyles';
import Sidebar from '../../components/Sidebar/Sidebar';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

const StyledRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledForm = styled.View`
  margin-bottom: 20px;
  flex-grow: 1;
`;

const TaskFilters = ({onHide}) => {
  const navigation = useNavigation();
  const defaultSortOptions = {
    field: 'name',
    order: 'asc',
  };
  const [selectedSortOptions, setSelectedSortOptions] = React.useState(
    defaultSortOptions,
  );
  const defaultFilters = {
    status: 'all',
  };
  const [selectedFilters, setSelectedFilters] = React.useState(defaultFilters);
  const [sortExpanded, setSortExpanded] = React.useState(false);
  const [filtersExpanded, setFiltersExpanded] = React.useState(false);
  const {colors} = useTheme();
  const styles = getStyles();
  const handleHideSidebar = () => {
    onHide();
  };
  const toggleSortExpand = () => {
    setSortExpanded(!sortExpanded);
  };
  const toggleFiltersExpand = () => {
    setFiltersExpanded(!filtersExpanded);
  };
  const handleApplyFilters = () => {
    onHide();
  };
  const handleFilterChange = (filterName, filterData) => {
    console.log('handleFilterChange filterName');
    console.log(filterName);
    setFilters({...filters, [filterName]: filterData});
  };

  const sortOptions = [
    {
      field: 'Name',
      order: 'asc',
    },
    {
      field: 'Date Created',
      order: 'asc',
    },
  ];

  return (
    <Sidebar
      contentContainerStyle={styles.contentContainerStyle}
      onHide={handleHideSidebar}>
      <StyledForm>
        <List.Accordion
          title={'Sort By'}
          expanded={sortExpanded}
          onPress={toggleSortExpand}>
          {sortOptions.map((opt) => {
            const isSelected = selectedSortOptions.field === opt.field;
            const isAscOrder = selectedSortOptions.order === 'asc';
            return (
              <List.Item
                key={opt.field}
                title={opt.field}
                description="no details"
                left={(props) => (
                  <RadioButton
                    style={styles.radioStyle}
                    value={isSelected}
                    onValueChange={handleFilterChange.bind(null, opt.field)}
                    {...props}
                  />
                )}
                right={(props) => (
                  <IconButton
                    icon={isAscOrder ? 'sort-ascending' : 'sort-descending'}
                  />
                )}
              />
            );
          })}
        </List.Accordion>
        <List.Accordion
          title={'Filters'}
          expanded={filtersExpanded}
          onPress={toggleFiltersExpand}>
          <List.Item
            title="Filter 1"
            description="filter 1 description"
            right={(props) => (
              <Switch
                style={styles.switchStyle}
                value={filters.filter1}
                onValueChange={handleFilterChange.bind(null, 'filter1')}
                {...props}
              />
            )}
          />
        </List.Accordion>
      </StyledForm>
      <StyledRow>
        <Button size="small" onPress={handleApplyFilters} position="full">
          {messages.task_settings_apply_button_label}
        </Button>
      </StyledRow>
    </Sidebar>
  );
};

const getStyles = () => {
  const styles = {
    modalContainerStyle: {
      padding: 20,
      height,
    },
    container: {
      position: 'absolute',
      paddingVertical: 30,
      top: -10,
      right: 0,
      bottom: 0,
      width: width - width / 3,
    },
    row: {
      flexDirection: 'row',
      padding: 10,
      paddingTop: 0,
      justifyContent: 'flex-end',
    },
    contentContainerStyle: {
      padding: 5,
    },
    switchStyle: {transform: [{scaleX: 0.1}, {scaleY: 0.1}]},
    radioStyle: {},
  };
  return createStyles(styles);
};

export default TaskFilters;
