import { StyledProfileMenu } from './styles/Profile.styled';
import { Link } from 'react-router-dom';

const ProfileMenu = () => {
  return (
    <StyledProfileMenu>
      <button>
        <Link
          to="/profile"
          style={{
            textDecoration: 'none',
            color: 'inherit',
            display: 'inherit',
          }}
        >
          <i className="las la-user-circle"></i>
          <p>Profile</p>
        </Link>
      </button>
      <button>
        <i className="las la-sign-out-alt"></i>
        <p>Logout</p>
      </button>
    </StyledProfileMenu>
  );
};

export default ProfileMenu;
