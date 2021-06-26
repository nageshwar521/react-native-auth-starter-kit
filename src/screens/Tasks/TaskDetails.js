import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header';
import {messages} from '../../locales/messages';
import Container from '../../components/Container';
import createStyles from '../../utils/createStyles';
import useDeletePlanApi from '../../hooks/useDeletePlanApi';
import {useNavigation, useRoute} from '@react-navigation/core';
import {DateTimePicker, TextInput} from '../../components/Input';
import useUpdatePlanAPi from '../../hooks/useUpdatePlanApi';
import {showAlert, validateForm} from './TaskUtils';
import {View} from 'react-native';
import Button from '../../components/Button';

const TaskDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const {
    deletePlan,
    isPlanDeleting,
    deletePlanResponse,
    deletePlanError,
  } = useDeletePlanApi();
  const styles = getStyles();

  const {item} = route.params;

  const [taskDetails, setTaskDetails] = React.useState(item);

  const {
    updatePlan,
    planUpdatingStatus,
    updatePlanResponse,
    updatePlanError,
  } = useUpdatePlanAPi();
  const handleFormChange = (fieldName, text) => {
    setTaskDetails({...taskDetails, [fieldName]: text});
  };

  const handleUpdatePlan = () => {
    const {isValid, message} = validateForm(taskDetails);
    if (!isValid) {
      showAlert('Warning', message);
    } else {
      // showAlert('Form is valid');
      const {task, description, targetDate, ref_id} = taskDetails;
      updatePlan({task, description, targetDate, id: ref_id});
    }
  };

  const getActions = () => {
    return [];
  };

  const goToHome = () => {
    navigation.navigate('Tasks');
  };

  const handleActionPress = (actionItem) => {
    if (actionItem.type === 'update_plan') {
      handleUpdatePlan();
    }
    if (actionItem.type === 'delete_plan') {
      deletePlan(taskDetails.id);
    }
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

  const handleDeletePress = (planId) => {
    console.log('handleDeletePress', planId);
    deletePlan(planId);
  };

  return (
    <React.Fragment>
      <Header
        leftIcon="arrow-left"
        title={messages.plan_details_header_title}
        subtitle={messages.plan_details_header_desc}
        actions={getActions()}
        onActionPress={handleActionPress}
        onLeftPress={goToHome}
      />
      <Container style={styles.container}>
        <TextInput
          mode="flat"
          label={messages.addPlan_title_input_label}
          value={taskDetails.title}
          onChange={handleFormChange.bind(null, 'title')}
        />
        <TextInput
          mode="flat"
          label={messages.addPlan_desc_input_label}
          value={taskDetails.description}
          multiline
          numberOfLines={4}
          onChange={handleFormChange.bind(null, 'description')}
        />
        <DateTimePicker
          mode="flat"
          minimumDate={new Date()}
          label={messages.addPlan_target_date_input_label}
          value={taskDetails.targetDate}
          onChange={handleFormChange.bind(null, 'targetDate')}
        />
        <View style={styles.row}>
          <Button
            position="end"
            style={styles.updateButton}
            size="small"
            onPress={handleUpdatePlan}>
            {messages.plans_update_plan_button_label}
          </Button>
        </View>
      </Container>
    </React.Fragment>
  );
};

const getStyles = () => {
  const styles = {
    container: {
      padding: 20,
      backgroundColor: '#FFF',
    },
    row: {
      flexDirection: 'row',
      padding: 10,
      paddingRight: 0,
      justifyContent: 'flex-end',
    },
    updateButton: {
      backgroundColor: '#1E88E5',
    },
    deleteButton: {
      backgroundColor: '#ef5350',
    },
  };

  return createStyles(styles);
};

export default TaskDetails;
