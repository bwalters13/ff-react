import { Link } from "react-router-dom";
import React from 'react';
import {teams} from '../App.js'
import "../App.css"
import Navbar from "../navbar"
import right from '../righton.png';
import left from '../lefton.png';

const playoffTeams = [4,9,12,14]

const matchups = [
    [4,9], 
    [12, 14]
]

class Expenses extends React.Component {
   render() {
        
        return (
            <div class="App">
                <Navbar/>
                <Lineups client={this.props.client}/>

            </div>
        );
    }
}


class Lineups extends React.Component {
      constructor () {
          super()
          this.state = {lineup1: {}, lineup2: {}, lineup3: {}, lineup4: {}, rosters: {}, isLoading: true, index: 0, xDown: null}
          this.handleClick = this.handleClick.bind(this);
          this.handleTouchMove = this.handleTouchMove.bind(this)
          this.handleTouchStart = this.handleTouchStart.bind(this)
      }

      handleClick() {
        this.setState({index: (this.state.index+1)% matchups.length}) 
        console.log(this.state.index)
      }
      getTouches(evt) {
        return evt.touches ||             // browser API
               evt.originalEvent.touches; // jQuery
      } 

      handleTouchStart(e) {
        const firstTouch = this.getTouches(e)[0]
        this.setState({xDown: firstTouch.clientX})
      }

      handleTouchMove(e) {
          if (!this.state.xDown) {
              return
          }
          var xUp = e.touches[0].clientX;
          var xDiff = this.state.xDown - xUp
          if (Math.abs(xDiff) > 0) {
              this.setState({index: (this.state.index+1)%matchups.length})
          }

          this.setState({xDown: null})
      }

      calcProjected = (playerObj) => {
        var sum = 0;
        if (playerObj.projectedPointBreakdown == 0) {
            return 0;
        }
        for (const [key, value] of Object.entries(playerObj.projectedPointBreakdown)) {
            if (key !== "usesPoints") {
                sum = sum + value;
            }
        }
        return sum.toFixed(2)
      }

      getBoxscores = async () => {
        let boxes12 = await this.props.client.getBoxscoreForWeek({scoringPeriodId: 14, matchupPeriodId: 13, seasonId: 2021});
        let boxes13 = await this.props.client.getBoxscoreForWeek({scoringPeriodId: 14, matchupPeriodId: 13, seasonId: 2021});

        for (let i = 0; i < boxes13.length; i++) {
            if (playoffTeams.includes(boxes13[i].homeTeamId)) {
                let teamId = boxes13[i].homeTeamId
                let rosters = this.state.rosters
                rosters[teamId] = boxes13[i].homeRoster
                this.setState(rosters)
            }
            if (playoffTeams.includes(boxes13[i].awayTeamId)) {
                let teamId = boxes13[i].awayTeamId
                let rosters = this.state.rosters
                rosters[teamId] = boxes13[i].awayRoster
                this.setState(rosters)
            }
        }

        this.setState(function(state, props){
            let teamStarters = {}
            let positions = ["QB", "RB", "RB", "WR", "WR", "TE", "RB/WR/TE", "RB/WR/TE", "D/ST", "K"]
            for (let k = 0; k < playoffTeams.length; k++) {
                let teamId = playoffTeams[k]
                let teamRoster = state.rosters[teamId]
                console.log(teamRoster)
                console.log(teamId)
                teamStarters[teamId] = []
                for (let i = 0; i < positions.length; i++) {
                    let j = 0
                    try {
                        while (teamRoster[j].position != positions[i] & j < teamRoster.length) {
                            j++;
                        }
                        teamStarters[teamId].push(teamRoster[j])
                        console.log(teamRoster[j])
                        teamRoster.splice(j, 1)
                    } catch (error) {
                        var nullObj = {
                            "player": {"fullName": ""},
                            "position": "",
                            "totalPoints": 0,
                            "projectedPointBreakdown": 0

                        }
                        teamStarters[teamId].push(nullObj)
                    }
                    
                }
            }
            return { 
              lineup1: teamStarters[playoffTeams[0]],
              lineup2: teamStarters[playoffTeams[1]],
              lineup3: teamStarters[playoffTeams[2]],
              lineup4: teamStarters[playoffTeams[3]]
            }
        })
        this.setState({isLoading: false})     
      }

      componentDidMount () {
          this.getBoxscores();
          console.log("UPDATED ")
      }

      render () {
          let lineup1, lineup2, img
          if (this.state.isLoading) {
              return <h1>Loading...</h1>
          }
          if (this.state.index == 0) {
              lineup1 = this.state.lineup1
              lineup2 = this.state.lineup2
              img = left
            
          }
          else {
              lineup1 = this.state.lineup3
              lineup2 = this.state.lineup4
              img = right
          }
          let matchup = []
          let fullMatchup = []
          let score1 = 0;
          let score2 = 0
          for (let i = 0; i < lineup1.length; i++) {
              matchup.push(
                  <tr>
                    <td>{lineup1[i].player.fullName}</td>
                    <td>{lineup1[i].totalPoints.toFixed(2)}</td>
                    <td>{lineup2[i].player.fullName}</td>
                    <td>{lineup2[i].totalPoints.toFixed(2)}</td>
                  </tr>
              )
              score1 += lineup1[i].totalPoints
              score2 += lineup2[i].totalPoints
              fullMatchup.push(
                <tr>
                <td>{lineup1[i].player.fullName}</td>
                <td>{lineup1[i].totalPoints.toFixed(2)}</td>
                <td style={{fontSize: 'smaller'}}>Proj: {this.calcProjected(lineup1[i])}</td>
                <td>{lineup2[i].player.fullName}</td>
                <td>{lineup2[i].totalPoints.toFixed(2)}</td>
                <td style={{fontSize: 'smaller'}}>Proj: {this.calcProjected(lineup2[i])}</td>
              </tr>
              )
              
          }
          return (
            
            <div class="tables">
                    <table class="lineup" onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove}>
                        <div class="total">

                            <div class="score">
                                <div class="inner"><b>{teams[matchups[this.state.index][0]]}</b></div>
                                <div class="inner">{score1.toFixed(2)}</div>
                            </div>
                            <div class="score">
                                <div class="inner"><b>{teams[matchups[this.state.index][1]]}</b></div>
                                <div class="inner">{score2.toFixed(2)}</div>
                            </div>
                            
                        </div>
                        <div style={{width: "10%", margin: "auto" }}>
                                <img src={img} alt="" style={{width: "100%", height: "auto", paddingRight: "4vw"}} />
                            </div>
                        <tbody>
                          {matchup}
                        </tbody>
                    </table>
                    <table class="full" onClick={this.handleClick}>
                    <div class="total">

                            <div class="score">
                                <div class="inner"><b>{teams[matchups[this.state.index][0]]}</b></div>
                                <div class="inner">{score1.toFixed(2)}</div>
                            </div>
                            <div class="score">
                                <div class="inner"><b>{teams[matchups[this.state.index][1]]}</b></div>
                                <div class="inner">{score2.toFixed(2)}</div>
                            </div>
                        </div>
                
                        <tbody>
                            {fullMatchup}
                        </tbody>
                    </table>
                    <Navbar
                    onTouchStart={e=> this.touchY = e.nativeEvent.pageY}
                    onTouchEnd={e => {
                        if (this.touchY - e.nativeEvent.pageY > 20)
                        alert("WORKS")
                    }}
                    style={{height: 300, backgroundColor: '#ccc'}}
                    />
            </div>
          )
      }
  }

  export default Expenses;