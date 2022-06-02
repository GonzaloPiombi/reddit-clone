import Modal from './styles/Modal';
import { Button, AltButton } from './styles/Button.styled';
import { StyledCreateSub } from './styles/CreateSub.styled';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const CreateSub = (props) => {
  return (
    <Modal onClick={props.toggleCreateSub}>
      <StyledCreateSub onClick={(e) => e.stopPropagation()}>
        <div>
          <h1>Create a community</h1>
        </div>
        <form>
          <div>
            <label>Name</label>
            <span>r/</span>
            <input type="text" />
          </div>
          <div>
            <AltButton onClick={props.toggleCreateSub}>Cancel</AltButton>
            <Button>Create Community</Button>
          </div>
        </form>
      </StyledCreateSub>
    </Modal>
  );
};

export default CreateSub;
