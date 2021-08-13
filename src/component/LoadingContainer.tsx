import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native-paper';

interface Props {
  size?: string;
  color?: string;
}

const StyledLoadingContainer = styled.View<Props>`
  padding: ${({ size }) => (size === 'small' ? '1 0px' : '40px')};
  align-items: center;
`;

function LoadingContainer({
  color = 'blue',
  size = 'large',
}: Props): ReactElement {
  return (
    <StyledLoadingContainer size={size}>
      <ActivityIndicator color={color} animating />
    </StyledLoadingContainer>
  );
}

export default LoadingContainer;
