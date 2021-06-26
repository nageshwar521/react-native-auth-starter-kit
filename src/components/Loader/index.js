import * as React from 'react';
import {Modal, Portal, Text, Button, Provider} from 'react-native-paper';
import createStyles from '../../utils/createStyles';

const Loader = ({
  isVisible = false,
  loadingText = 'Loading...',
  autoClose = true,
  ...otherProps
}) => {
  const styles = getStyles();

  return (
    <Provider>
      <Portal>
        <Modal
          dismissable={false}
          visible={isVisible}
          contentContainerStyle={styles.container}
          {...otherProps}>
          <Text>{loadingText}</Text>
        </Modal>
      </Portal>
    </Provider>
  );
};

const getStyles = () => {
  const styles = {
    container: {backgroundColor: '#FFF', padding: 20, height: 100, width: 100},
  };
  return createStyles(styles);
};

export default Loader;
