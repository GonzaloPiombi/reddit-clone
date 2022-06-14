import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { getFirestore, collection, getDocs } from '@firebase/firestore';
import PostView from './PostView';
import Comments from './Comments';

const Post = (props) => {
  const params = useParams();
  const postInfo = useLocation().state;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const db = getFirestore();
        const colRef = collection(db, 'subs');
        const snapshot = await getDocs(colRef);
        const subreddit = snapshot.docs.find((doc) => {
          return doc.data().name === params.subreddit;
        });

        const postRef = collection(
          colRef,
          subreddit.id,
          'posts',
          params.id,
          'comments'
        );

        const commentsSnapshot = await getDocs(postRef);
        let postData = [];
        await Promise.all(
          commentsSnapshot.docs.map(async (doc) => {
            let replies = await getReplies(db, doc.ref.path);
            postData.push({ ...doc.data(), id: doc.id, replies: replies });
          })
        );
        console.log(postData);
        setComments(postData);
      } catch (error) {
        console.log(error.message);
      }
    };

    props.setSub(params.subreddit);
    getPost();
  }, []);

  const getReplies = async (db, path) => {
    let subComments = [];
    const subCommentsSnapshot = await getDocs(
      collection(db, `${path}/comments`)
    );
    await Promise.all(
      subCommentsSnapshot.docs.map(async (doc) => {
        let replies = await getReplies(db, doc.ref.path);
        subComments.push({ ...doc.data(), id: doc.id, replies: replies });
      })
    );
    return subComments;
  };
  return (
    <div>
      <PostView post={postInfo} />
      <Comments comments={comments} />
    </div>
  );
};

export default Post;
