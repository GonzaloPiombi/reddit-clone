import { updateProfile } from '@firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from 'firebase/firestore';
import { formatDistanceToNowStrict } from 'date-fns';

const changeUsername = async (user, username, form) => {
  //Get the db and the users collection.
  const db = getFirestore();
  const colRef = collection(db, 'users');
  const documents = await getDocs(colRef);

  //Go through all the usernames and return if one is repeated.
  const repeatedUsername = documents.docs.find((doc) => {
    return doc.data().username === username;
  });

  if (repeatedUsername) {
    form.firstChild.textContent = 'USERNAME IS TAKEN';
    form.username.classList.add('error');
  } else if (username.length > 24) {
    form.firstChild.textContent =
      'USERNAME SHOULD BE SHORTER THAN 24 CHARACTERS';
    form.username.classList.add('error');
  } else {
    //Add the username to the db.
    form.firstChild.textContent = '';
    form.username.classList.add('valid');
    await setDoc(doc(db, 'users', user.uid), {
      username: username,
    });
    await updateProfile(user, {
      displayName: username,
    });
    return true;
  }
};

const formatDate = (date) => {
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const relativeTime = formatDistanceToNowStrict(
    new Date(year, month, day, hours, minutes, seconds)
  );
  return relativeTime;
};

export { changeUsername, formatDate };
