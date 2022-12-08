import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Client } from 'espn-fantasy-football-api';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Router, hashHistory as history } from 'react-router';
import routes from './routes';
import Scores from "./routes/scores";

const myClient = new Client({ leagueId: 1194235 });
myClient.setCookies({ 
  espnS2: 'AECVFCgRUHaRjBzQ2Qi%2BNZi8LROvfzxhsilRma%2FT9XxyP%2BW1ejKJzlt5OqxfBhM6UuXXY9QGUomuZzLIGT3PNXK%2FSTq5RPl2pk27wRErOL7noxJsSIJMqOGZyb09C9ztwYKZkH6M0JoPsIHORZLPB2G%2F4K3kXIa947AIDWmWRsGQWTs9S69NKW71VMB3dpwoSEbfxYlSYOkNZlwXw1aJrvqiEmdHIPbqDf4G8G9MZB9w3EzTa5HPthk6ylP549FXuRfXkB0ABq5IeQQff9zmL8w4', 
  SWID: '{C0029F35-8FC0-4E99-B1F3-74350A1A393F}' 
});

ReactDOM.render(
  <BrowserRouter>  
    <Routes>
      <Route path="/" element={<App client={myClient}/>} />
      <Route path="/scores" element={<Scores client={myClient}/>} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
