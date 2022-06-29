import CardSidebar from './CardSidebar';
import CardTop from './CardTop';
import CardBottom from './CardBottom';
import { StyledCard } from './styles/Card.styled';
import { Link } from 'react-router-dom';

const Card = (props) => {
  return props.posts.map(
    ({ title, content, id, votes, date, author, subName, comments, path }) => {
      return (
        <StyledCard key={id}>
          <CardSidebar votes={votes} path={path} />
          <Link
            to={`/r/${subName}/${id}`}
            style={{ textDecoration: 'none', color: '#000' }}
            state={{
              title,
              content,
              id,
              votes,
              date: date.toDate(),
              author,
              subName,
              comments,
              path,
            }}
          >
            <CardTop author={author} date={date.toDate()} subName={subName} />
            <h2>{title}</h2>
            <p>{content}</p>
            <CardBottom comments={comments} />
          </Link>
        </StyledCard>
      );
    }
  );
};

export default Card;
