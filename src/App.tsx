import './App.scss';
import React from 'react';
import { Sidemenu } from './components/sidemenu/Sidemenu';
import { Dashboard } from './pages/Dashboard';
import  {SearchBar} from './components/searchbar/SearchBar';
import './App.scss'

function App() {
  return (
    <div className="App">
      <div className="sidemenu">
      <Sidemenu></Sidemenu>

      </div>
     <div className="searchbar">
     <SearchBar></SearchBar>
     </div>
     <div className="dashboard">
     <Dashboard></Dashboard>

     </div>
    </div>
  );
}

export default App;
