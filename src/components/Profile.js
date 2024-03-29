import { useState } from 'react';
import { StyledProfile } from './styles/Profile.styled';
import { Form, Input, Label } from './styles/Form.styled';
import { Button } from './styles/Button.styled';
import { changeUsername } from '../helpers/helpers';
import Loader from './Loader';
import { useNavigate } from 'react-router';
import { useAuth } from '../AuthContext';

const Profile = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, setUsername } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const hasUsernameChanged = await changeUsername(
      currentUser,
      e.target.username.value,
      e.target
    );
    if (!hasUsernameChanged) {
      setIsLoading(false);
    } else {
      setUsername(e.target.username.value);
      navigate('/');
    }
  };

  return (
    <StyledProfile>
      <h3>User Settings</h3>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="username">CHANGE YOUR USERNAME</Label>
        <Input type="text" id="username" name="username" autoComplete="off" />
        {!isLoading ? <Button type="submit">Save</Button> : <Loader />}
      </Form>
    </StyledProfile>
  );
};

export default Profile;
