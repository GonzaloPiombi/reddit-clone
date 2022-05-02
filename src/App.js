import GlobalStyles from './components/styles/Global';
import Header from './components/Header';
import {
  getFirestore,
  collectionGroup,
  getDocs,
  getDoc,
  doc,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import Card from './components/Card';
import SortBar from './components/SortBar';

function App() {
  const [posts, setPosts] = useState([]);

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

  return (
    <div className="App">
      <GlobalStyles />
      <Header />
      <SortBar />
      <Card posts={posts} />
    </div>
  );
}

export default App;
