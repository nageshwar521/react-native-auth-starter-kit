import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import Content from '../../components/Content';
import {messages} from '../../locales/messages';

const StyledLoadingScreen = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const LoadingScreen = () => {
  return (
    <StyledLoadingScreen>
      <Content align="center">{messages.loader_title_message}</Content>
    </StyledLoadingScreen>
  );
};

export default LoadingScreen;
