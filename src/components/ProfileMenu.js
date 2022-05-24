import { StyledProfileMenu } from './styles/Profile.styled';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from '@firebase/auth';
import { useNavigate } from 'react-router';

const ProfileMenu = (props) => {
  const navigate = useNavigate();

  const logout = () => {
    props.onButtonClick();
    const auth = getAuth();
    signOut(auth);
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
      <button onClick={logout}>
        <i className="las la-sign-out-alt"></i>
        <p>Logout</p>
      </button>
    </StyledProfileMenu>
  );
};

export default ProfileMenu;
