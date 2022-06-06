import { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { StyledProfileMenu } from './styles/Profile.styled';
import { Link } from 'react-router-dom';

const SubMenu = () => {
  const [subList, setSubList] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const colRef = collection(db, 'subs');
    const unsub = onSnapshot(colRef, (snapshot) => {
      let subs = [];
      snapshot.docs.forEach((doc) => {
        subs.push({ name: doc.data().name, id: doc.id });
      });
      setSubList(subs);

      return () => unsub();
    });
  }, []);

  return (
    <StyledProfileMenu
      style={{
        height: 'auto',
        top: '39px',
        left: '155px',
        borderTop: 'none',
        paddingTop: '0',
        borderTopRightRadius: '0',
        borderTopLeftRadius: '0',
        width: '215px',
      }}
    >
      {subList.map((sub) => {
        return (
          <Link key={sub.id} to={`/r/${sub.name}`}>
            {sub.name}
          </Link>
        );
      })}
    </StyledProfileMenu>
  );
};

export default SubMenu;
