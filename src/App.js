import logo from './logo.svg';
import './App.css';
import Second from './compontents/second'
import Home from './view/home/index'
import Game from './view/game';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Second name="Kevin"></Second> */}
       
      </header>
      <Home></Home>
      <Game></Game>
    </div>
  );
}

export default App;
