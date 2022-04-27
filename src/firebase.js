import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBBOAVqDHzUpd4aYIJDHo4GMRy5XW_kU5w',
  authDomain: 'reddit-clone-ccda2.firebaseapp.com',
  projectId: 'reddit-clone-ccda2',
  storageBucket: 'reddit-clone-ccda2.appspot.com',
  messagingSenderId: '313803069299',
  appId: '1:313803069299:web:e780770bf4cfd920c41706',
};

function firebase() {
  initializeApp(firebaseConfig);
}

export default firebase;
