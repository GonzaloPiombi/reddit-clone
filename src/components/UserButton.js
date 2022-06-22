import { StyledMenuButton } from './styles/MenuButton.styled';
import { useAuth } from '../AuthContext';

const UserButton = (props) => {
  const { currentUsername } = useAuth();
  return (
    <StyledMenuButton onClick={props.onButtonClick}>
      <img src="./images/pp.png" alt="Default avatar" />
      <p>{currentUsername}</p>
      <i className="las la-angle-down"></i>
    </StyledMenuButton>
  );
};

export default UserButton;
