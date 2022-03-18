import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from 'react';
import Signin from './Components/Signin';
import Farmer from './Components/Registration/Farmer';
import Animal from './Components/Registration/Animal';
import SearchFarmer from './Components/Search/SearchFarmer';
import AiDetails from './Components/Registration/AiDetails';
import PDRegistration from './Components/Registration/PDRegistration';
import CalfBornDetails from './Components/Registration/CalfBornDetails';
import BullSemen from './Components/Registration/BullSemen';
import Report from './Components/Report';
import Dashboard from './Components/Dashboard';
import DashboardHome from './Components/DashboardHome';
import { useState } from 'react';
import Logout from './Components/Logout';
import './App.css'
import Summary from './Components/Summary';

function App() {
  const [showAlert, setshowAlert] = useState(false);
  const [alertText, setalertText] = useState("message");
  const [alertHeading, setalertHeading] = useState("title");
  function setAlert(title, msg, autoHideDuration = 8000) {
    setalertHeading(title)
    setalertText(msg);
    setshowAlert(true);
    setTimeout(() => {
      setshowAlert(false)
    }, autoHideDuration);
  }
  useEffect(() => {
    if (document.getElementById('alertBody')) {
      if (showAlert) {
        document.getElementById('alertBody').style.display = 'block';
      }
      else {
        document.getElementById('alertBody').style.display = 'none';
      }
    }
  }, [showAlert]);

  return (
    <>
      <div id="alertBody" className="fixed-top alert my-2 mx-2 alert-warning alert-dismissible fade show" role="alert">
        <strong>{alertHeading}</strong>: {alertText}
        <button type="button" className="btn-close" onClick={() => setshowAlert(false)}></button>
      </div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Signin setshowAlert={setAlert} />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/dashboard" element={<Dashboard setshowAlert={setAlert} />} />
          <Route exact path="/dashboard/home" element={<DashboardHome setshowAlert={setAlert} />} />
          <Route exact path="/report" element={<Report setshowAlert={setAlert} />} />
          <Route exact path="/summary" element={<Summary setshowAlert={setAlert} />} />
          {
            (localStorage.getItem('user_type') === 'technician') ?
              <>
                <Route exact path="/search/farmer" element={<SearchFarmer setshowAlert={setAlert} />} />
                <Route exact path="/register/farmer" element={<Farmer setshowAlert={setAlert} />} />
                <Route exact path="/register/animal" element={<Animal setshowAlert={setAlert} />} />
                <Route exact path="/register/aidetails" element={<AiDetails setshowAlert={setAlert} />} />
                <Route exact path="/register/pd" element={<PDRegistration setshowAlert={setAlert} />} />
                <Route exact path="/register/calfdetails" element={<CalfBornDetails setshowAlert={setAlert} />} />
                <Route exact path="/register/bullsemen" element={<BullSemen setshowAlert={setAlert} />} />
              </>
              :
              ''}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
