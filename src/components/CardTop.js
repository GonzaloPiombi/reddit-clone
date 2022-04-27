import { useEffect, useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

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
    <div>
      <p>{subName}</p>
      <p>
        Posted by u/{author} {relativeTime} ago
      </p>
    </div>
  );
};

export default CardTop;
