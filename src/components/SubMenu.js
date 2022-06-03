import { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { StyledProfileMenu } from './styles/Profile.styled';

const SubMenu = () => {
  const [subList, setSubList] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const colRef = collection(db, 'subs');
    const unsub = onSnapshot(colRef, (snapshot) => {
      let subs = [];
      snapshot.docs.forEach((doc) => {
        subs.push(doc.data().name);
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
        return <div>{sub}</div>;
      })}
    </StyledProfileMenu>
  );
};

export default SubMenu;
