import { updateProfile } from '@firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  increment,
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

const vote = async (path, uid, vote) => {
  const db = getFirestore();
  const colRef = collection(db, path, 'votes');
  const docRef = doc(db, path);
  const snapshot = await getDocs(colRef);
  const docSnapshot = snapshot.docs.find((doc) => doc.data().uid === uid);

  if (docSnapshot) {
    const prevVote = docSnapshot.data().vote;
    console.log(prevVote);
    //Change vote from upvote to downvote or viceversa.
    if ((prevVote === 1 && vote === -1) || (prevVote === -1 && vote === 1)) {
      await deleteDoc(docSnapshot.ref);
      await castVote(colRef, uid, vote);
      updateDoc(docRef, {
        votes: vote === 1 ? increment(2) : increment(-2),
      });
      return vote === 1 ? 2 : -2;
    }
    //Change vote from upvote to nothing or downvote to nothing.
    await deleteDoc(docSnapshot.ref);
    updateDoc(docRef, {
      votes: vote === 1 ? increment(-1) : increment(1),
    });
    return -prevVote;
  } else {
    console.log('lala');
    //Cast vote from nothing to upvote or downvote.
    await castVote(colRef, uid, vote);
    updateDoc(docRef, {
      votes: vote === 1 ? increment(1) : increment(-1),
    });
    return vote;
  }
};

const castVote = (colRef, uid, vote) => {
  return addDoc(colRef, {
    uid: uid,
    vote: vote,
  });
};

export { changeUsername, formatDate, castVote, vote };
