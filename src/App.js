import React, { useState, useEffect } from 'react';
import './App.scss';

const App = () => {

  const [ state, setState ] = useState({
    size: "",
    speed: "",
    time: 0,
    hours: "",
    mins: "",
    seconds: "",
  })

  useEffect(() => {
    calculateTime(state.speed, state.size)
  }, [state.size, state.speed])

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }
  // size: 10gb
  // speed: 10 mbps
  let time = 0;
  const calculateTime = (speed, size) => {
    if (!state.size || !state.speed || state.size <= 0 || state.speed <= 0) {
      setState({
        ...state,
        time: 0,
        hours: "",
        mins: "",
        seconds: "",
      })
      return
    }
    speed = speed / 8
    size = size * 1000
    time = size / speed
    let hours = Math.floor(time / 60 / 60);
    let minutes = Math.floor(time / 60) - (hours * 60);
    let seconds = Math.floor(time % 60);
    setState({
      ...state,
      hours: hours,
      mins: minutes,
      seconds: seconds,
    })
  }

  const handleCalculateClick = (e) => {
    e.preventDefault();
    calculateTime(state.speed, state.size)
  }
  return (
    <div className="App">
      <header className="App-header">
        <h2>Download Time Calculator</h2>
      </header> 
      <div className="App-div">
        <div className="info">Caclulate how long it will take something to download (or upload).</div>
        <div className="speed-title">Internet Speed</div>
        <form>
          <div className="speed-input" >
            <input value={state.speed} onChange={handleChange} name="speed" type="number" />
            <select>
              <option value="mbps">mbps</option>
            </select>
          </div>
          <div className="file-title">File Size</div>
          <div className="file-input">
            <input value={state.size} onChange={handleChange} name="size" type="number" />
            <select>
              <option value="GB">GB</option>
            </select>
          </div>
        </form>
        <div>
          <h3>Time to Download</h3>
          {state.hours ?  <div>{state.hours} Hours</div> : null}
          {state.mins ? <div>{state.mins} Minutes</div>: null}
          {state.seconds ? <div>{state.seconds} Seconds</div> : null}
        </div>
      </div>
    </div>
  );
}

export default App;
