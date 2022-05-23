import { StyledUserButton } from './styles/UserButton.styled';

const UserButton = (props) => {
  return (
    <StyledUserButton onClick={props.onButtonClick}>
      <img src="./images/pp.png" alt="Default avatar" />
      <p>{props.user.displayName}</p>
      <i className="las la-angle-down"></i>
    </StyledUserButton>
  );
};

export default UserButton;
