import React from 'react'

function Intro(props) {
  return (
    <div className='intro-container'>
      <h1>Quizzical</h1>
      <p>Some description if needed</p>
      <button onClick={props.handleStart}>Start quiz</button>
    </div>
  )
}

export default Intro