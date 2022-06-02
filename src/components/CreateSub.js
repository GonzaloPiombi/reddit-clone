import Modal from './styles/Modal';
import { Button, AltButton } from './styles/Button.styled';
import { StyledCreateSub } from './styles/CreateSub.styled';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

const CreateSub = (props) => {
  const createSubreddit = async (e) => {
    e.preventDefault();
    const db = getFirestore();
    const colRef = collection(db, 'subs');
    const subList = await getDocs(colRef);

    const repeatedSubName = subList.docs.find((doc) => {
      return doc.data().name === e.target.subName.value;
    });

    if (repeatedSubName) {
      e.target.firstChild.firstChild.textContent =
        'A subreddit with that name already exists';
      e.target.subName.classList.add('invalid');
      return;
    }
    e.target.firstChild.firstChild.textContent = '';
    e.target.subName.classList.remove('invalid');
    e.target.subName.classList.add('valid');
    await addDoc(colRef, {
      name: e.target.subName.value,
    });
    props.toggleCreateSub();
  };

  return (
    <Modal onClick={props.toggleCreateSub}>
      <StyledCreateSub onClick={(e) => e.stopPropagation()}>
        <div>
          <h1>Create a community</h1>
        </div>
        <form onSubmit={createSubreddit}>
          <div>
            <label htmlFor="subName">Name</label>
            <span>r/</span>
            <input name="subName" id="subName" type="text" />
          </div>
          <div>
            <AltButton onClick={props.toggleCreateSub}>Cancel</AltButton>
            <Button type="submit">Create Community</Button>
          </div>
        </form>
      </StyledCreateSub>
    </Modal>
  );
};

export default CreateSub;
