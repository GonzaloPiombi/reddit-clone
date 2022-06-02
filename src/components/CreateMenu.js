import { StyledProfileMenu } from './styles/Profile.styled';

const CreateMenu = ({ toggleCreateSub }) => {
  return (
    <StyledProfileMenu style={{ right: '40px' }}>
      <button>Create Post</button>
      <button onClick={toggleCreateSub}>Create Subreddit</button>
    </StyledProfileMenu>
  );
};

export default CreateMenu;
