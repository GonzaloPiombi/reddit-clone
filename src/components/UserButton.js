import { StyledMenuButton } from './styles/MenuButton.styled';

const UserButton = (props) => {
  return (
    <StyledMenuButton onClick={props.onButtonClick}>
      <img src="./images/pp.png" alt="Default avatar" />
      <p>{props.user}</p>
      <i className="las la-angle-down"></i>
    </StyledMenuButton>
  );
};

export default UserButton;
