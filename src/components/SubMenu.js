import { useEffect } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { StyledSubMenu } from './styles/Profile.styled';
import { Link } from 'react-router-dom';

const SubMenu = (props) => {
  useEffect(() => {
    const db = getFirestore();
    const colRef = collection(db, 'subs');
    const unsub = onSnapshot(colRef, (snapshot) => {
      let subs = [];
      snapshot.docs.forEach((doc) => {
        subs.push({ name: doc.data().name, id: doc.id });
      });
      props.setSubList(subs);

      return () => unsub();
    });
  }, []);

  return (
    <StyledSubMenu>
      {props.subList.map((sub) => {
        return (
          <Link
            key={sub.id}
            to={`/r/${sub.name}`}
            onClick={props.onBtnClick}
            state={{ id: sub.id }}
          >
            r/{sub.name}
          </Link>
        );
      })}
    </StyledSubMenu>
  );
};

export default SubMenu;
