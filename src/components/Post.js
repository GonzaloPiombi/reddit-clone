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
  query,
  orderBy,
} from '@firebase/firestore';
import PostView from './PostView';
import Comments from './Comments';
import CommentBox from './CommentBox';
import { useAuth } from '../AuthContext';
import SortBar from './SortBar';

const Post = (props) => {
  const params = useParams();
  const info = useLocation().state;
  const [postInfo, setPostInfo] = useState();
  const [comments, setComments] = useState([]);
  const [commentStatus, toggleStatus] = useState(false);
  const [commentToReply, setCommentToReply] = useState(null);
  const [commentBox, toggleCommentBox] = useState(false);
  const [documentReference, setDocumentReference] = useState(null);
  const [isLoading, toggleLoading] = useState(false);
  const [commentOrder, setCommentOrder] = useState('votes');
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
      //Check if the function was called for the first time already. If so just get the comments to reorder.
      if (!documentReference) {
        //Get the subreddit id to make the queries for the post and comments.
        const subredditID = await findSubredditID();
        const docRef = doc(colRef, subredditID, 'posts', params.id);

        //Save them in state to use in other functions later when creating comments.
        setDocumentReference(docRef);

        //Check if we are coming from the Card component or redirecting from creating a post and setPostInfo accordingly.
        if (info) {
          setPostInfo(() => info);
        } else {
          await getPost(docRef);
          console.log(docRef);
        }
        //Get the comments and replies of the post.
        await getComments(db, docRef);
        props.setSub(params.subreddit);
      } else {
        await getComments(db, documentReference);
      }
    };

    getPostAndComments();
  }, [commentOrder]);

  const getComments = async (db, docRef) => {
    try {
      const postRef = collection(docRef, 'comments');
      const q = query(postRef, orderBy(`${commentOrder}`, 'desc'));
      const commentsSnapshot = await getDocs(q);
      let postData = [];
      commentsSnapshot.docs.forEach(async (doc) => {
        postData.push({
          ...doc.data(),
          id: doc.id,
          path: doc.ref.path,
        });
      });
      await Promise.all(
        postData.map(async (item, i) => {
          let replies = await getReplies(db, item.path);
          postData[i] = { ...item, replies: replies };
        })
      );
      console.log(postData);
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
      toggleLoading(true);
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
      toggleLoading(true);

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

  const setOrder = (value) => {
    setCommentOrder(value);
  };

  return (
    <div>
      {postInfo && <PostView post={postInfo} />}
      {currentUser ? (
        <CommentBox submitComment={submitComment} isLoading={isLoading} />
      ) : null}
      <SortBar setOrder={setOrder} comments={true} />
      <Comments
        comments={comments}
        status={commentStatus}
        commentBox={commentBox}
        showCommentBox={showCommentBox}
        hideCommentBox={hideCommentBox}
        commentToReply={commentToReply}
        submitReply={submitReply}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Post;
