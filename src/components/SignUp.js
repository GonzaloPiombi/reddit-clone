import { useState } from 'react';
import { Button } from './styles/Button.styled';
import Modal from './styles/Modal';
import { StyledSignInUp } from './styles/SignInUp.styled';
import Loader from './Loader';
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { Form, Input, Label } from './styles/Form.styled';
import { changeUsername } from '../helpers/helpers';

const SignUp = (props) => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async (e) => {
    try {
      e.preventDefault();
      //Activate loader
      setIsLoading(true);

      const email = e.target.email.value;
      const password = e.target.password.value;
      const userCred = await createUserWithEmailAndPassword(
        props.auth,
        email,
        password
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
    }
  };

  const setUsername = async (e) => {
    try {
      e.preventDefault();
      //Activate Loader.
      setIsLoading(true);
      const username = e.target.username.value;

      const hasUsernameChanged = await changeUsername(
        props.auth.currentUser,
        username,
        e.target
      );
      if (!hasUsernameChanged) {
        setIsLoading(false);
      } else {
        props.showSignUpForm();
        props.signIn(e);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <Modal>
      <StyledSignInUp>
        <div>
          <img src="./images/signform.png" alt="Sign-in/up form art" />
        </div>
        <div>
          <h3>Sign up</h3>
          {!isSignedUp && (
            <Form onSubmit={signUp}>
              <Label htmlFor="email">EMAIL</Label>
              <Input required type="email" id="email" name="email" />
              <Label htmlFor="password">PASSWORD</Label>
              <Input required type="password" id="password" name="password" />
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
