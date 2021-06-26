import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ListItem from './TaskItem';
import AddTask from './AddTask';
import Header from '../../components/Header';
import {getAllPlans} from '../../store/actions/plansActions';
import {FlatList} from 'react-native';
import {FAB, Divider, useTheme} from 'react-native-paper';
import Content from '../../components/Content';
import {messages} from '../../locales/messages';
import Container from '../../components/Container';
import LoadingScreen from '../Loading';
import {useFocusEffect} from '@react-navigation/core';
import createStyles from '../../utils/createStyles';
import useDeletePlanApi from '../../hooks/useDeletePlanApi';
import TaskFilters from './TaskFilters';

const TaskList = ({navigation}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [selectedPlans, setSelectedPlans] = React.useState([]);
  const [isVisibleAddPlanModal, setIsVisibleAddPlanModal] = React.useState(
    false,
  );
  const [isVisibleTaskFilters, setIsVisibleTaskFilters] = React.useState(false);
  const plans = useSelector((state) => state.plans.plans);
  const {status} = useSelector((state) => state.common);
  const {
    deletePlan,
    isPlanDeleting,
    deletePlanResponse,
    deletePlanError,
  } = useDeletePlanApi();
  const styles = getStyles({colors});
  console.log('plans plans');
  console.log(plans);

  const getActions = () => {
    return [{icon: 'filter-variant', type: 'show_filters'}];
  };

  const toggleDrawer = () => {
    navigation.openDrawer();
  };

  const handleActionPress = (actionItem) => {
    if (actionItem.type === 'show_filters') {
      setIsVisibleTaskFilters(true);
    }
  };

  const handleAddTaskPress = () => {
    setIsVisibleAddPlanModal(true);
  };

  React.useEffect(() => {
    if (deletePlanResponse) {
      console.log('deletePlanResponse');
      console.log(deletePlanResponse);
    }
    if (deletePlanError) {
      console.log('deletePlanError');
      console.log(deletePlanError);
    }
  }, [deletePlanResponse, deletePlanError]);

  useFocusEffect(
    React.useCallback(() => {
      if (status === 'initial') {
        // console.log('useFocusEffect');
        dispatch(getAllPlans());
      }
    }, [status]),
  );

  const handleListItemPress = (id) => {
    const isSelected = selectedPlans.includes(id);
    if (isSelected) {
      const filteredItems = selectedPlans.filter((itemId) => itemId !== id);
      setSelectedPlans(filteredItems);
    } else {
      setSelectedPlans([id, ...selectedPlans]);
    }
  };

  const handleDeletePress = (planId) => {
    deletePlan(planId);
  };

  const handleOpenDetails = (item) => {
    navigation.navigate('TaskDetails', {item});
  };

  return (
    <React.Fragment>
      {isVisibleAddPlanModal ? (
        <AddTask onHide={() => setIsVisibleAddPlanModal(false)} />
      ) : null}
      {isVisibleTaskFilters ? (
        <TaskFilters onHide={() => setIsVisibleTaskFilters(false)} />
      ) : null}
      <Header
        title={messages.plans_header_title}
        subtitle={messages.plans_header_desc}
        actions={getActions()}
        onActionPress={handleActionPress}
        onLeftPress={toggleDrawer}
      />
      {status === 'loading' ? (
        <LoadingScreen />
      ) : (
        <Container style={styles.container}>
          <FAB
            style={styles.fab}
            color={colors.textLight}
            small
            icon="plus"
            onPress={handleAddTaskPress}
          />
          <FlatList
            data={Array.isArray(plans) ? plans : []}
            renderItem={({item}) => {
              const isSelected = selectedPlans.includes(item.id);
              return (
                <ListItem
                  selection
                  removable
                  isSelected={isSelected}
                  onPress={handleListItemPress.bind(null, item.id)}
                  onDeletePress={handleDeletePress.bind(null, item.id)}
                  onOpenDetails={handleOpenDetails.bind(null, item)}
                  {...item}
                />
              );
            }}
            keyExtractor={(item, index) => `${item.id}_${index}`}
            refreshing={status === 'loading'}
            ItemSeparatorComponent={() => <Divider />}
            ListEmptyComponent={() => (
              <Content type="paragraph">{messages.plans_no_data_text}</Content>
            )}
          />
          <FAB
            style={styles.fab}
            small
            icon="plus"
            onPress={handleAddTaskPress}
          />
        </Container>
      )}
    </React.Fragment>
  );
};

const getStyles = ({colors}) => {
  const styles = {
    container: {
      flex: 1,
      padding: 0,
      backgroundColor: '#FFF',
    },
    fab: {
      backgroundColor: colors.primary,
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
  };

  return createStyles(styles);
};

export default TaskList;
