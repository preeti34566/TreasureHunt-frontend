import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'
import Game from './Game';
import Account from './Account';
import LeaderBoard from './LeaderBoard';
import Statistics from './Statistics';
import Admin from './Admin';
import { AuthContext } from '../AuthContext';


function Home() {

  const { setIsAuthenticated, isAuthenticated, playerId, setPlayerId  } = useContext(AuthContext)


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

  useEffect(() => {
    // admin : devactpreeti
    if(playerId === 'devactpreeti') {
      setIsAdminLogin(true)
    } else {
      setIsAdminLogin(false)
    }
  },[playerId])

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
      <HomeContainer>
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
        <div className='bg'>
          <img className = "bg-image" src="/images/bg-2.jpg"/>
        </div>
      </HomeContainer>
    </Container>
  )
}

export default Home


const Container = styled.div`
    height: 100vh;
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
    position: relative;

    .bg {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -3;
      display: flex;
      justify-content: center;
      align-items: center;

      .bg-image {
        width: 100%;
        height: 100%;
        opacity: 0.9;
      }
    }

    .menu {
      z-index: 5;
      width: 15rem;
      overflow: hidden;
      display: flex;
      gap: 1.3rem;
      flex-direction: column;

      .menu-list {
        height: 3rem;
        background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        cursor: pointer;
        text-decoration: none;
        color: #ffffffea;
        transition: color 0.15s;

        p {
          margin: 0;
          font-family: poppins;
          font-weight: 500;
          font-size: 18px;
        }

        &:hover {
          opacity: 0.9;
          color: #31bfb1;
        }

        &:active {
          opacity: 0.8;
        }
      }
    }
`