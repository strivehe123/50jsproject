import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { BasicStyle } from './style'
import { useDocumentTitle } from '@/hooks/someHooks'
interface IProps {
  children?: ReactNode
}
// 定义组件的状态类型
interface IState {
  input: string
  operator: string | null
  firstNumber: number
}
const BasicCalculator: FC<IProps> = (props) => {
  useDocumentTitle('BasicCalculator Simulator')

  const [state, setState] = useState<IState>({
    input: '',
    operator: null,
    firstNumber: 0
  })
  // 定义输入更新函数
  const setInput = (input: string) => {
    setState((prevState) => ({ ...prevState, input }))
  }
  // 定义操作符更新函数
  const setOperator = (operator: string | null) => {
    setState((prevState) => ({
      ...prevState,
      operator,
      firstNumber: parseFloat(prevState.input) || 0,
      input: ''
    }))
  }
  // 定义计算函数
  const calculate = (): void => {
    const { input, operator, firstNumber } = state
    let secondNumber = parseFloat(input)
    if (isNaN(secondNumber)) secondNumber = 0

    let result: number

    switch (operator) {
      case '+':
        result = firstNumber + secondNumber
        break
      case '-':
        result = firstNumber - secondNumber
        break
      case '*':
        result = firstNumber * secondNumber
        break
      case '/':
        result = secondNumber !== 0 ? firstNumber / secondNumber : Infinity
        break
      default:
        return
    }

    setState({ input: result.toString(), operator: null, firstNumber: result })
  }
  // 定义按钮点击事件处理函数
  const handleNumberClick = (number: string) => {
    setInput(state.input === '0' ? number : state.input + number)
  }

  const handleOperatorClick = (operator: string) => {
    setOperator(operator)
  }

  const handleClearClick = () => {
    setInput('0')
    setOperator(null)
  }

  const handleEqualsClick = () => {
    calculate()
  }

  const handleDecimalClick = () => {
    if (!state.input.includes('.') && state.operator === null) {
      setInput(state.input + '.')
    }
  }

  return (
    <BasicStyle>
      <div className="calculator">
        <input type="text" value={state.input} readOnly className="result" />
        <div className="buttons">
          <button className="clear" onClick={handleClearClick}>
            C
          </button>
          {['/', '*', '-'].map((op) => (
            <button key={op} className="operator" onClick={() => handleOperatorClick(op)}>
              {op}
            </button>
          ))}
          {['7', '8', '9', '+', '4', '5', '6', '=', '1', '2', '3', '0'].map((num) => {
            if (num === '=') {
              return (
                <button key={num} className="equals" onClick={handleEqualsClick}>
                  {num}
                </button>
              )
            } else if (num === '+') {
              return (
                <button key={num} className="operator" onClick={() => handleOperatorClick(num)}>
                  {num}
                </button>
              )
            } else {
              return (
                <button key={num} className="number" onClick={() => handleNumberClick(num)}>
                  {num}
                </button>
              )
            }
          })}
          <button className="decimal" onClick={handleDecimalClick}>
            .
          </button>
          {/* <button className="equals" onClick={handleEqualsClick}>
            =
          </button> */}
        </div>
      </div>
    </BasicStyle>
  )
}
export default memo(BasicCalculator)

//  <div className="calculator">
//         <input type="text" className="result" />
//         <div className="buttons">
//           <button className="clear">C</button>
//           <button className="operator">/</button>
//           <button className="operator">*</button>
//           <button className="operator">-</button>
//           <button className="number">7</button>
//           <button className="number">8</button>
//           <button className="number">9</button>
//           <button className="operator">+</button>
//           <button className="number">4</button>
//           <button className="number">5</button>
//           <button className="number">6</button>
//           <button className="equals">=</button>
//           <button className="number">1</button>
//           <button className="number">2</button>
//           <button className="number">3</button>
//           <button className="number">0</button>
//           <button className="decimal">.</button>
//         </div>
//       </div>
