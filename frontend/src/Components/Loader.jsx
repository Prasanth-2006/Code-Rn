import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="dots">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  inset: 0;
  background: #0c0c0c;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;

  .dots {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #75B06F;
    animation: pulse 1.2s ease-in-out infinite;
  }

  .dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .dot:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes pulse {
    0%, 80%, 100% {
      transform: scale(0.6);
      opacity: 0.3;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export default Loader;