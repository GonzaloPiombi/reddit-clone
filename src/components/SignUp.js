import { Button } from './styles/Button.styled';
import Modal from './styles/Modal';
import { StyledSignInUp } from './styles/SignInUp.styled';
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';

const SignUp = (props) => {
  const signUp = async (e) => {
    try {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      const username = e.target.username.value;
      const userCred = await createUserWithEmailAndPassword(
        props.auth,
        email,
        password
      );
      e.target.reset();
      await updateProfile(userCred.user, {
        displayName: username,
      });
      console.log(userCred);
    } catch (error) {
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
          <form onSubmit={signUp}>
            <label htmlFor="username">CHOOSE A USERNAME</label>
            <input required type="text" id="username" name="username" />
            <label htmlFor="email">EMAIL</label>
            <input required type="email" id="email" name="email" />
            <label htmlFor="password">PASSWORD</label>
            <input required type="password" id="password" name="password" />
            <Button type="submit">Sign Up</Button>
          </form>
        </div>
        <div>
          <button onClick={props.showSignUpForm} className="close-button">
            <i className="las la-times"></i>
          </button>
        </div>
      </StyledSignInUp>
    </Modal>
  );
};

export default SignUp;
