import { useState } from 'react';
import './App.css';
import styled from 'styled-components'
import { useEffect } from 'react';
import sha256 from 'sha256';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, provider } from './firebase'
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'

function App() {

  console.log(auth)

  const [userId, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHash, setPasswordHash] = useState("")
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [profileImage, setProfileImage] = useState("")


  useEffect(() => {
    setPasswordHash(sha256(password))
  }, [password])

  const googleLoginHandler = () => {
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result.user)
          setUserName(result.user.displayName)
          setUserEmail(result.user.email)
          setProfileImage(result.user.photoURL)
          // alert('Logged In  Successfully')
          toast.success("Logged In", {
            position: toast.POSITION.TOP_CENTER
          });
        })
        .catch((err) => {
          console.log(err);
        })
    } catch (error) {
      console.log(error)
      toast.error("Login failed!", {
        position: toast.POSITION.TOP_CENTER
      });
    }
    
  }


  const userLoginHandler = () => {

  }

  // console.log("test", userId)
  // console.log("pass test", password)
  // console.log("pass test", passwordHash)

  console.log("name : ", userName)
  console.log("email : ", userEmail)

  return (
    <div className="App">
      <Container>
        <div className='left'>
          <div className='text-container'>
            <div className='logo'>
              <img src='images/app-logo.png' />
            </div>
            <div className='game-text'>
              <p>Treasure Hunt</p>
            </div>
          </div>
          <div className='made'>
            <p>Made by</p>
          </div>
        </div>
        <div className='right'>
          <LoginContainer>
            <input className='usrId'
              type='text'
              placeholder='User ID'
              onChange={(event) => {
                setUserID(event.target.value)
              }}
            />
            <input className='pswrd'
              type='password'
              placeholder='Password'
              onChange={(event) => {
                setPassword(event.target.value)
              }}
            />
            <div className='login-btn' onClick={userLoginHandler}>Login</div>
            <div className='line'></div>
            <div className='google-login' onClick={googleLoginHandler}>
              <div className='text'>
                <p>Continue with google</p>
              </div>
              <div className='google-logo'>
                <img src="/images/google.png" />
              </div>
            </div>
          </LoginContainer>
        </div>
        <ToastContainer 
          autoClose={1000}
          hideProgressBar={true}
        />
      </Container>
    </div>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: lightgreen;

  display: flex;
  
  .left {
    position: relative;

    flex: 1.3;
    height: 100%;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;

    .made {
        bottom: 2.5rem;
        position: absolute;
        height: 1.5rem;
        width: 15rem;
        display: flex;
        justify-content:center;
        align-items: center;

        p {
          margin: 0;
        }
    }

    .text-container {
      /* border: 1px solid white; */
      margin-top: -15rem;
      height: 10rem;
      width: 43rem;
      display: flex;
      justify-content: start;
      overflow: hidden;

     

      .logo { 
        width: 10rem;
        display: flex;
        justify-content: start;
        align-items: center;
        /* background-color: lightblue; */
        img {
          width: 7rem;
        }
      }

      .game-text {
        /* background-color: lightpink; */
        flex:2;
        display: flex;
        justify-content: start;
        align-items: center;
        /* background-color: lightblue; */
        p {
          margin-top: 25px;
          margin-left: -1rem;
          font-family: poppins;
          font-size: 70px;
          font-weight: 700;
          color: #ffffffd9;
        }
      }
      /* p {
        font-family: poppins;
        font-weight: 600;
        font-size:70px;
      } */

      

     
    }
  }

  .right {
    flex:1;
    height: 100%;
    background-color: #f7f7f8;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const LoginContainer = styled.div`
  /* border: 1px solid gray; */
  height: 30rem;
  width: 23rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;

  .usrId,
  .pswrd {
    height: 2.5rem;
    width: 99%;
    padding-left: 10px;
    border-radius: 3px;
    border: 1px solid gray;
    margin-bottom: 1.8rem;
  }

  .login-btn {
    /* border: 1px solid gray; */
    height: 2.5rem;
    width: 99%;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: black;
    cursor: pointer;
    transition: opacity 0.15s;

    &:hover {
      opacity: 0.9;
    }

    &:active {
      opacity: 0.8;
    }
  }

  .line {
    margin-top: 1.5rem;
    width: 99%;
    height: 1px;
    background-color: lightgray;
    margin-bottom: 1.5rem;
  }

  .google-login {
    height: 2.5rem;
    width: 99%;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    border: 1px solid lightgray;
    cursor: pointer;
    transition: background-color 0.2s, opacity 0.15s;

    &:hover {
      background-color: lightgray;
    }

    &:active {
      opacity: 0.9;
    }

    .text {
      width: 12rem;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
       p {
        margin: 0;
      }
    }

    overflow: hidden;

    .google-logo {
      height: 100%;
      width: 2rem;
      display: flex;
      justify-content: start;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
`
