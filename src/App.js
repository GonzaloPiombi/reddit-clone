import GlobalStyles from './components/styles/Global';
import Header from './components/Header';
import {
  getFirestore,
  collectionGroup,
  getDocs,
  getDoc,
  doc,
} from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState, useEffect } from 'react';
import Card from './components/Card';
import SortBar from './components/SortBar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [posts, setPosts] = useState([]);
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const db = getFirestore();
        //Get every collection with the 'posts' name.
        const colRef = collectionGroup(db, 'posts');

        const snapshot = await getDocs(colRef);
        let data = [];
        await Promise.all(
          snapshot.docs.map(async (item) => {
            //Query the name of the subreddit the post was made and add it to the object.
            const docSnapshot = await getDoc(
              doc(db, 'subs', item.ref.parent.parent.id)
            );
            const subName = docSnapshot.data().name;
            data.push({ ...item.data(), id: item.id, subName: subName });
          })
        );
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getPosts();
  }, []);

  const signUserIn = async (e, email, password) => {
    e.preventDefault();
    try {
      if (!auth.currentUser) {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setIsSignedIn(true);
      setSignIn(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const showSignUpForm = () => {
    setSignUp(!signUp);
  };

  const showSignInForm = () => {
    setSignIn(!signIn);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <GlobalStyles />
        <Header
          showSignUpForm={showSignUpForm}
          showSignInForm={showSignInForm}
          isSignedIn={isSignedIn}
          auth={auth}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SortBar />
                <Card posts={posts} />
              </>
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        {signUp && (
          <SignUp
            showSignUpForm={showSignUpForm}
            auth={auth}
            signIn={signUserIn}
          />
        )}
        {signIn && (
          <SignIn showSignInForm={showSignInForm} signIn={signUserIn} />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
