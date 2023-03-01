import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Manage from "./components/manage/manage";
import Imageselect from "./components/imageselect/imageselect";
import './App.css';
import {RecoilRoot} from "recoil";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
          <Routes>
            <Route path = "/" element = {<Imageselect/>}/>
            <Route path = "/manage" element = {<Manage/>}/>
          </Routes>
      </RecoilRoot>
    </div>
  );
}

export default App;
