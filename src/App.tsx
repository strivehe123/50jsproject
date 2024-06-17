import React from 'react'
import { Link, useRoutes } from 'react-router-dom'
import routes from './router'

function App() {
  return (
    <div className="App">
      <div className="nav-bar">
        {/* react 导航 */}

        <ul>
          <li>
            <Link to="/dicroll">DiceRoll</Link>
          </li>
          <li>
            <Link to="/basiccalculator">BasicCalculator</Link>
          </li>
          <li>
            <Link to="/games/01_game">GameDog</Link>
          </li>
        </ul>
      </div>
      {useRoutes(routes)}
    </div>
  )
}

export default App
