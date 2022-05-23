import { Input, Label } from './styles/Input.styled';

const Profile = () => {
  return (
    <div>
      <h3>User Settings</h3>
      <div>
        <Label>CHANGE YOUR USERNAME</Label>
        <Input type="text" />
      </div>
    </div>
  );
};

export default Profile;
