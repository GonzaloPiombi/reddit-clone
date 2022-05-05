import { Button } from './styles/Button.styled';
import Modal from './styles/Modal';
import { StyledSignInUp } from './styles/SignInUp.styled';

const SignUp = (props) => {
  return (
    <Modal>
      <StyledSignInUp>
        <div>
          <img src="./images/signform.png" alt="Sign-in/up form art" />
        </div>
        <div>
          <h3>Sign up</h3>
          <form>
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
