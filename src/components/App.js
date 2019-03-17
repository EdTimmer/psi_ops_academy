import React, { Component } from 'react';
import '../App.css';
import Boxes from './Boxes';
import ProgressBar from './ProgressBar';
// import Modal2 from './Modal2';
import ImageModal from './ImageModal';

class App extends Component {
  state = {
    totalCount: 0,
    correctCount: 0,
    message: "Click on a circle that hides a picture",
    box0: "",
    box1: "",
    box2: "",
    box3: "",
    modalOpacity: 0,
    modalOpen: false,
    boxColor: "",
    circleOpacity: 1
  }

  messageFn = () => {
    if (this.state.correctCount < 5) {
      this.setState({ message: "Click on a circle that hides a picture" });
    }
    if (this.state.correctCount >= 5 && this.state.correctCount < 8) {
      this.setState({ message: "Potential observed" });
    }
    if (this.state.correctCount >= 8 && this.state.correctCount < 10) {
      this.setState({ message: "Ability confirmed" });
    }
    if (this.state.correctCount >= 10 && this.state.correctCount < 12) {
      this.setState({ message: "We need to talk" });
    }
    if (this.state.correctCount >= 12 && this.state.correctCount < 25) {
      this.setState({ message: "Report for duty" });
    }
  }

  clearState = () => {
    this.setState({
      totalCount: 0,
      correctCount: 0,
      message: "Click on a circle that hides a picture",
      box0: "",
      box1: "",
      box2: "",
      box3: "",
      modalOpacity: 0,
      modalOpen: false,
      boxColor: "",
      circleOpacity: 1
    })
  }

  press = (num) => {

    if (this.state.totalCount < 24) {

      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      // let randomNumber = Math.floor(Math.random() * 4);
      let randomNumber = getRandomInt(0, 3);
  
      this.updateTotalCount();


      switch (randomNumber) {
        case 0:
          this.setState({ box0: "blink" })
          break;
        case 1:
          this.setState({ box1: "blink" })
          break;
        case 2:
          this.setState({ box2: "blink" })
          break;
        case 3:
          this.setState({ box3: "blink" })
          break;
        default:
          break;
      }
      
      if (this.state.totalCount === 23){
        // this.setState({boxColor: "grey"})
        this.setState({circleOpacity: 0.5})
      }

      if (randomNumber === num) {

        this.handleOpen();
        // this.setState({modalOpacity: 1})
        this.updateCorrectCount();
        this.messageFn();
        // this.setState({modalOpacity: 1})
        const timer = m => new Promise(r => setTimeout(r, m));

        (async () => {
          this.setState({modalOpacity: 0})
          await timer(500)
          .then(() => this.setState({modalOpacity: 1}))

          await timer(1500)
            .then(() => this.setState({modalOpacity: 0}))

          await timer(500)
            .then(() => this.handleClose())
        })();
      }
     
    }

  }

  updateTotalCount = () => {
    this.setState({
      totalCount: this.state.totalCount + 1
    })
  }

  updateCorrectCount = () => {
    this.setState({
      correctCount: this.state.correctCount + 1
    })
  }

  pass = () => {
    let randomNumber = Math.floor(Math.random() * 4);

    switch (randomNumber) {
      case 0:
        this.setState({ box0: "blink" })
        break;
      case 1:
        this.setState({ box1: "blink" })
        break;
      case 2:
        this.setState({ box2: "blink" })
        break;
      case 3:
        this.setState({ box3: "blink" })
        break;
      default:
        break;
    }
  }

  clearBoxes = () => {
    const timer = m => new Promise(r => setTimeout(r, m));
    (async () => {
      await timer(500)
        .then(() => this.setState({
          box0: "",
          box1: "",
          box2: "",
          box3: ""
        }))
    })();
  }

  handleOpen = () => {
    this.setState({ modalOpen: true, modalOpacity: 1 });
  }

  handleClose = () => {
    this.setState({ modalOpen: false });
  }

  sameColor = () => {
    this.setState({ boxColor: "#0074D9" })
  }

  render() {
    const { message, correctCount, totalCount, box0, box1, box2, box3, modalOpen, modalOpacity, boxColor, circleOpacity } = this.state;
    const { clearState, press, clearBoxes, pass, handleOpen, handleClose, sameColor } = this;
    return (
      <div className="App">

        <div className="header">
          <div className="header-title">
            <span>Psi Ops Academy</span>
          </div>

          <div>
            <ProgressBar correctCount={correctCount} totalCount={totalCount} />
          </div>
        </div>

        
        <div className="boxes">
          <Boxes press={press} clearBoxes={clearBoxes} box0={box0} box1={box1} box2={box2} box3={box3} boxColor={boxColor} circleOpacity={circleOpacity} />
        </div>

        <ImageModal modalOpen={modalOpen} handleOpen={handleOpen} handleClose={handleClose} modalOpacity={modalOpacity} />  

        
          <div className="message">
            <span>{message}</span>
          </div>
        


        <div className="buttons-container">

          <button className="regular-button" onClick={clearState}>Reset</button>
          <button className="regular-button" onClick={sameColor} disabled={totalCount === 24}>One Color</button>
          <button className="regular-button" onClick={() => { pass(); clearBoxes() }} disabled={totalCount === 24}>Pass</button>
        </div>

        <div className="footer">
          <div style={{padding: "0.5rem"}}>
            <span>Inspired by Russell Targ's ESP Trainer iOS app.</span>
          </div>
          <div>
            <a href="http://espresearch.com" rel="noopener noreferrer" target="_blank">Would you like to know more?</a>
          </div>
        </div>

      </div>      
    );
  }
}

export default App;
