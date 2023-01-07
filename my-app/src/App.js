import logo from './logo.svg';
import './App.css';
import Boxscore from './Boxscore.jsx';
import React from 'react';
import { Link } from "react-router-dom";
import Navbar from './navbar.jsx'
import cat from "./cat.gif"

const champ = [6, 8]
const third = [6, 8]


const teams = {
   1: "Loading ....", 
   2: "Diggs Duck Dip Dive and Diggs",
   3: "Waddle Baby Waddle Baby",
   4: "Whale Sharks",
   6: "Will Lutz n sum BIG BOOTY SLUTZ",
   7: "JOEVID - 19", 
   8: "Wheelchair Helaire",
   9: "You want a Pierce of me??",
   10: "Football is Gay",
   12: "Bend Her Over a Darrell",
   13: "Team Jafarinia",
   14: "Silence of The Lamb",
}

let manual_lineups = {
  6: ["Josh Allen", "Austin Ekeler", "Marquise Brown", "Travis Kelce", "Nick Chubb"],
  8: ["Aaron Rodgers", "Christian McCaffrey", "CeeDee Lamb", "Mark Andrews"]
}

const playoffTeams = [6, 8, 6, 8]

const last_week = {
  8: 0,
  6: 0,
  13: 0,
  14: 0
}



class App extends React.Component {
  constructor () {
    super();
    this.state = {scores: {}}
  }

  getBoxscores = async () => {
    let boxes12 = await this.props.client.getBoxscoreForWeek({scoringPeriodId: 18, matchupPeriodId: 15, seasonId: 2022});
    console.log(boxes12)
    let boxes13 = await this.props.client.getBoxscoreForWeek({scoringPeriodId: 18, matchupPeriodId: 15, seasonId: 2022});
    console.log(boxes13)
    var scores = {};
    for (let i in manual_lineups) {
      console.log("i is ", i)
      let score = 0
      for (let k = 0; k < boxes12.length; k++) {
  
          for (let l = 0; l < boxes12[k].awayRoster.length; l++) {

            console.log(boxes12[k].awayRoster[l].player.fullName)
            if (manual_lineups[i].includes(boxes12[k].awayRoster[l].player.fullName)) {
              score += boxes12[k].awayRoster[l].totalPoints
              console.log("AAYYEE")
              console.log(boxes12[k].awayRoster[l].player.fullName)
            }
          }
          for (let l = 0; l < boxes12[k].homeRoster.length; l++) {

            console.log(boxes12[k].homeRoster[l].player.fullName)
            if (manual_lineups[i].includes(boxes12[k].homeRoster[l].player.fullName)) {
              score += boxes12[k].homeRoster[l].totalPoints
              console.log("AAYYEE")
              console.log(boxes12[k].homeRoster[l].player.fullName)
            }
          }
        }
        scores[i] = {12: score}
      }
    if (boxes13.length != 0) {
      boxes13 = boxes12
      for (let i = 0; i < boxes13.length; i++) {
        if (playoffTeams.includes(boxes13[i].homeTeamId)) {
          scores[boxes13[i].homeTeamId] = {
            ...scores[boxes13[i].homeTeamId],
            13: 0
          }
        }
        if (playoffTeams.includes(boxes13[i].awayTeamId)) {
          scores[boxes13[i].awayTeamId] = {
            ...scores[boxes13[i].awayTeamId],
            13: 0
          }
        }
      }
    }
    else {
      for (const key in playoffTeams) {
        let id = playoffTeams[key]
        scores[id] = {
          ...scores[id],
          13: 0
        }
      }
    }
    this.setState({scores: scores})
    
    
  }

  componentDidMount () {
    this.getBoxscores()
  }

  render () {
    if (Object.keys(this.state.scores).length == 0) {
      return (
        <div className="App">
        <Navbar/> 
        <img src={cat} alt="" style={{width: "100%"}}/>
        </div>
      )
    }
    return (
      <div className="App">
        <Navbar />
          <button onClick={async () => {
            window.location.reload(true);
          }}>Refresh</button>
          <Boxscore scores={this.state.scores}/>
      </div>
    );
  }
}





export default App;
export {teams};
