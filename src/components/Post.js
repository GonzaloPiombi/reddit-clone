import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  serverTimestamp,
  updateDoc,
  increment,
} from '@firebase/firestore';
import PostView from './PostView';
import Comments from './Comments';
import CommentBox from './CommentBox';
import { useAuth } from '../AuthContext';

const Post = (props) => {
  const params = useParams();
  const info = useLocation().state;
  const [postInfo, setPostInfo] = useState({});
  const [comments, setComments] = useState([]);
  const [commentStatus, toggleStatus] = useState(false);
  const [commentToReply, setCommentToReply] = useState(null);
  const [commentBox, toggleCommentBox] = useState(false);
  const [subID, setSubID] = useState(null);
  const [documentReference, setDocumentReference] = useState(null);
  const { currentUser } = useAuth();
  const db = getFirestore();
  const colRef = collection(db, 'subs');

  const findSubredditID = async () => {
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
    const getPostAndComments = async () => {
      //Get the subreddit id to make the queries for the post and comments.
      const subredditID = await findSubredditID();
      const docRef = doc(colRef, subredditID, 'posts', params.id);

      //Save them in state to use in other functions later when creating comments.
      setSubID(subredditID);
      setDocumentReference(docRef);

      //Check if we are coming from the Card component or redirecting from creating a post and setPostInfo accordingly.
      if (info) {
        setPostInfo(() => info);
      } else {
        await getPost(docRef);
        console.log(docRef);
      }
      console.log(postInfo);
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
          postData.push({
            ...doc.data(),
            id: doc.id,
            replies: replies,
            path: doc.ref.path,
          });
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
        subComments.push({
          ...doc.data(),
          id: doc.id,
          replies: replies,
          path: doc.ref.path,
        });
      })
    );
    return subComments;
  };

  const showCommentBox = (e) => {
    setCommentToReply(e.currentTarget.id);
    toggleCommentBox(true);
  };

  const hideCommentBox = () => {
    toggleCommentBox(false);
  };

  const submitComment = async (e, value) => {
    try {
      e.preventDefault();
      if (!value) return;
      const postRef = collection(documentReference, 'comments');
      const submitted = await addDoc(postRef, {
        author: currentUser.displayName,
        content: value,
        date: serverTimestamp(),
        votes: 0,
      });

      if (submitted) {
        updateDoc(documentReference, {
          comments: increment(1),
        });
      }
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitReply = async (e, value, path) => {
    try {
      e.preventDefault();
      const commentRef = collection(db, path, 'comments');

      const submitted = await addDoc(commentRef, {
        author: currentUser.displayName,
        content: value,
        date: serverTimestamp(),
        votes: 0,
      });

      if (submitted) {
        updateDoc(documentReference, {
          comments: increment(1),
        });
      }
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <PostView post={postInfo} />
      {currentUser ? <CommentBox submitComment={submitComment} /> : null}
      <Comments
        comments={comments}
        status={commentStatus}
        commentBox={commentBox}
        showCommentBox={showCommentBox}
        hideCommentBox={hideCommentBox}
        commentToReply={commentToReply}
        submitReply={submitReply}
      />
    </div>
  );
};

export default Post;
