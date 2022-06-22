import GlobalStyles from './components/styles/Global';
import Header from './components/Header';
import {
  getFirestore,
  collectionGroup,
  collection,
  onSnapshot,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import Card from './components/Card';
import SortBar from './components/SortBar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateSub from './components/CreateSub';
import Subreddit from './components/Subreddit';
import Post from './components/Post';
import CreatePost from './components/CreatePost';
import { AuthProvider } from './AuthContext';

function App() {
  const [posts, setPosts] = useState([]);
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [isCreateSub, setIsCreateSub] = useState(false);
  const [currentSub, setCurrentSub] = useState('Home');
  const [subList, setSubList] = useState([]);
  const [postOrder, setPostOrder] = useState('votes');

  useEffect(() => {
    const getPosts = async () => {
      try {
        const db = getFirestore();
        //Get every collection with the 'posts' name.
        const colRef = collectionGroup(db, 'posts');
        const q = query(colRef, orderBy(`${postOrder}`, 'desc'));
        const snapshot = await getDocs(q);
        let data = [];
        snapshot.docs.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getPosts();
  }, [postOrder]);

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

  const showSignUpForm = () => {
    setSignUp(!signUp);
  };

  const showSignInForm = () => {
    setSignIn(!signIn);
  };

  const toggleCreateSub = () => {
    setIsCreateSub(!isCreateSub);
  };

  const setSubName = (name) => {
    setCurrentSub(name !== 'Home' ? `r/${name}` : 'Home');
  };

  const getSubList = (value) => {
    setSubList(value);
  };

  const setOrder = (value) => {
    setPostOrder(value);
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <GlobalStyles />
          <Header
            showSignUpForm={showSignUpForm}
            showSignInForm={showSignInForm}
            toggleCreateSub={toggleCreateSub}
            currentSub={currentSub}
            setSub={setSubName}
            subList={subList}
            setSubList={getSubList}
          />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SortBar setOrder={setOrder} />
                  <Card posts={posts} />
                </>
              }
            />
            <Route
              path="/r/:subreddit"
              element={<Subreddit setSub={setSubName} />}
            />
            <Route
              path="/r/:subreddit/:id"
              element={<Post setSub={setSubName} />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/submit" element={<CreatePost subList={subList} />} />
          </Routes>
          {signUp && <SignUp showSignUpForm={showSignUpForm} />}
          {signIn && <SignIn showSignInForm={showSignInForm} />}
          {isCreateSub && <CreateSub toggleCreateSub={toggleCreateSub} />}
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
