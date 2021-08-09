import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native-paper';

const StyledLoadingContainer = styled.View`
  padding: 40px;
  align-items: center;
`;

function LoadingContainer(): ReactElement {
  return (
    <StyledLoadingContainer>
      <ActivityIndicator animating />
    </StyledLoadingContainer>
  );
}

export default LoadingContainer;
