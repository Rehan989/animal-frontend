import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from './Components/Signin';
import Farmer from './Components/Registration/Farmer';

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Signin />} />
            <Route exact path="/register/farmer" element={<Farmer />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
