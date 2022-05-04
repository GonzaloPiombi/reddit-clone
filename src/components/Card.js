import CardSidebar from './CardSidebar';
import CardTop from './CardTop';
import CardBottom from './CardBottom';
import { StyledCard } from './styles/Card.styled';

const Card = (props) => {
  return props.posts.map(
    ({ title, content, id, votes, date, author, subName }) => {
      return (
        <StyledCard key={id}>
          <CardSidebar votes={votes} />
          <CardTop author={author} date={date} subName={subName} />
          <h2>{title}</h2>
          <p>{content}</p>
          <CardBottom />
        </StyledCard>
      );
    }
  );
};

export default Card;
