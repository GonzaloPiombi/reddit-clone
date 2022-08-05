import { StyledProfileMenu } from './styles/Profile.styled';
import { Link } from 'react-router-dom';

const CreateMenu = ({ toggleCreateSub, handleCreateButtonClick }) => {
  return (
    <StyledProfileMenu className="create">
      <button onClick={handleCreateButtonClick}>
        <Link
          to="/submit"
          style={{
            textDecoration: 'none',
            color: 'inherit',
            display: 'inherit',
            width: '100%',
          }}
        >
          Create Post
        </Link>
      </button>
      <button
        onClick={() => {
          toggleCreateSub();
          handleCreateButtonClick();
        }}
      >
        Create Subreddit
      </button>
    </StyledProfileMenu>
  );
};

export default CreateMenu;
