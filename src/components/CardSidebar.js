import { StyledCardSidebar } from './styles/Card.styled';

const CardSidebar = ({ votes }) => {
  return (
    <StyledCardSidebar>
      <button>
        <i className="las la-caret-up"></i>
      </button>
      <p>{votes}</p>
      <button>
        <i className="las la-caret-down"></i>
      </button>
    </StyledCardSidebar>
  );
};

export default CardSidebar;
