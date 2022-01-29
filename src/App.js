import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from './Components/Signin';
import Farmer from './Components/Registration/Farmer';
import Animal from './Components/Registration/Animal';
import SearchFarmer from './Components/Search/SearchFarmer';
import AiDetails from './Components/Registration/AiDetails';
import PDRegistration from './Components/Registration/PDRegistration';
import CalfBornDetails from './Components/Registration/CalfBornDetails';
import BullSemen from './Components/Registration/BullSemen';

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Signin />} />
            <Route exact path="/search/farmer" element={<SearchFarmer />} />
            <Route exact path="/register/farmer" element={<Farmer />} />
            <Route exact path="/register/animal" element={<Animal />} />
            <Route exact path="/register/aidetails" element={<AiDetails />} />
            <Route exact path="/register/pd" element={<PDRegistration />} />
            <Route exact path="/register/calfdetails" element={<CalfBornDetails />} />
            <Route exact path="/register/bullsemen" element={<BullSemen />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
