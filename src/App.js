import './App.css';
import { useState, createContext } from 'react';
import Home from './Components/Home';
import { Routes, Route } from 'react-router-dom';
import Professor from './Components/Professor';
import AddProf from './Components/AddProff';
import Mail from './Components/Mail';
import University from './Components/University';
import Check from './Components/Check';
export const AppContext = createContext(null);

function App() {
  const [ profData, setProfData ] = useState([]);
  return (
    <AppContext.Provider value={{profData, setProfData}}>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path="/prof/:name" element={<Professor />} />
          <Route path="/addprof" element={<AddProf />} />
          <Route path='/univ/:name' element={<University />} />
          <Route path='/mail/:name' element={<Mail />} />
          <Route path='/check' element={<Check />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
