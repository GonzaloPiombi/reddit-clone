import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from '@firebase/firestore';
import Card from './Card';
import SortBar from './SortBar';
import { Wrapper } from './styles/Card.styled';

const Subreddit = (props) => {
  const subName = useParams();
  const id = useLocation().state.id;
  const [posts, setPosts] = useState([]);
  const [postOrder, setPostOrder] = useState('votes');

  useEffect(() => {
    const getPosts = async () => {
      try {
        const db = getFirestore();
        const colRef = collection(db, 'subs');

        //Get all the posts made in that subreddit.
        const postsRef = collection(colRef, id, 'posts');
        const q = query(postsRef, orderBy(`${postOrder}`, 'desc'));
        const postsSnapshot = await getDocs(q);
        let data = [];
        postsSnapshot.docs.forEach((doc) => {
          data.push({
            ...doc.data(),
            id: doc.id,
            subName: subName.subreddit,
            path: doc.ref.path,
          });
        });
        setPosts(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    props.setSub(subName.subreddit);
    getPosts();
  }, [subName, postOrder]);

  const setOrder = (value) => {
    setPostOrder(value);
  };

  return (
    <div>
      <SortBar setOrder={setOrder} order={postOrder} />
      <Card posts={posts} />
    </div>
  );
};

export default Subreddit;
