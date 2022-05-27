import { StyledProfileMenu } from './styles/Profile.styled';

const CreateMenu = () => {
  return (
    <StyledProfileMenu style={{ right: '40px' }}>
      <button>Create Post</button>
      <button>Create Subreddit</button>
    </StyledProfileMenu>
  );
};

export default CreateMenu;
