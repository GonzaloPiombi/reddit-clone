import CardSidebar from './CardSidebar';
import CardTop from './CardTop';
import CardBottom from './CardBottom';
import { StyledCard } from './styles/Card.styled';
import { Link } from 'react-router-dom';

const Card = (props) => {
  return props.posts.map(
    ({ title, content, id, votes, date, author, subName }) => {
      return (
        <StyledCard key={id}>
          <CardSidebar votes={votes} />
          <Link
            to={`/r/${subName}/${id}`}
            style={{ textDecoration: 'none', color: '#000' }}
          >
            <CardTop author={author} date={date} subName={subName} />
            <h2>{title}</h2>
            <p>{content}</p>
            <CardBottom />
          </Link>
        </StyledCard>
      );
    }
  );
};

export default Card;
