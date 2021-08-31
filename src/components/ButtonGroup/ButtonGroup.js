import React from 'react';
import {backLabel, continueLabel} from '@src/translations/keys';
import {getI18nMessage} from '@src/translations/messages';
import {Box} from 'react-native-design-utility';
import {useTheme} from 'react-native-paper';
import Button from '../Button';
import Content from '../Content';
import createStyles from '@src/utils/createStyles';
import {getShadow} from '@src/utils/common';
import PrimaryButton from '../Button/PrimaryButton';
import SecondaryButton from '../Button/SecondaryButton';

const ButtonGroup = ({
  containerProps = {},
  showLeft = true,
  showRight = true,
  primaryProps = {},
  secondaryProps = {},
}) => {
  return (
    <Box flexDirection="row" {...containerProps}>
      {showLeft ? (
        <SecondaryButton margin={{marginRight: 5}} {...secondaryProps} />
      ) : null}
      {showRight ? (
        <PrimaryButton margin={{marginLeft: 5}} {...primaryProps} />
      ) : null}
    </Box>
  );
};

const getStyles = ({theme}) => {
  const styles = {};
  return createStyles(styles);
};

export {ButtonGroup};
