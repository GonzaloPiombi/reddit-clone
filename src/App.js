import GlobalStyles from './components/styles/Global';
import Header from './components/Header';
import {
  getFirestore,
  collectionGroup,
  getDocs,
  getDoc,
  doc,
} from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from 'firebase/auth';
import { useState, useEffect } from 'react';
import Card from './components/Card';
import SortBar from './components/SortBar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateSub from './components/CreateSub';
import Subreddit from './components/Subreddit';

function App() {
  const [posts, setPosts] = useState([]);
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUsername, setCurrentUsername] = useState('');
  const [isCreateSub, setIsCreateSub] = useState(false);
  const [currentSub, setCurrentSub] = useState('Home');
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

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setIsSignedIn(true);
        setCurrentUsername(user.displayName);
      } else {
        setIsSignedIn(false);
        setCurrentUsername('');
      }
    });

    return () => unsub();
  }, [auth]);

  const signUserIn = async (e, email, password) => {
    e.preventDefault();
    try {
      if (!auth.currentUser) {
        await setPersistence(auth, browserSessionPersistence);
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

  const setUsername = (username) => {
    setCurrentUsername(username);
  };

  const toggleCreateSub = () => {
    setIsCreateSub(!isCreateSub);
  };

  const setSubName = (name) => {
    setCurrentSub(name);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <GlobalStyles />
        <Header
          showSignUpForm={showSignUpForm}
          showSignInForm={showSignInForm}
          isSignedIn={isSignedIn}
          user={currentUsername}
          toggleCreateSub={toggleCreateSub}
          currentSub={currentSub}
          setSub={setSubName}
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
          <Route
            path="/r/:subreddit"
            element={<Subreddit setSub={setSubName} />}
          />
          <Route
            path="/profile"
            element={
              <Profile
                auth={auth}
                username={currentUsername}
                handleUsernameChange={setUsername}
              />
            }
          />
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
        {isCreateSub && <CreateSub toggleCreateSub={toggleCreateSub} />}
      </div>
    </BrowserRouter>
  );
}

export default App;
