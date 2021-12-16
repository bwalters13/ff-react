import logo from './logo.svg';
import './App.css';
import Boxscore from './Boxscore.jsx';
import React from 'react';
import { Link } from "react-router-dom";
import Navbar from './navbar.jsx'
import cat from "./cat.gif"




const teams = {
   1: "Loading ....", 
   2: "Adrian Beaturson",
   3: "Waddle Baby Waddle Baby",
   4: "Whale Sharks",
   6: "Will Lutz n sum BIG BOOTY SLUTZ",
   7: "JOEVID - 19", 
   8: "Wheelchair Helaire",
   9: "Little Red FOURNETTE",
   10: "Football is Gay",
   12: "Bend Her Over a Darrell",
   13: "Team Jafarinia",
   14: "Silence of The Lamb",
}




const playoffTeams = [4,9,12,14]
const last_week = {
  4: 140.7,
  9: 172.32,
  12: 132.6,
  14: 165.62
}


class App extends React.Component {
  constructor () {
    super();
    this.state = {scores: {}}
  }

  getBoxscores = async () => {
    let boxes12 = await this.props.client.getBoxscoreForWeek({scoringPeriodId: 14, matchupPeriodId: 13, seasonId: 2021});
    console.log(boxes12)
    let boxes13 = await this.props.client.getBoxscoreForWeek({scoringPeriodId: 15, matchupPeriodId: 14, seasonId: 2021});
    console.log(boxes13)
    var scores = {};
    for (let i = 0; i < boxes12.length; i++) {
      if (playoffTeams.includes(boxes12[i].homeTeamId)) {
        scores[boxes12[i].homeTeamId] = {12: boxes12[i].homeScore - last_week[boxes12[i].homeTeamId]}
      }
      if (playoffTeams.includes(boxes12[i].awayTeamId)) {
        scores[boxes12[i].awayTeamId] = {12: boxes12[i].awayScore - last_week[boxes12[i].awayTeamId]}
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
