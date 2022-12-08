import React from 'react';

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

class Boxscore extends React.Component {
    constructor(){
        super()
        this.state = {boxscores: []}
    }
    componentDidMount () {
        this.setState(function(state, props) {
            return {
                boxscores: Object.keys(props.scores).map((b) =>
                    <tr class="box"><td className="teamName">{teams[b]}</td> <td> {(props.scores[b][13] + props.scores[b][12]).toFixed(2)}</td> <td>{(props.scores[b][12]).toFixed(2)}</td> <td>{(props.scores[b][13]).toFixed(2)}</td></tr>
              
                )
            }
        })
    }
    render() {
        return (
            <div style={{height: "100vh"}}>
                <table class="boxscore">
                <tr className="boxheader">
                        <th></th>
                        <th>Score</th>
                        <th>Week 14</th>
                        <th>Week 15</th>
                    </tr>
                       {this.state.boxscores[2]}
                        {this.state.boxscores[0]}
                </table>
                <br />
                <table className="boxscore">
                    <tr className="boxheader">
                        <th></th>
                        <th>Score</th>
                        <th>Week 14</th>
                        <th>Week 15</th>
                    </tr>
                        {this.state.boxscores[1]}
                        {this.state.boxscores[3]}
    
                </table>
            </div>
        )
    }
}

export default Boxscore;