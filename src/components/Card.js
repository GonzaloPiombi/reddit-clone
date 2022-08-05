import CardSidebar from './CardSidebar';
import CardTop from './CardTop';
import CardBottom from './CardBottom';
import { StyledCard } from './styles/Card.styled';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const Card = (props) => {
  return props.posts.map(
    ({ title, content, id, votes, date, author, subName, comments, path }) => {
      return (
        <StyledCard key={id}>
          <CardSidebar
            votes={votes}
            path={path}
            signIn={props.showSignInForm}
          />
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
            <ReactMarkdown
              components={{
                a: ({ ...props }) => (
                  <span className="link-replace" {...props} />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
            <CardBottom comments={comments} />
          </Link>
        </StyledCard>
      );
    }
  );
};

export default Card;
