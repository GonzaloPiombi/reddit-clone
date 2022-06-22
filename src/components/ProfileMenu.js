import { StyledProfileMenu } from './styles/Profile.styled';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useAuth } from '../AuthContext';

const ProfileMenu = (props) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    props.onButtonClick();
    logout();
    navigate('/');
  };

  return (
    <StyledProfileMenu>
      <button onClick={props.onButtonClick}>
        <Link
          to="/profile"
          style={{
            textDecoration: 'none',
            color: 'inherit',
            display: 'inherit',
            width: '100%',
          }}
        >
          <i className="las la-user-circle"></i>
          <p>Profile</p>
        </Link>
      </button>
      <button onClick={handleClick}>
        <i className="las la-sign-out-alt"></i>
        <p>Logout</p>
      </button>
    </StyledProfileMenu>
  );
};

export default ProfileMenu;
