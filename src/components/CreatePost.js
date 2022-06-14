import { StyledCreatePost } from './styles/CreatePost.styled';
import { Select } from './styles/Form.styled';

const CreatePost = ({ subList }) => {
  return (
    <StyledCreatePost>
      <h2>Create a post</h2>
      <form>
        <div>
          <label>Choose a community</label>
          <Select required>
            {subList.map((sub) => (
              <option>r/{sub.name}</option>
            ))}
          </Select>
        </div>
        <div>
          <input name="title" type="text" placeholder="Title" required />
          <textarea name="text" type="text" placeholder="Text"></textarea>
        </div>
      </form>
    </StyledCreatePost>
  );
};

export default CreatePost;
