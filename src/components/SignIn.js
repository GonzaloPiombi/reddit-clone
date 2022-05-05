import { Button } from './styles/Button.styled';
import Modal from './styles/Modal';
import { StyledSignInUp } from './styles/SignInUp.styled';

const SignIn = (props) => {
  return (
    <Modal>
      <StyledSignInUp>
        <div>
          <img src="./images/signform.png" alt="Sign in/up form art" />
        </div>
        <div>
          <h3>Sign In</h3>
          <form>
            <label htmlFor="username">USERNAME</label>
            <input type="text" id="username" name="username" />
            <label htmlFor="password">PASSWORD</label>
            <input type="password" id="password" name="password" />
            <Button>Log In</Button>
          </form>
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
