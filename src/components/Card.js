import CardSidebar from './CardSidebar';
import CardTop from './CardTop';
import CardBottom from './CardBottom';

const Card = (props) => {
  return props.posts.map(
    ({ title, content, id, votes, date, author, subName }) => {
      return (
        <div key={id}>
          <CardSidebar votes={votes} />
          <CardTop author={author} date={date} subName={subName} />
          <h2>{title}</h2>
          <p>{content}</p>
          <CardBottom />
        </div>
      );
    }
  );
};

export default Card;
