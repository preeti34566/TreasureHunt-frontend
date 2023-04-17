import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'


function Game() {

  const [gameOver, setGameOver] = useState(false)
  const [win, setWin] = useState(false)

  console.log(gameOver)
  console.log(win)

  function checkCollision() {
    const bigSquare = document.querySelector('.land');
    const movingSquare = document.querySelector('.moving-square');
    const smallSquares = document.querySelectorAll('.small-square');

    const bigSquareRect = bigSquare.getBoundingClientRect();
    const movingSquareRect = movingSquare.getBoundingClientRect();

    let winCount = 0;
    let gameOverCount = 0;

    smallSquares.forEach(smallSquare => {
      const smallSquareRect = smallSquare.getBoundingClientRect();

      if (
        movingSquareRect.right >= smallSquareRect.left &&
        movingSquareRect.left <= smallSquareRect.right &&
        movingSquareRect.bottom >= smallSquareRect.top &&
        movingSquareRect.top <= smallSquareRect.bottom
      ) {
        if (smallSquare.classList.contains('win')) {
          winCount++;
        } else {
          gameOverCount++;
        }
      }
    });

    if (winCount === 1) {
      setGameOver(true);
      setWin(true);
    } else if (gameOverCount >= 3) {
      setGameOver(true);
      setWin(false);
    }
  }


  return (
    <Container>
      <div className='up'>

      </div>
      <div className='down'>
        <GameDescription>
          <h2>LEVEL 1 : Cross the cave</h2>
          <h3>Instruction to play the game</h3>
          <h4>There are 4 caves only one will lead you to the key on the other side. You are given a riddle with clue to figure out which cave is safe to cross. User Arrow key to move the player.</h4>
          <p>RIDDLE: "I am a music label, heard around the nation,
            My reach is global, I need no introduction.
            If you look at my name, and the number of my fame,
            You'll find the answer to this little game."
          </p>
          <button><a href='https://www.youtube.com/@tseries' target='_blank'>Clue</a></button>
          <hr />
          
          <p>Game is under development</p>

        </GameDescription>
        <MainGame>
          <div className='land'>
            <div className='small-square'>
              <img src="/images/cave.png" />
              <div className='number'>34</div>
            </div>
            <div className='small-square'>
              <img src="/images/cave.png" />
              <div className='number'>20</div>

            </div>
            <div className='small-square'>
              <img src="/images/cave.png" />
              <div className='number'>11</div>

            </div>
            <div className='small-square'>
              <img src="/images/cave.png" />
              <div className='number'>7</div>

            </div>
            <MovingSquare className={gameOver ? 'moving-square game-over' : 'moving-square'} />
            <div className='bg'>
              <img src="/images/desert.jpg" />
              <div className='number'></div>
            </div>
          </div>

          <div className='keyLand'>
            <div className='key'>
              <img src="/images/key.png" />
            </div>
            <div className='keybg'>
              <img className="keybgImage" src="/images/land-1.jpg" />
            </div>
          </div>
        </MainGame>
      </div>
    </Container>
  )
}

export default Game


function MovingSquare({ className }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const movingSquareRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(event) {

      console.log('testing')
      const { x, y } = position;
      const distance = 10;

      console.log("x", x)
      console.log("y", y)

      switch (event.key) {
        case 'ArrowUp':
          if (y - distance >= 0) {
            setPosition(prevPosition => ({ ...prevPosition, y: prevPosition.y - distance }));
          }
          break;
        case 'ArrowDown':
          if (y + distance + movingSquareRef.current.clientHeight <= window.innerHeight) {
            setPosition(prevPosition => ({ ...prevPosition, y: prevPosition.y + distance }));
          }
          break;
        case 'ArrowLeft':
          if (x - distance >= 0) {
            setPosition(prevPosition => ({ ...prevPosition, x: prevPosition.x - distance }));
          }
          break;
        case 'ArrowRight':
          if (x + distance + movingSquareRef.current.clientWidth <= window.innerWidth) {
            setPosition(prevPosition => ({ ...prevPosition, x: prevPosition.x + distance }));
          }
          break;
        default:
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [position]);

  return <div className={className} style={{
    top: `${position.y}px`,
    left: `${position.x}px`,
    backgroundColor: 'red',
    height: '3rem',
    width: '3rem',
    zIndex: '10',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }} ref={movingSquareRef}>
    player
  </div>;
}

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    .up {
      height: 7rem;
      width: 100%;
    }

    .down {
      flex: 1;
      width: 85%;
      margin-bottom: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      gap: 2rem;
    }

`

const GameDescription = styled.div`
  flex: 1.1;
  height: 100%;
  background-color: lightpink;
  border-radius: 5px;
`

const MainGame = styled.div`
  flex: 2;
  height: 100%;
  /* background-color: lightblue; */
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  
  .land {
    flex:1;
    height: 100%;
    /* border-right: 1px solid black; */
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;
    overflow: hidden;

    /* background-color: #121111; */

    .bg {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -1;
      border-left: 4px solid #1211119a;
      border-top: 4px solid #1211119a;
      border-bottom: 4px solid #1211119a;
      border-bottom-left-radius: 12px;
      border-top-left-radius: 12px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .small-square {
      flex: 1;
      width: 10rem;
      display: flex;
      justify-content: center;
      align-items: center;

      position: relative;

      img {
        width: 80%;
        height: 80%;
      }

      .number {
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 2.5rem;
        height: 2.5rem;
        background-color: #000000c9;
        z-index: 2;
        border-radius: 2.5rem;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .keyLand {
    position: relative;
    width: 22rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 4px solid #1211119a;
    border-top: 4px solid #1211119a;
    border-bottom: 4px solid #1211119a;
    /* border-radius: 12px; */
    border-bottom-right-radius: 12px;
    border-top-right-radius: 12px;

    .key {
      width: 8rem;
      height: 8rem;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .keybg {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -1;
      display: flex;
      justify-content: center;
      align-items: center;

      .keybgImage {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`