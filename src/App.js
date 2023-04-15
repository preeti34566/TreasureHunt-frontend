import './App.css';
import { Outlet } from 'react-router-dom';



function App() {

 
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;

// const Container = styled.div`
//   width: 100%;
//   height: 100vh;
//   background-color: lightgreen;

//   display: flex;
// `
