import { lazy } from 'react'
import { Navigate, type RouteObject } from 'react-router-dom'
const DiceRoll = lazy(() => import('../pages/01_diceroll/index'))
const BasicCalculator = lazy(() => import('../pages/02_basic_calculator/index'))
const GameDog = lazy(() => import('../pages/games/01_game/game_dog'))
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/dicroll" />
  },
  {
    path: '/dicroll',
    element: <DiceRoll />
  },
  {
    path: '/basiccalculator',
    element: <BasicCalculator />
  },
  {
    path: '/games/01_game',
    element: <GameDog />
  }
]

export default routes
