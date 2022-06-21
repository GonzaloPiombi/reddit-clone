import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
} from '@firebase/firestore';
import PostView from './PostView';
import Comments from './Comments';
import CommentBox from './CommentBox';

const Post = (props) => {
  const params = useParams();
  const info = useLocation().state;
  const [postInfo, setPostInfo] = useState({});
  const [comments, setComments] = useState([]);
  const [commentStatus, toggleStatus] = useState(false);
  const [commentToReply, setCommentToReply] = useState(null);
  const [commentBox, toggleCommentBox] = useState(false);

  const findSubredditID = async (colRef) => {
    const snapshot = await getDocs(colRef);
    const subreddit = snapshot.docs.find((doc) => {
      return doc.data().name === params.subreddit;
    });
    return subreddit.id;
  };

  const getPost = async (docRef) => {
    const post = await getDoc(docRef);
    setPostInfo(() => {
      return {
        ...post.data(),
        id: post.id,
        date: post.data().date.toDate(),
      };
    });
  };

  useEffect(() => {
    const db = getFirestore();
    const colRef = collection(db, 'subs');
    const getPostAndComments = async () => {
      //Get the subreddit id to make the queries for the post and comments.
      const subredditID = await findSubredditID(colRef);
      const docRef = doc(colRef, subredditID, 'posts', params.id);
      //Check if we are coming from the Card component or redirecting from creating a post and setPostInfo accordingly.
      if (info) {
        setPostInfo(() => info);
      } else {
        await getPost(docRef);
        console.log(docRef);
      }
      //Get the comments and replies of the post.
      await getComments(db, docRef);
    };

    getPostAndComments();
    props.setSub(params.subreddit);
  }, []);

  const getComments = async (db, docRef) => {
    try {
      const postRef = collection(docRef, 'comments');

      const commentsSnapshot = await getDocs(postRef);
      let postData = [];
      await Promise.all(
        commentsSnapshot.docs.map(async (doc) => {
          let replies = await getReplies(db, doc.ref.path);
          postData.push({ ...doc.data(), id: doc.id, replies: replies });
        })
      );
      setComments(postData);
      toggleStatus(true);
    } catch (error) {
      console.log(error.message);
    }
  };

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

  const showCommentBox = (e) => {
    console.log(e.currentTarget.id);
    setCommentToReply(e.currentTarget.id);
    toggleCommentBox(true);
  };

  const hideCommentBox = () => {
    toggleCommentBox(false);
  };

  return (
    <div>
      <PostView post={postInfo} />
      <CommentBox />
      <Comments
        comments={comments}
        status={commentStatus}
        commentBox={commentBox}
        showCommentBox={showCommentBox}
        hideCommentBox={hideCommentBox}
        commentToReply={commentToReply}
      />
    </div>
  );
};

export default Post;
