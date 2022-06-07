import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, getDocs } from '@firebase/firestore';
import Card from './Card';

const Subreddit = (props) => {
  const subName = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      //Find the subreddit that the user wants to view.
      const db = getFirestore();
      const colRef = collection(db, 'subs');
      const snapshot = await getDocs(colRef);
      const subreddit = snapshot.docs.find((doc) => {
        return doc.data().name === subName.subreddit;
      });

      //Get all the posts made in that subreddit.
      const postsRef = collection(colRef, subreddit.id, 'posts');
      const postsSnapshot = await getDocs(postsRef);
      let data = [];
      postsSnapshot.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id, subName: subName.subreddit });
      });
      setPosts(data);
    };

    props.setSub(subName.subreddit);
    getPosts();
  }, [subName]);
  return (
    <div style={{ marginTop: '75px' }}>
      <Card posts={posts} />;
    </div>
  );
};

export default Subreddit;
