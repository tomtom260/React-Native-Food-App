import React from 'react';
import styled from 'styled-components/native';

const StyledBackground = styled.ImageBackground.attrs({
  source: require('../../assets/home_bg.jpg'),
})`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const StyledFilter = styled.View`
  background-color: rgba(255, 255, 255, 0.3);
  position: absolute;
  width: 100%;
  height: 100%;
`;

function AccountsBackground({
  children,
}: {
  children: React.ReactElement;
}): React.ReactElement {
  return (
    <>
      <StyledBackground>
        <StyledFilter />
        {children}
      </StyledBackground>
    </>
  );
}

export default AccountsBackground;
