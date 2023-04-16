import { useContext, useState } from 'react';
import Swal from 'sweetalert2'
import styled from 'styled-components'
import { useEffect } from 'react';
import sha256 from 'sha256';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, provider } from '../firebase'
import copy from 'copy-to-clipboard';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { nanoid } from 'nanoid'


function Login() {


  //   const userId = '123456'; // replace with actual user ID

  // fetch('/users/' + userId)
  //   .then(response => {
  //     if (!response.ok) {
  //       // Handle HTTP error response
  //       throw new Error(response.statusText);
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     // Handle successful response
  //     console.log(data);
  //     // TODO: display user data on page
  //   })
  //   .catch(error => {
  //     // Handle network or other error
  //     console.error('Error fetching user data:', error);
  //     // TODO: display error message to user
  //   });

  // try your backend


  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext(AuthContext)

  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHash, setPasswordHash] = useState("")
 


  useEffect(() => {
    setPasswordHash(sha256(password))
  }, [password])

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

          setIsAuthenticated(true);

          registerUser(userData)

          toast.success("Logged In", {
            position: toast.POSITION.TOP_CENTER
          });

          setTimeout(() => {
            navigate('/home')
          }, 2500)
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

  // on login by google register user to database
  const registerUser = async (props) => {

    let pass = nanoid()

    // console.log('password is : ', pass.substring(0, 5))

    let sha = sha256(pass.substring(0, 5));


    let userData = {
      name: props.name,
      pswrdHash: sha,
      email: props.email,
      imageurl: props.imageurl,
      userId: props.userId,
    }


    try {
      await fetch('http://localhost:8080/addUser', {
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

 

  const userLoginHandler = () => {
    // take userId and password hash it 
    //anubhav11697@gmail.com
  }

  const navigateToHome = () => {

  }


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
        </div>
        <div className='right'>
          <LoginContainer>
            <input className='usrId'
              type='text'
              placeholder='User ID'
              onChange={(event) => {
                setUserID(event.target.value)
              }}
              required
            />
            <input className='pswrd'
              type='password'
              placeholder='Password'
              onChange={(event) => {
                setPassword(event.target.value)
              }}
              required
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
