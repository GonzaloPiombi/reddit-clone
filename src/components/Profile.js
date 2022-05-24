import { useState } from 'react';
import { StyledProfile } from './styles/Profile.styled';
import { Form, Input, Label } from './styles/Form.styled';
import { Button } from './styles/Button.styled';
import { changeUsername } from '../helpers/helpers';
import Loader from './Loader';
import { useNavigate } from 'react-router';

const Profile = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const setUsername = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const hasUsernameChanged = await changeUsername(
      props.auth.currentUser,
      e.target.username.value,
      e.target
    );
    if (!hasUsernameChanged) {
      setIsLoading(false);
    } else {
      navigate('/');
    }
  };

  return (
    <StyledProfile>
      <h3>User Settings</h3>
      <Form onSubmit={setUsername}>
        <Label htmlFor="username">CHANGE YOUR USERNAME</Label>
        <Input type="text" id="username" name="username" />
        {!isLoading ? <Button type="submit">Save</Button> : <Loader />}
      </Form>
    </StyledProfile>
  );
};

export default Profile;
