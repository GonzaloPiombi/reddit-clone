import { StyledProfileMenu } from './styles/Profile.styled';

const ProfileMenu = () => {
  return (
    <StyledProfileMenu>
      <button>
        <i className="las la-user-circle"></i>
        <p>Profile</p>
      </button>
      <button>
        <i className="las la-sign-out-alt"></i>
        <p>Logout</p>
      </button>
    </StyledProfileMenu>
  );
};

export default ProfileMenu;
