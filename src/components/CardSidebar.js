import { StyledCardSidebar } from './styles/Card.styled';
import { useAuth } from '../AuthContext';
import { vote } from '../helpers/helpers';

const CardSidebar = ({ votes, path }) => {
  const { currentUser } = useAuth();

  const handleClick = async (e, value) => {
    try {
      const button = e.currentTarget;
      const classToApply = await vote(path, currentUser.uid, value);
      if (classToApply === 'Success') {
        if (value === 1) {
          button.classList.toggle('up');
          button.parentNode.childNodes[2].classList.remove('down');
        } else {
          button.classList.toggle('down');
          button.parentNode.childNodes[0].classList.remove('up');
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <StyledCardSidebar>
      <button onClick={(e) => handleClick(e, 1)}>
        <i className="las la-caret-up"></i>
      </button>
      <p>{votes}</p>
      <button onClick={(e) => handleClick(e, -1)}>
        <i className="las la-caret-down"></i>
      </button>
    </StyledCardSidebar>
  );
};

export default CardSidebar;
