import { Button } from './styles/Button.styled';
import Modal from './styles/Modal';
import { StyledSignUp } from './styles/SignUp.styled';

const SignUp = (props) => {
  return (
    <Modal>
      <StyledSignUp>
        <div>
          <img src="./images/signform.png" alt="Sign-in/up form art" />
        </div>
        <div>
          <h3>Sign up</h3>
          <form>
            <label htmlFor="username">CHOOSE A USERNAME</label>
            <input type="text" id="username" name="username" />
            <label htmlFor="email">EMAIL</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="password">PASSWORD</label>
            <input type="password" id="password" name="password" />
            <Button type="submit">Sign Up</Button>
          </form>
        </div>
        <div>
          <button onClick={props.showSignUpForm} className="close-button">
            <i className="las la-times"></i>
          </button>
        </div>
      </StyledSignUp>
    </Modal>
  );
};

export default SignUp;
