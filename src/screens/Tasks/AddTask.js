import * as React from 'react';
import {Portal, Provider, Modal} from 'react-native-paper';
import Button from '../../components/Button';
import useAddPlanApi from '../../hooks/useAddPlanApi';
import {messages} from '../../locales/messages';
import styled from 'styled-components/native';
import createStyles from '../../utils/createStyles';
import Container from '../../components/Container';
import {TextInput, DateTimePicker} from '../../components/Input';
import {showAlert, validateForm} from './TaskUtils';

const StyledRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const StyledForm = styled.View`
  margin-bottom: 20px;
`;

const AddTask = ({onHide}) => {
  const styles = getStyles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultPlanData = {
    title: '',
    description: '',
    targetDate: new Date(),
  };
  const [planData, setPlanData] = React.useState(defaultPlanData);
  const {
    addPlan,
    planAddingStatus,
    addPlanResponse,
    addPlanError,
  } = useAddPlanApi();
  const handleFormChange = (fieldName, text) => {
    setPlanData({...planData, [fieldName]: text});
  };

  const handleAddPlan = () => {
    const {isValid, message} = validateForm(planData);
    if (!isValid) {
      showAlert('Warning', message);
    } else {
      // showAlert('Form is valid');
      addPlan(planData);
    }
  };
  const handleCancelPlan = () => {
    onHide();
  };
  React.useEffect(() => {
    if (addPlanResponse) {
      console.log('addPlanResponse');
      console.log(addPlanResponse);
      setPlanData(defaultPlanData);
    }
    if (addPlanError) {
      console.log('addPlanError');
      console.log(addPlanError);
    }
  }, [addPlanResponse, addPlanError]);
  return (
    <Portal>
      <Modal style={styles.modalWrapper} visible>
        <Container title="Add Task">
          <StyledForm>
            <TextInput
              size="small"
              value={planData.title}
              label={messages.addPlan_title_input_label}
              onChangeText={handleFormChange.bind(null, 'title')}
            />
            <TextInput
              size="small"
              value={planData.description}
              label={messages.addPlan_desc_input_label}
              multiline
              numberOfLines={4}
              onChangeText={handleFormChange.bind(null, 'description')}
            />
            <DateTimePicker
              minimumDate={new Date()}
              size="small"
              value={planData.targetDate}
              label={messages.addPlan_target_date_input_label}
              onChange={handleFormChange.bind(null, 'targetDate')}
            />
          </StyledForm>
          <StyledRow>
            <Button
              disabled={planAddingStatus === 'loading'}
              mode="text"
              size="small"
              onPress={handleCancelPlan}>
              {messages.cancel_button_text}
            </Button>
            <Button
              disabled={planAddingStatus === 'loading'}
              size="small"
              onPress={handleAddPlan}
              position="end">
              {messages.addPlan_submit_button_text}
            </Button>
          </StyledRow>
        </Container>
      </Modal>
    </Portal>
  );
};

const getStyles = () => {
  const styles = {
    modalWrapper: {
      padding: 20,
    },
    container: {
      backgroundColor: '#DDD',
      padding: 20,
    },
  };
  return createStyles(styles);
};

export default AddTask;
