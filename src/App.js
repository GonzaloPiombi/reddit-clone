import GlobalStyles from './components/styles/Global';
import Header from './components/Header';
import {
  getFirestore,
  collectionGroup,
  collection,
  onSnapshot,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import Card from './components/Card';
import SortBar from './components/SortBar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import CreateSub from './components/CreateSub';
import Subreddit from './components/Subreddit';
import Post from './components/Post';
import CreatePost from './components/CreatePost';
import { AuthProvider } from './AuthContext';
import { CardContainer } from './components/styles/Card.styled';

function App() {
  const [posts, setPosts] = useState([]);
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [isCreateSub, setIsCreateSub] = useState(false);
  const [currentSub, setCurrentSub] = useState('Home');
  const [subList, setSubList] = useState([]);
  const [postOrder, setPostOrder] = useState('votes');
  const [latestDoc, setLatesDoc] = useState(null);
  const [isLoading, toggleLoading] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
        toggleLoading(true);
        const db = getFirestore();
        //Get every collection with the 'posts' name.
        const colRef = collectionGroup(db, 'posts');
        const q = query(colRef, orderBy(`${postOrder}`, 'desc'), limit(10));
        const snapshot = await getDocs(q);
        let data = [];
        snapshot.docs.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        console.log(data);
        setLatesDoc(() => snapshot.docs[snapshot.docs.length - 1]);
        setPosts(data);
        toggleLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    getPosts();
  }, [postOrder]);

  const loadOnScroll = async () => {
    try {
      if (latestDoc === undefined) return;
      toggleLoading(true);
      const db = getFirestore();
      const colRef = collectionGroup(db, 'posts');
      const q = query(
        colRef,
        orderBy(`${postOrder}`, 'desc'),
        startAfter(latestDoc),
        limit(10)
      );
      const snapshot = await getDocs(q);
      let data = [];
      snapshot.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      console.log(data);
      setLatesDoc(() => snapshot.docs[snapshot.docs.length - 1]);
      setPosts((prevPosts) => [...prevPosts].concat(data));
      toggleLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const scroll = (e) => {
    if (e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight) {
      loadOnScroll();
    }
  };

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
                <CardContainer onScroll={(e) => scroll(e)}>
                  <SortBar setOrder={setOrder} />
                  <Card posts={posts} />
                  {isLoading ? (
                    <h2 style={{ textAlign: 'center' }}>Loading...</h2>
                  ) : null}
                </CardContainer>
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
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/submit"
              element={
                <ProtectedRoute>
                  <CreatePost subList={subList} />
                </ProtectedRoute>
              }
            />
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
