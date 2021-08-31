import * as React from 'react';
import {Portal, Provider, Modal} from 'react-native-paper';
import {Dimensions} from 'react-native';
import createStyles from '@src/utils/createStyles';
import Container from '@src/components/Container';

const {width, height} = Dimensions.get('screen');

const Sidebar = ({
  title = '',
  modalProps = {},
  modalContainerStyle = {},
  contentContainerStyle = {},
  onHide,
  children,
}) => {
  const styles = getStyles();
  const handleHide = () => {
    if (onHide) {
      onHide();
    }
  };
  return (
    <Portal>
      <Modal
        visible
        onDismiss={handleHide}
        contentContainerStyle={[
          styles.modalContainerStyle,
          modalContainerStyle,
        ]}
        {...modalProps}>
        <Container
          style={[styles.container, contentContainerStyle]}
          title={title}>
          {children}
        </Container>
      </Modal>
    </Portal>
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
  };
  return createStyles(styles);
};

export default Sidebar;
