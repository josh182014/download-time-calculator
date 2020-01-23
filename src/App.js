import React, { useState, useEffect } from 'react';
import './App.scss';

const App = () => {

  const [ state, setState ] = useState({
    size: null,
    speed: null,
    time: 0,
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
    if (!state.size || !state.speed) {
      setState({
        ...state,
        time: 0,
      })
      return
    }
    speed = speed / 8
    size = size * 1000
    time = size / speed
    setState({
      ...state,
      time: time / 60,
    })

  }

  const handleCalculateClick = () => {
    calculateTime(state.speed, state.size)
  }
  return (
    <div className="App">
      <header className="App-header">
        <div>Header</div>
      </header> 
      <body className="App-body">
        <div>Hello, World</div>
        Internet Speed: <input value={state.speed} onChange={handleChange} name="speed" /> Mbps
        File Size: <input value={state.size} onChange={handleChange} name="size" /> GB
        <button onClick={handleCalculateClick}>Caclculate</button>
        <div>Time: {state.time}</div>
      </body>
    </div>
  );
}

export default App;
