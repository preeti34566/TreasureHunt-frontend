import React from 'react'
import styled from 'styled-components'

function Login() {
  return (
    <Container>
        <div className='left'>
            left
        </div>
        <div className='right'>
            right
        </div>
    </Container>
  )
}

export default Login

const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: lightblue;

    .left {
        height: 100%;
        flex: 1;
        background-color: orange;
    }
`