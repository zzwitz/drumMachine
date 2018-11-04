import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return <DrumBoard />
  }
}

var keyCodeDict = {
  81: 'Q',
  87: 'W',
  69: 'E',
  65: 'A',
  83: 'S',
  68: 'D',
  90: 'Z',
  88: 'X',
  67: 'C'
}

var padProps = [
  {i: 1,
   keyCode: 'Q',
   src: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
   desc: 'HiHat'
  },
    {i: 2,
   keyCode: 'W',
   src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
   desc: 'Kick'
  },
    {i: 3,
   keyCode: 'E',
   src: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
   desc: 'Snare'
  },
    {i: 4,
   keyCode: 'A',
   src: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
   desc: 'Drum'
  },
    {i: 5,
   keyCode: 'S',
   src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
   desc: 'Closed HiHat'
  },
    {i: 6,
   keyCode: 'D',
   src: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
   desc: 'Shaker'
  },
    {i: 7,
   keyCode: 'Z',
   src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
   desc: 'Clap'
  },
    {i: 8,
   keyCode: 'X',
   src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
   desc: 'Slap'
  },
    {i: 9,
   keyCode: 'C',
   src: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
   desc: 'Stick'
  }
]

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
  };

  padBoard = padProps;

  render() {
    var className = 'square';
    if (this.props.pressed === true) {
      var className = 'square pressed'
    }
    return(<div class = {className} onClick = {this.props.onClick}> {this.props.desc} ({this.props.value}) </div>)
  };

    componentDidMount() {
      document.addEventListener('keydown', this.handleKeyPress);
    };
    componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyPress);
    };

    handleKeyPress(e) {
      // alert(e.keyCode)
    if (keyCodeDict[e.keyCode] === this.props.value) {
      this.props.onClick()
      // this.props.onClick()
    }
  }
};


// for some reason I couldn't define this in the class board then reference it within handleclick?
// function playAudio(src) {
//   var audio = new Audio(src);
//   audio.play()
// };


class DrumBoard extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    test: 0,
    display: null,
  }
  this.playAudio = this.playAudio.bind(this)
  this.handleClick = this.handleClick.bind(this)
};
  playAudio(src) {
    var audio = new Audio(src);
    audio.play()
  };

  handleClick(padObj) {
    var audio = new Audio(padObj.src);
    audio.play();
    this.playAudio(padObj.src);
    this.setState({display: 'Played the ' + padObj.desc});
    padObj.pressed = true;
    this.forceUpdate()

    window.setTimeout(() => {
      padObj.pressed = false;
      this.forceUpdate()
    }, 200)
  };

  renderSquare(padObj) {
    var val = padObj.keyCode;
    var desc = padObj.desc;
    var playFunc = 'playAudio(' + padObj.src + ')';
    var src = padObj.src
    var pressed = padObj.pressed
    return(<Square
            pressed = {pressed} value= {val} desc = {desc} src = {src} onClick = {() => this.handleClick(padObj)} />);
  };



  render() {

    if (this.state.display === null) {
      this.setState({display: 'Nothing yet played'})
    }


    return (
      <div>
        <div className="status">  {this.state.display}</div>
        <div className="board-row">
          {this.renderSquare(padProps[0])}
          {this.renderSquare(padProps[1])}
          {this.renderSquare(padProps[2])}
        </div>
        <div className="board-row">
          {this.renderSquare(padProps[3])}
          {this.renderSquare(padProps[4])}
          {this.renderSquare(padProps[5])}
        </div>
        <div className="board-row">
          {this.renderSquare(padProps[6])}
          {this.renderSquare(padProps[7])}
          {this.renderSquare(padProps[8])}
        </div>
      </div>
    );
  }
}



export default App;
