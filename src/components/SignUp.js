import { useState } from 'react';
import { Button } from './styles/Button.styled';
import Modal from './styles/Modal';
import { StyledSignInUp, Redirect } from './styles/SignInUp.styled';
import Loader from './Loader';
import { updateProfile } from '@firebase/auth';
import { ErrorMessage, Form, Input, Label } from './styles/Form.styled';
import { changeUsername } from '../helpers/helpers';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router';

const SignUp = (props) => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { signUp, currentUser } = useAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      //Activate loader
      setIsLoading(true);

      const userCred = await signUp(
        e.target.email.value,
        e.target.password.value
      );
      e.target.reset();

      //Use anonymouse as a placeholder and display it if user does not select a username after.
      await updateProfile(userCred.user, {
        displayName: 'anonymous',
      });
      setIsSignedUp(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
      switch (error.code) {
        case 'auth/weak-password':
          setErrorMessage('Password should be at least 6 characters');
          break;
        case 'auth/email-already-in-use':
          setErrorMessage('Email is already in use');
          break;
        case 'auth/invalid-email':
          setErrorMessage('Please enter a valid email');
          break;
        default:
          setErrorMessage('An error has occured');
          break;
      }
    }
  };

  const setUsername = async (e) => {
    try {
      e.preventDefault();
      //Activate Loader.
      setIsLoading(true);
      const username = e.target.username.value;

      const hasUsernameChanged = await changeUsername(
        currentUser,
        username,
        e.target
      );
      if (!hasUsernameChanged) {
        setIsLoading(false);
      } else {
        navigate(0);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <Modal onClick={props.showSignUpForm}>
      <StyledSignInUp onClick={(e) => e.stopPropagation()}>
        <div>
          <img src="/images/signform.png" alt="Sign-in/up form art" />
        </div>
        <div>
          <h3>Sign up</h3>
          {!isSignedUp && (
            <Form onSubmit={handleSubmit}>
              <Label htmlFor="email">EMAIL</Label>
              <Input required type="email" id="email" name="email" />
              <Label htmlFor="password">PASSWORD</Label>
              <Input required type="password" id="password" name="password" />
              <ErrorMessage>{errorMessage}</ErrorMessage>
              {!isLoading ? <Button type="submit">Sign Up</Button> : <Loader />}
            </Form>
          )}
          {isSignedUp && (
            <Form onSubmit={setUsername}>
              <Label htmlFor="username">CHOOSE A USERNAME</Label>
              <Input required type="text" id="username" name="username" />
              {!isLoading ? <Button type="submit">Sign Up</Button> : <Loader />}
            </Form>
          )}
          <Redirect>
            <p>Already a redditor?</p>
            <button onClick={props.toggleForms}>LOG IN</button>
          </Redirect>
        </div>
        <div>
          {!isSignedUp && (
            <button onClick={props.showSignUpForm} className="close-button">
              <i className="las la-times"></i>
            </button>
          )}
        </div>
      </StyledSignInUp>
    </Modal>
  );
};

export default SignUp;
