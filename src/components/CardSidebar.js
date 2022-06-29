import { StyledCardSidebar } from './styles/Card.styled';
import { useAuth } from '../AuthContext';
import { vote } from '../helpers/helpers';
import { useState } from 'react';

const CardSidebar = ({ votes, path }) => {
  const [currentVote, setVote] = useState(0);
  const { currentUser } = useAuth();

  const handleClick = async (e, value) => {
    try {
      const button = e.currentTarget;
      const newValue = await vote(path, currentUser.uid, value);
      if (value === 1) {
        button.classList.toggle('up');
        button.parentNode.childNodes[2].classList.remove('down');
      } else {
        button.classList.toggle('down');
        button.parentNode.childNodes[0].classList.remove('up');
      }
      setVote(() => newValue);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <StyledCardSidebar>
      <button onClick={(e) => handleClick(e, 1)}>
        <i className="las la-caret-up"></i>
      </button>
      <p>{votes + currentVote}</p>
      <button onClick={(e) => handleClick(e, -1)}>
        <i className="las la-caret-down"></i>
      </button>
    </StyledCardSidebar>
  );
};

export default CardSidebar;
