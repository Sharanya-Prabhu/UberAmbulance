import {BrowserRouter,Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import MyNavbar from './components/MyNavbar';
import Home from './pages/Home';


function App() {
  return (
    <div className="App">
    
      <BrowserRouter>
      <MyNavbar/>
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
