import Navbar from './Navbar';
import './App.css';
import {Route,Routes} from "react-router-dom";
import Unos from "./Unos";
import UnosCat from "./UnosCat";

import {Categories} from './Categories';
import {Songs} from "./Songs";
import { PulseLoader } from "react-spinners";
import React, { useState, useEffect } from "react";


function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);
  
  return (
  <>
   <div className="App">
      {loading ? (
        <div className="loader">
          <PulseLoader size={30} color={"rgb(13,202,240) "} loading={loading} />
        </div>
      ) : (
        <header>
          <div className="song">
              <img
                className="d-flex justify-content-center m-3"
                src="https://cdn.icon-icons.com/icons2/129/PNG/512/3d_music_folder_20526.png"
                alt="myMusic"
                width={100}
                height={100}
              />
              <p >My Music List</p>
            </div>
  <Navbar/>
  
  <div className='container'>
    <Routes>
      <Route path="/Songs" element={<Songs/>}> </Route>
      <Route path="/Categories" element={<Categories/>}></Route>
      <Route path="/AddSong" element={<Unos/>}> </Route>
      <Route path="/AddCategory" element={<UnosCat/>}> </Route>
    </Routes>
  </div>
  </header>
   )}
   </div>
  </>
 );
}

export default App;