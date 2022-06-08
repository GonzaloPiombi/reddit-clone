import { useEffect, useState } from 'react';
import { StyledCardTop } from './styles/Card.styled';
import { formatDate } from '../helpers/helpers';

const CardTop = ({ author, date, subName }) => {
  const [relativeTime, setRelativeTime] = useState(null);

  useEffect(() => {
    setRelativeTime(formatDate(date));
  }, []);

  return (
    <StyledCardTop>
      <h5>r/{subName}</h5>
      <div>
        <span>.</span>
      </div>
      <p>
        Posted by u/{author} {relativeTime} ago
      </p>
    </StyledCardTop>
  );
};

export default CardTop;
