import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'
import Game from './Game';
import Account from './Account';
import LeaderBoard from './LeaderBoard';
import Statistics from './Statistics';
import Admin from './Admin';


function Home() {

  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(true);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isAccountActive, setIsAccountActive] = useState(false);
  const [isStatisticsActive, setIsStatisticsActive] = useState(false);
  const [isLeaderBoardActive, setIsLeaderBoardActive] = useState(false);
  const [isAdminActive, setIsAdminActive] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/home') {
      setShowMenu(true);
      navigate('/home')
    }
  }, [location.pathname])

  const handleStartGame = () => {
    setShowMenu(false);
    setIsGameActive(true);
    setIsAccountActive(false);
    setIsAdminActive(false);
    setIsLeaderBoardActive(false);
    setIsStatisticsActive(false);
    navigate('/home/game');
  }

  const handleStatistics = () => {
    setShowMenu(false);
    setIsGameActive(false);
    setIsAccountActive(false);
    setIsAdminActive(false);
    setIsLeaderBoardActive(false);
    setIsStatisticsActive(true);
    navigate('/home/statistics');
  }

  const handleLeaderBoard = () => {
    setShowMenu(false);
    setIsGameActive(false);
    setIsAccountActive(false);
    setIsAdminActive(false);
    setIsLeaderBoardActive(true);
    setIsStatisticsActive(false);
    navigate('/home/leaderboard');
  }

  const handleAccount = () => {
    setShowMenu(false);
    setIsGameActive(false);
    setIsAccountActive(true);
    setIsAdminActive(false);
    setIsLeaderBoardActive(false);
    setIsStatisticsActive(false);
    navigate('/home/account');
  }

  const handleAdmin = () => {
    setShowMenu(false);
    setIsGameActive(false);
    setIsAccountActive(false);
    setIsAdminActive(true);
    setIsLeaderBoardActive(false);
    setIsStatisticsActive(false);
    navigate('/home/admin');
  }

  return (
    <Container>
      {/* <Navbar /> */}
      <HomeContainer>
        {/* <div className='menu'>
                <Link to="/home/game" className='menu-list'>
                  <p>Start Game</p>
                </Link>
                <Link to="/home/statistics" className='menu-list'>
                  <p>Statistics</p>
                </Link>
                <Link to="/home/leaderboard" className='menu-list'>
                  <p>Leader Board</p>
                </Link>
                <Link to="/home/account" className='menu-list'>
                  <p>Account</p>
                </Link>
                { isAdminLogin &&
                    <Link to="/home/admin" className='menu-list'>
                    <p>Admin</p>
                  </Link>
                }
            </div> */}
        {showMenu && (
          <div className='menu'>
            <div className='menu-list' onClick={handleStartGame}>
              <p>Start Game</p>
            </div>
            <div className='menu-list' onClick={handleStatistics}>
              <p>Statistics</p>
            </div>
            <div className='menu-list' onClick={handleLeaderBoard}>
              <p>Leader Board</p>
            </div>
            <div className='menu-list' onClick={handleAccount}>
              <p>Account</p>
            </div>
            {isAdminLogin &&
              <div className='menu-list' onClick={handleAdmin}>
                <p>Admin</p>
              </div>
            }
          </div>
        )}
        {!showMenu && isGameActive && (
           <Game />
        )}
        {!showMenu && isAccountActive && (
           <Account />
        )}
        {!showMenu && isLeaderBoardActive && (
           <LeaderBoard />
        )}
        {!showMenu && isStatisticsActive && (
           <Statistics />
        )}
        {!showMenu && isAdminActive && (
           <Admin />
        )}
      </HomeContainer>
    </Container>
  )
}

export default Home




const Container = styled.div`
    /* margin-top: 4.2rem; */
    height: 100vh;
    background-color: lightblue;
    display: flex;
    flex-direction: column;
    padding-top: 4.2rem;
`

const HomeContainer = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .menu {
      width: 15rem;
      overflow: hidden;
      display: flex;
      gap: 1.3rem;
      flex-direction: column;

      .menu-list {
        height: 3rem;
        border: 1px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        cursor: pointer;
        text-decoration: none;

        p {
          margin: 0;
          font-family: poppins;
          font-weight: 500;
          font-size: 18px;
          color: black;
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