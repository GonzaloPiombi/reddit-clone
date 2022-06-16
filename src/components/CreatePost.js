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

const CreatePost = ({ subList, auth }) => {
  let navigate = useNavigate();
  const [isSubmiting, toggleIsSubmitting] = useState(false);

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
        author: auth.currentUser.displayName,
        title: e.target.title.value,
        content: e.target.text.value,
        votes: 0,
        date: serverTimestamp(),
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
              <option key={sub.id} id={sub.id}>
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
