import React from "react";
import MartaTrain from "./MartaTrain"
import MartaLine from "./MartaLine";

const MARTA_URL = 'https://my-little-cors-proxy.herokuapp.com/http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=2c514350-0c26-47dd-b872-7936af81c8e1';

class MartaDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      trainLines: ["green"]
    };
  }

  render() {
    let martaLines = this.state.trainLines.map(line => {
      return (<MartaLine lineName={line} trainArray={this.state.data}/>);
    });

    return (
      <div className="trainCardContainer">

        <div className="titleContainer">
          <h1>Marta Dashboard App</h1>
        </div>

        <button onClick={() =>{this._toggleLine("all")}}>All Lines</button>
        <button onClick={() =>{this._toggleLine("red")}}>Red Line</button>
        <button onClick={() =>{this._toggleLine("blue")}}>Blue Line</button>
        <button onClick={() =>{this._toggleLine("green")}}>Green Line</button>
        <button onClick={() =>{this._toggleLine("gold")}}>Gold Line</button>

        <div className="trainCardContainer">
          {martaLines}
        </div>

      </div>
    );
  }

  componentDidMount() {
    this._getMartaData();
    setInterval(this._getMartaData, 2000);
  }


  _toggleLine = (nameOfLine) => {
    if (nameOfLine === "all") {
      this.setState({
        trainLines: ["green", "blue", "red", "gold"]
      });
    }
    else {
      this.setState({
        trainLines: [nameOfLine]
      });
    }
  }

  _getMartaData = () => {
    console.log('about to fetch!');
    fetch(MARTA_URL, {
      method: 'get'
    }).then((response) => {
        console.log('got the response');
        return response.json();
    })
    .then(this._cleanUpMarta)
    .then((jsonData) => {
        console.log(jsonData);
        console.log('got the data');
        this.setState({
          data: jsonData
        }, () => {
          console.log('yeah. you should see data now');
        });
    }).catch((err) => {
        // Error :(
    });
  }

  _cleanUpMarta = (allTrainArray) => {
    let trainsById = new Map();
    allTrainArray.forEach(train => {
      trainsById.set(train.TRAIN_ID, train);
    });
    let justTheTrains = trainsById.values();
    return Array.from(justTheTrains);
  }

  _convertTrainToElement = (train) => {
    return <MartaTrain train={train}/>
  }

  _sortByEventTime = (unsortedTrainArray) => {

    let arrayToSort = [
      ...unsortedTrainArray
    ];

    arrayToSort.sort((a, b) => {

      let aTime = new Date(a.EVENT_TIME);
      let bTime = new Date(b.EVENT_TIME);


      if (aTime < bTime) {
        return -1;
      }

      else if (aTime < bTime) {
        return 1;
      }

      else {
        return 0;
      }
    });

    return arrayToSort;
  }
}


export default MartaDashboard;