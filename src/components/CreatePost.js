import { StyledCreatePost, CreatePostBox } from './styles/CreatePost.styled';
import { Select } from './styles/Form.styled';
import { Button } from './styles/Button.styled';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from '@firebase/firestore';
import Loader from './Loader';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../AuthContext';

const CreatePost = ({ subList }) => {
  const [isSubmiting, toggleIsSubmitting] = useState(false);
  const { currentUser } = useAuth();
  let navigate = useNavigate();

  const submitPost = async (e) => {
    try {
      e.preventDefault();
      toggleIsSubmitting(true);
      const index = e.target.sublist.selectedIndex;
      const id = e.target.sublist[index].id;
      const db = getFirestore();
      const colRef = collection(db, 'subs');
      const subColRef = collection(colRef, id, 'posts');

      const docRef = await addDoc(subColRef, {
        author: currentUser.displayName,
        title: e.target.title.value,
        content: e.target.text.value,
        //Cambiar valor para usar suma.
        voteArray: [
          {
            uid: currentUser.uid,
            vote: 1,
          },
        ],
        comments: 0,
        date: serverTimestamp(),
        subName: e.target.sublist[index].getAttribute('name'),
      });
      navigate(`../${e.target.sublist.value}/${docRef.id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <StyledCreatePost>
      <h2>Create a post</h2>
      <form onSubmit={submitPost}>
        <div>
          <label>Choose a community</label>
          <Select name="sublist" required>
            {subList.map((sub) => (
              <option key={sub.id} id={sub.id} name={sub.name}>
                r/{sub.name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <input name="title" type="text" placeholder="Title" required />
          <CreatePostBox
            name="text"
            type="text"
            placeholder="Text"
          ></CreatePostBox>
        </div>
        {isSubmiting ? (
          <div>
            <Loader />
          </div>
        ) : (
          <Button type="submit">Post</Button>
        )}
      </form>
    </StyledCreatePost>
  );
};

export default CreatePost;
