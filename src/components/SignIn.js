import { Button } from './styles/Button.styled';
import Modal from './styles/Modal';
import { StyledSignInUp } from './styles/SignInUp.styled';
import { Form, Input, Label, ErrorMessage } from './styles/Form.styled';
import { useAuth } from '../AuthContext';
import { useState } from 'react';
import Loader from './Loader';

const SignIn = (props) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, toggleIsLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      toggleIsLoading(true);
      await signIn(e.target.email.value, e.target.password.value);
      props.showSignInForm();
    } catch (error) {
      toggleIsLoading(false);
      switch (error.code) {
        case 'auth/wrong-password':
          setErrorMessage('Wrong password');
          break;
        case 'auth/user-not-found':
          setErrorMessage('User not found');
          break;
        case 'invalid-email':
          setErrorMessage('Enter a valid email');
          break;
        case 'too-many-requests':
          setErrorMessage('Too many request. Try again in a moment');
          break;
        default:
          setErrorMessage('An error has occured');
          break;
      }
    }
  };

  return (
    <Modal>
      <StyledSignInUp>
        <div>
          <img src="/images/signform.png" alt="Sign in/up form art" />
        </div>
        <div>
          <h3>Sign In</h3>
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="email">EMAIL</Label>
            <Input type="text" id="email" name="email" />
            <Label htmlFor="password">PASSWORD</Label>
            <Input type="password" id="password" name="password" />
            <ErrorMessage>{errorMessage}</ErrorMessage>
            {isLoading ? <Loader /> : <Button>Log In</Button>}
          </Form>
        </div>
        <div>
          <button onClick={props.showSignInForm} className="close-button">
            <i className="las la-times"></i>
          </button>
        </div>
      </StyledSignInUp>
    </Modal>
  );
};

export default SignIn;
