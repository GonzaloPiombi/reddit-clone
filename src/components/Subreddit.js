import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getFirestore, collection, getDocs } from '@firebase/firestore';
import Card from './Card';
import { Wrapper } from './styles/Card.styled';

const Subreddit = (props) => {
  const subName = useParams();
  const id = useLocation().state.id;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const db = getFirestore();
        const colRef = collection(db, 'subs');

        //Get all the posts made in that subreddit.
        const postsRef = collection(colRef, id, 'posts');
        const postsSnapshot = await getDocs(postsRef);
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
  }, [subName]);
  return (
    <Wrapper>
      <Card posts={posts} />;
    </Wrapper>
  );
};

export default Subreddit;
