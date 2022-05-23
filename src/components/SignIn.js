import { Button } from './styles/Button.styled';
import Modal from './styles/Modal';
import { StyledSignInUp } from './styles/SignInUp.styled';
import { Form, Input, Label } from './styles/Form.styled';

const SignIn = (props) => {
  return (
    <Modal>
      <StyledSignInUp>
        <div>
          <img src="./images/signform.png" alt="Sign in/up form art" />
        </div>
        <div>
          <h3>Sign In</h3>
          <Form
            onSubmit={(e) =>
              props.signIn(e, e.target.email.value, e.target.password.value)
            }
          >
            <Label htmlFor="email">EMAIL</Label>
            <Input type="text" id="email" name="email" />
            <Label htmlFor="password">PASSWORD</Label>
            <Input type="password" id="password" name="password" />
            <Button>Log In</Button>
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
