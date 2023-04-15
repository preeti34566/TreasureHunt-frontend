import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Navbar() {

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

    return (
        <Container>
            <div className='left'>
                <div className='image-div'>
                    <img src="https://lh3.googleusercontent.com/a/AGNmyxak-YKjWnm_ECv_KrKujTdkNhcjNkgGL9-ZTbNOHg=s96-c" />
                </div>
                <div className='detail-div'>
                    <div className='usrId'>
                        <p>anubhav11697</p>
                    </div>
                    <div className='name'>
                        <p>Anubhav Kumar</p>
                    </div>
                </div>
            </div>
            <div className='center'>
                {/* center */}
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
        /* flex: 1; */
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
        /* background-color: lightpink; */
        height: 100%;
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
            background-color: #fffffff3;
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