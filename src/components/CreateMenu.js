import { StyledProfileMenu } from './styles/Profile.styled';
import { Link } from 'react-router-dom';

const CreateMenu = ({ toggleCreateSub }) => {
  return (
    <StyledProfileMenu style={{ right: '40px' }}>
      <button>
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
      <button onClick={toggleCreateSub}>Create Subreddit</button>
    </StyledProfileMenu>
  );
};

export default CreateMenu;
