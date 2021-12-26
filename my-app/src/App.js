import logo from './logo.svg';
import './App.css';
import Boxscore from './Boxscore.jsx';
import React from 'react';
import { Link } from "react-router-dom";
import Navbar from './navbar.jsx'
import cat from "./cat.gif"

const champ = [9, 14]
const third = [4, 12]


const teams = {
   1: "Loading ....", 
   2: "Adrian Beaturson",
   3: "Waddle Baby Waddle Baby",
   4: "Whale Sharks",
   6: "Will Lutz n sum BIG BOOTY SLUTZ",
   7: "JOEVID - 19", 
   8: "Wheelchair Helaire",
   9: "Elliott Page bulC snarT",
   10: "Football is Gay",
   12: "Bend Her Over a Darrell",
   13: "Team Jafarinia",
   14: "Silence of The Lamb",
}

const manual_lineups = {
  4: ["Jalen Hurts", "Devonta Freeman", "Josh Jacobs", "Deebo Samuel", "Michael Gallup", "Jared Cook", "Emmanuel Sanders", "Jamison Crowder", "Seahawks D/ST", "Tyler Bass"],
  12: ["Josh Allen", "Alvin Kamara", "Justin Jackson", "Justin Jefferson", "Amari Cooper", "George Kittle", "Van Jefferson", "Christian Kirk", "Dolphins D/ST", "Randy Bullock"]
}

const playoffTeams = [4,9,12,14]
const last_week = {
  4: 109.34,
  9: 125.68,
  12: 114.1,
  14: 138.14
}


class App extends React.Component {
  constructor () {
    super();
    this.state = {scores: {}}
  }

  getBoxscores = async () => {
    let boxes12 = await this.props.client.getBoxscoreForWeek({scoringPeriodId: 16, matchupPeriodId: 14, seasonId: 2021});
    console.log(boxes12)
    let boxes13 = await this.props.client.getBoxscoreForWeek({scoringPeriodId: 16, matchupPeriodId: 16, seasonId: 2021});
    console.log(boxes13)
    var scores = {};
    for (let i = 0; i < boxes12.length; i++) {
      console.log(third.includes(boxes12[i].homeTeamId))
      console.log(playoffTeams.includes(boxes12[i].homeTeamId))
      if (playoffTeams.includes(boxes12[i].homeTeamId) && champ.includes(boxes12[i].homeTeamId)) {
        console.log(boxes12[i].homeRoster)
        scores[boxes12[i].homeTeamId] = {12: boxes12[i].homeScore - last_week[boxes12[i].homeTeamId]}
      }
      if (playoffTeams.includes(boxes12[i].homeTeamId) && third.includes(boxes12[i].homeTeamId)) {
        console.log("IM IN")
        let teamId = boxes12[i].homeTeamId
        let score = 0
        for (let k = 0; k < boxes12[i].homeRoster.length; k++) {
          console.log(boxes12[i].homeRoster[k].player.fullName)
          if (manual_lineups[teamId].includes(boxes12[i].homeRoster[k].player.fullName)) {
            score += boxes12[i].homeRoster[k].totalPoints
            console.log("AAYYEE")
            console.log(boxes12[i].homeRoster[k].player.fullName)
          }
        }
        scores[boxes12[i].homeTeamId] = {12: score}


      }
      if (playoffTeams.includes(boxes12[i].awayTeamId) & champ.includes(boxes12[i].awayTeamId)) {
        scores[boxes12[i].awayTeamId] = {12: boxes12[i].awayScore - last_week[boxes12[i].awayTeamId]}
      }
      if (playoffTeams.includes(boxes12[i].awayTeamId) & third.includes(boxes12[i].awayTeamId)) {
        let teamId = boxes12[i].awayTeamId
        let score = 0
        for (let k = 0; k < boxes12[i].awayRoster.length; k++) {
          console.log(boxes12[i].awayRoster[k].player.fullName)
          if (manual_lineups[teamId].includes(boxes12[i].awayRoster[k].player.fullName)) {
            score += boxes12[i].awayRoster[k].totalPoints
            console.log("AAYYEE")
            console.log(boxes12[i].awayRoster[k].player.fullName)
          }
        }
        scores[boxes12[i].awayTeamId] = {12: score}
      }
    }
    if (boxes13.length != 0) {
      for (let i = 0; i < boxes13.length; i++) {
        if (playoffTeams.includes(boxes13[i].homeTeamId)) {
          scores[boxes13[i].homeTeamId] = {
            ...scores[boxes13[i].homeTeamId],
            13: boxes13[i].homeScore
          }
        }
        if (playoffTeams.includes(boxes13[i].awayTeamId)) {
          scores[boxes13[i].awayTeamId] = {
            ...scores[boxes13[i].awayTeamId],
            13: boxes13[i].awayScore
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
