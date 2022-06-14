import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 280px;

  & .error {
    border-color: red;
  }

  & .valid {
    border-color: green;
  }
`;

const Input = styled.input`
  background-color: #fcfcfb;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: 1rem;
  height: 40px;
  margin-bottom: 10px;
  outline: none;
`;

const Label = styled.label`
  color: #525252;
  font-size: 0.9rem;
`;

const Select = styled.select`
  background-color: #fff;
  border-radius: 4px;
  color: #4a4a4a;
  font-size: 1rem;
  height: 30px;
  outline: none;
  padding: 0 4px;
  width: 225px;
`;

export { Form, Input, Label, Select };
