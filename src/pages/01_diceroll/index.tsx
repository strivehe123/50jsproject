import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import classNames from 'classnames'
import DiceRollStyle from './style'
import { useDocumentTitle } from '@/hooks/someHooks'
interface IProps {
  children?: ReactNode
}
const DiceRoll: FC<IProps> = (props) => {
  useDocumentTitle('DiceRoll Simulator')
  const [initStr, setInitStr] = useState('⚀')
  const [isAnimated, setIsAnimated] = useState(false)
  const [historyList, setHistoryList] = useState<string[]>([])
  const rollDice = () => {
    setIsAnimated(true)
    const rollResult = Math.floor(Math.random() * 6) + 1
    const diceFace = getDiceFace(rollResult)
    const _historyList = [...historyList, diceFace]
    setInitStr(diceFace)
    setHistoryList(_historyList)
    setTimeout(() => {
      setIsAnimated(false)
    }, 1000)
  }

  function getDiceFace(rollResult: number): string {
    switch (rollResult) {
      case 1:
        return '⚀' // U+2680
      case 2:
        return '⚁' // U+2681
      case 3:
        return '⚂' // U+2682
      case 4:
        return '⚃' // U+2683
      case 5:
        return '⚄' // U+2684
      case 6:
        return '⚅' // U+2685
      default:
        return ''
    }
  }
  return (
    <DiceRollStyle>
      <h1>DiceRoll Simulator</h1>
      <div className={classNames('dice', isAnimated ? 'roll-animation' : '')}>{initStr}</div>
      <button className="roll-button" onClick={() => rollDice()}>
        Roll Dice
      </button>
      <ul id="roll-history">
        {historyList.map((item, index) => {
          return (
            <li key={index}>
              Roll {index + 1}: <span>{item}</span>
            </li>
          )
        })}
      </ul>
    </DiceRollStyle>
  )
}
export default memo(DiceRoll)
