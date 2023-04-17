import { useContext, useState } from 'react';
import Swal from 'sweetalert2'
import styled from 'styled-components'
import { useEffect } from 'react';
import sha256 from 'sha256';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";
import { auth, provider } from '../firebase'
import copy from 'copy-to-clipboard';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { nanoid } from 'nanoid'


function Login() {

  const navigate = useNavigate();

  const { setIsAuthenticated, isAuthenticated, playerId, setPlayerId  } = useContext(AuthContext)

  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const googleLoginHandler = async () => {
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          let userData = {
            name: result.user.displayName,
            email: result.user.email,
            imageurl: result.user.photoURL,
            userId: (result.user.email).substring(0, (result.user.email).indexOf('@')),
          }

          registerUser(userData)
          setPlayerId((result.user.email).substring(0, (result.user.email).indexOf('@')))
          setIsAuthenticated(true);


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

  // on login by google register player to database
  const registerUser = async (props) => {
    let pass = nanoid()
    let sha = sha256(pass.substring(0, 5));
    let userData = {
      name: props.name,
      pswrdHash: sha,
      email: props.email,
      imageurl: props.imageurl,
      userId: props.userId,
    }
    try {
      await fetch('http://treasureh0nt.onrender.com/addUser', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => response.json())
        .then((data) => {
          showAlert(pass.substring(0, 5))
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } catch (error) {
      console.log('failed to register user')
    }
  }


  function showAlert(password) {
    Swal.fire({
      title: password,
      text: "Copy password you won't be able to do it later",
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Copy',
    }).then((result) => {
      if (result.isConfirmed) {
        copy(password);
      }
    })
  }



  const userLoginHandler = async (event) => {
    setIsLoading(true);
    event.preventDefault()
    let hash = sha256(password)

    try {
      await fetch('http://treasureh0nt.onrender.com/getUserDetail/' + userID)
        .then(response => {
          if (!response.ok) {
            // Handle HTTP error response
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then(data => {
          // Handle successful response
          if (data.userId == "") {
            toast.error("Player Id not found!", {
              position: toast.POSITION.TOP_CENTER
            });
            setIsLoading(false)
            return
          } else {
            if (hash === data.pswrdHash) {

              toast.success("Logged In", {
                position: toast.POSITION.TOP_CENTER
              });

              setIsAuthenticated(true);
              setIsLoading(false)
            } else {
              toast.error("Wrong Password!", {
                position: toast.POSITION.TOP_CENTER
              });
              setIsLoading(false)
            }
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          setIsLoading(false)
        });
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }


  }

  useEffect(()=>{
      if(isAuthenticated){
        setTimeout(() => {
          navigate('/home')
        }, 2500)
      }
  },[isAuthenticated])

  return (
    <div className>
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
            <p>Made by Preeti Kumari</p>
          </div>
          <div className='bg'>
            <img src="/images/bg-3.jpg"/>
          </div>
        </div>
        <div className='right'>
          <LoginContainer>
            <input className='usrId'
              type='text'
              placeholder='Player ID'
              onChange={(event) => {
                setUserID(event.target.value)
                setPlayerId(event.target.value)
              }}
              required
              autoComplete='on'
            />
            <input className='pswrd'
              type='password'
              id=''
              placeholder='Password'
              onChange={(event) => {
                setPassword(event.target.value)
              }}
              required
            />
            <div className='login-btn' onClick={userLoginHandler}>
              {!isLoading &&
                <p style={{
                  marginTop: '16px'
                }}>Login</p>
              }
              {isLoading &&
                <ClipLoader color="#ffffff" size={16} />
              }
            </div>
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
        {/* <Outlet /> */}
        <ToastContainer
          autoClose={1000}
          hideProgressBar={true}
        />
      </Container>
    </div>
  );
}

export default Login;

const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  
  .left {
    position: relative;

    flex: 1.3;
    height: 100%;
    /* background-color: #000000ec; */
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border-right: 1px solid #00000038;

    .bg {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -1;
      display: flex;
      justify-content: center;
      align-items: center;
      
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

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
          color: black;
        }
    }

    .text-container {
      z-index: 10;
      height: 10rem;
      width: 49rem;
      display: flex;
      justify-content: start;
      overflow: hidden;

      .logo { 
        width: 10rem;
        display: flex;
        justify-content: start;
        align-items: center;

        img {
          width: 8rem;
          margin-top: -1.5rem;
        }
      }

      .game-text {
        flex:2;
        display: flex;
        justify-content: start;
        align-items: center;
        p {
          margin-left: -1rem;
          font-family: poppins;
          font-size: 80px;
          font-weight: 700;
          color: #000000e9;
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
  margin-top: 6.5rem;
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
      color: #31bfb1;
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
