import { StyledCardBottom } from './styles/Card.styled';

const CardBottom = ({ comments }) => {
  return (
    <StyledCardBottom>
      <i className="las la-comment-alt"></i>
      <p>{comments} Comments</p>
    </StyledCardBottom>
  );
};

export default CardBottom;
