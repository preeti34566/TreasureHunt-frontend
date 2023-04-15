import React from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'
import styled from 'styled-components'

function ErrorPage() {

    const navigate = useNavigate()

    const hoHomeHandler = () => {
        navigate('/')
    }

    const error = useRouteError();
    return (
        <Container>
            <div className='up'>
                <p className="text">Something bad happend :(</p>
                <p className='text-2'>404 Page {error.statusText || error.message}</p>
            </div>
            <div className='down'>
                <div className='goHome' onClick={hoHomeHandler}>
                    <p>Go to Login</p>
                </div>
            </div>

        </Container>
    )
}

export default ErrorPage

const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f7f7f8;

    .up {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: -10rem;

        .text {
            flex: 1;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: end;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
            font-family: poppins;
            font-weight: 600;
            font-size: 80px;
            margin-bottom: 2rem;
        }

        .text-2 {

            height: 5rem;
            margin-top: 2.5rem;
            width: 50rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
            font-family: poppins;
            font-weight: 500;
            font-size: 40px;
        }
    }

    .down {
        margin-top: 2rem;
        display: flex;
        justify-content: center;
        align-items: start;

        .goHome {
            width: 9rem;
            height: 2.5rem;
            border: 1px solid black;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: black;
            color: white;
            border-radius: 5px;
            cursor: pointer;
            transition: opacity 0.15s;
            p {
                margin: 0;
            }

            &:hover {
                opacity: 0.9;
            }

            &:active {
                opacity: 0.8;
            }
        }
    }
`