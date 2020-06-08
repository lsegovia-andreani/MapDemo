import './App.css';
import React from 'react';
import CustomMap from './components/CustomMap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { routeApi } from './apis/routeApi'
// import 'leaflet/dist/leaflet.css';
import {positions} from './dataSources/positions'
import {otherPositions} from './dataSources/otherPositions'

function App() {
  return (
    <div className="App">
      <CustomMap  positions={positions.map((x)=> [x.Latitude, x.Longitude])} otherPositions={otherPositions.map((x)=> [x.Latitude, x.Longitude])} />
    </div>
  );
}

export default App;
