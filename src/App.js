// import logo from './logo.svg';
import './App.css';
import Todos from './Pages/Todos/Todos';
import Provider from './Provider/Provider';

function App() {
  return (
    <Provider>
    <Todos/>
    </Provider>
  );
}

export default App;
