import { StyledCardSidebar } from './styles/Card.styled';
import { useAuth } from '../AuthContext';
import { vote } from '../helpers/helpers';
import { useState } from 'react';
import { useEffect } from 'react';
import { collection, getDocs, getFirestore } from '@firebase/firestore';

const CardSidebar = ({ votes, path }) => {
  const { currentUser } = useAuth();
  const [currentVotes, setVotes] = useState(() => votes);
  const [upvote, toggleUpvote] = useState();
  const [downvote, toggleDownvote] = useState();

  useEffect(() => {
    const getVote = async () => {
      try {
        const db = getFirestore();
        const colRef = collection(db, path, 'votes');
        const snapshot = await getDocs(colRef);
        const isVoted = snapshot.docs.find(
          (doc) => doc.data().uid === currentUser.uid
        );
        if (!isVoted) {
          toggleUpvote(false);
          toggleDownvote(false);
        } else if (isVoted.data().vote === 1) {
          toggleUpvote(true);
        } else {
          toggleDownvote(true);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getVote();
  }, [currentUser]);

  const handleClick = async (value) => {
    try {
      if (!currentUser) return;
      const newValue = await vote(path, currentUser.uid, value);
      if (value === 1) {
        toggleUpvote(!upvote);
        toggleDownvote(false);
      } else {
        toggleDownvote(!downvote);
        toggleUpvote(false);
      }
      console.log(newValue);
      setVotes((prevValue) => prevValue + newValue);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <StyledCardSidebar>
      <button className={upvote ? 'up' : null} onClick={() => handleClick(1)}>
        <i className="las la-caret-up"></i>
      </button>
      <p>{currentVotes}</p>
      <button
        className={downvote ? 'down' : null}
        onClick={() => handleClick(-1)}
      >
        <i className="las la-caret-down"></i>
      </button>
    </StyledCardSidebar>
  );
};

export default CardSidebar;
