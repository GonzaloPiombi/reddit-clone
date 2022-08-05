import { useEffect } from 'react';
import { useState } from 'react';

const AddHttps = (props) => {
  const [url, setUrl] = useState(() => props.href);

  useEffect(() => {
    if (!props.href.match(/^[a-zA-Z]+:\/\//)) {
      setUrl('https://' + props.href);
    }
  }, []);

  return <a href={url}>{props.children[0]}</a>;
};

export default AddHttps;
