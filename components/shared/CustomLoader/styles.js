import styled from 'styled-components/native';

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Overlay = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 50% opacity black */
  justify-content: center;
  align-items: center;
`;

export const LoaderContainer = styled.View`
  background-color: transparent;
  border-radius: 10px;
  padding: 20px;
`;