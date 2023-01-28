import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./components/main/main";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/" element = {<Main/>}/>
      </Routes>
    </div>
  );
}

export default App;
