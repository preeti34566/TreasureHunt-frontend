import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'



function Navbar() {

    const navigate = useNavigate();

    const homeHandler = () => {
        navigate('/home')
    }
  return (
    <Container>
        Navbar
        <button onClick={homeHandler}>Home</button>
    </Container>
  )
}

export default Navbar

const Container = styled.div`
    position: fixed;
    width: 100%;
    height: 4.2rem;
    border-bottom: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: lightpink;
`