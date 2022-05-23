import { StyledProfile } from './styles/Profile.styled';
import { Form, Input, Label } from './styles/Form.styled';
import { Button } from './styles/Button.styled';

const Profile = () => {
  return (
    <StyledProfile>
      <h3>User Settings</h3>
      <Form>
        <Label>CHANGE YOUR USERNAME</Label>
        <Input type="text" />
        <Button type="submit">Save</Button>
      </Form>
    </StyledProfile>
  );
};

export default Profile;
