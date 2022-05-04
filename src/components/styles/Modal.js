import styled from 'styled-components';

const Modal = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  overflow: auto;
  z-index: 1;
`;

export default Modal;
