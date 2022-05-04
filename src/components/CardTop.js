import { useEffect, useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import { Button } from './styles/Button.styled';
import { StyledCardTop } from './styles/Card.styled';

const CardTop = ({ author, date, subName }) => {
  const [relativeTime, setRelativeTime] = useState(null);

  useEffect(() => {
    const dateObj = date.toDate();
    const day = dateObj.getUTCDate();
    const month = dateObj.getUTCMonth();
    const year = dateObj.getUTCFullYear();
    setRelativeTime(formatDistanceToNowStrict(new Date(year, month, day)));
  }, []);

  return (
    <StyledCardTop>
      <h5>r/{subName}</h5>
      <span> . </span>
      <p>
        Posted by u/{author} {relativeTime} ago
      </p>
      <Button>Join</Button>
    </StyledCardTop>
  );
};

export default CardTop;
