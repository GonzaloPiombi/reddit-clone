import { useState } from 'react';
import { Button } from './styles/Button.styled';
import Modal from './styles/Modal';
import { StyledSignInUp } from './styles/SignInUp.styled';
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { getFirestore, collection, getDocs, addDoc } from '@firebase/firestore';

const SignUp = (props) => {
  const [isSignedUp, setIsSignedUp] = useState(false);

  const signUp = async (e) => {
    try {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      const userCred = await createUserWithEmailAndPassword(
        props.auth,
        email,
        password
      );
      e.target.reset();

      //Use anonymouse as a placeholder and display it if user does not select a username after.
      await updateProfile(userCred.user, {
        displayName: 'anonymous',
      });
      setIsSignedUp(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const changeUsername = async (e) => {
    try {
      e.preventDefault();
      const username = e.target.username.value;

      //Get the db and the users collection.
      const db = getFirestore();
      const colRef = collection(db, 'users');
      const documents = await getDocs(colRef);

      //Go through all the usernames and return if one is repeated.
      const repeatedUsername = documents.docs.find((doc) => {
        return doc.data().username === username;
      });

      if (repeatedUsername) {
        console.log('Repeated');
        e.target.firstChild.textContent = 'USERNAME IS TAKEN';
        e.target.username.classList.add('error');
      } else {
        //Add the user to the db.
        e.target.firstChild.textContent = '';
        e.target.username.classList.add('valid');
        addDoc(colRef, {
          username: username,
        });
        const user = props.auth.currentUser;
        await updateProfile(user, {
          displayName: username,
        });
        props.signIn();
        props.showSignUpForm();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Modal>
      <StyledSignInUp>
        <div>
          <img src="./images/signform.png" alt="Sign-in/up form art" />
        </div>
        <div>
          <h3>Sign up</h3>
          {!isSignedUp && (
            <form onSubmit={signUp}>
              <label htmlFor="email">EMAIL</label>
              <input required type="email" id="email" name="email" />
              <label htmlFor="password">PASSWORD</label>
              <input required type="password" id="password" name="password" />
              <Button type="submit">Sign Up</Button>
            </form>
          )}
          {isSignedUp && (
            <form onSubmit={changeUsername}>
              <label htmlFor="username">CHOOSE A USERNAME</label>
              <input required type="text" id="username" name="username" />
              <Button type="submit">Sign Up</Button>
            </form>
          )}
        </div>
        <div>
          {!isSignedUp && (
            <button onClick={props.showSignUpForm} className="close-button">
              <i className="las la-times"></i>
            </button>
          )}
        </div>
      </StyledSignInUp>
    </Modal>
  );
};

export default SignUp;
