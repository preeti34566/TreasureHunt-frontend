import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../AuthContext';


function Navbar() {

    const { setIsAuthenticated, isAuthenticated, playerId, setPlayerId  } = useContext(AuthContext)

    const [playerName, setPlayerName] = useState("")
    const [playerImage, setPlayerImage] = useState("")

    console.log('pid : ',playerId)

    const navigate = useNavigate();

    const homeHandler = () => {
        navigate('/home')
    }

    const logoutHandler = () => {
        try {
            signOut(auth)
                .then(() => {
                    toast.success("Logged  Out", {
                        position: toast.POSITION.TOP_CENTER
                    });
                    setIsAuthenticated(false)
                    setPlayerId("")
                    setTimeout(() => {
                        navigate('/')
                    }, 2500)
                })
                .catch((err) => {
                    console.log(err);
                })
        } catch (error) {
            console.log("failed to logout")
        }
    }

    const fetchPlayerDetail = async () => {
        try {
            await fetch('http://treasureh0nt.onrender.com/getUserDetail/' + playerId)
              .then(response => {
                if (!response.ok) {
                  // Handle HTTP error response
                  throw new Error(response.statusText);
                }
                return response.json();
              })
              .then(data => {
                // Handle successful response
                console.log(data)
                setPlayerName(data.name)
                setPlayerImage(data.imageUrl)
                
              })
              .catch(error => {
                console.error('Error fetching user data:', error);
               
              });
          } catch (error) {
            console.log(error)
          }
    }

    useEffect(() => {
        fetchPlayerDetail()
    },[playerId])


    console.log('name is : ', playerName)

    return (
        <Container>
            <div className='left'>
                <div className='image-div'>
                    <img src={playerImage} />
                </div>
                <div className='detail-div'>
                    <div className='usrId'>
                        <p style={{
                            color: '#31bfb1'
                        }}>{playerId}</p>
                    </div>
                    <div className='name'>
                        <p>{playerName}</p>
                    </div>
                </div>
            </div>
            <div className='center'>
                <div className='home-btn' onClick={homeHandler}>
                    <img src="/images/home.png" />
                </div>
            </div>
            <div className='right'>
                <div className='logout-btn' onClick={logoutHandler}>Logout</div>
            </div>
            <ToastContainer
                autoClose={1000}
                hideProgressBar={true}
            />
        </Container>
    )
}

export default Navbar

const Container = styled.div`
    position: fixed;
    width: 100%;
    height: 4.3rem;
    border-bottom: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    color: #ffffffe6;

    .left {
        width: 20rem;
        margin-left: 2rem;
      
        height: 100%;
        display: flex;
        align-items: center;
        overflow: hidden;

        .image-div {
            width: 3.3rem;
            height: 100%;
            display: flex;
            justify-content: start;
            align-items: center;
            overflow: hidden;

            img {
                width: 3rem;
                height: 3rem;
                border-radius: 3rem;
            }
        }

        .detail-div {
            flex: 1;
            height: 80%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            

            .usrId {
                flex: 1;
                margin: 0;
                display: flex;
                justify-content: start;
                align-items: center;
           

                p {
                    margin: 0;
                    margin-left: 1rem;
                    font-size: 15px;
                }
            }

            .name {
                flex: 2;
                display: flex;
                justify-content: start;
                align-items: center;
             
                margin: 0;
                
                p {
                    margin: 0;
                    margin-left: 1rem;
                    font-size: 18px;
                }
            }
        }

    }

    .center {
        flex: 4;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .home-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            img {
                width: 1.7rem;
                height: 1.7rem;
            }
        }
    }

    .right {
        flex:1;
        margin-right: 2rem;
        /* background-color: orange; */
        height: 100%;
        display: flex;
        justify-content: end;
        align-items: center;

        .logout-btn {
            width: 6rem;
            height: 2.2rem;
            /* background-color: #fffffff3; */
            background-color: #31bfb1;
            color: black;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 4px;
            cursor: pointer;
            transition: opacity 0.15s;

            &:hover {
                opacity: 0.9;
            }

            &:active {
                opacity: 0.8;
            }
        }
    }
`