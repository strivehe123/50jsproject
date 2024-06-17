import styled from 'styled-components'
export const BasicStyle = styled.div`
  div,
  button,
  input {
    box-sizing: border-box;
  }
  .calculator {
    background-color: #f2f2f2;
    margin: 0 auto;
    margin-top: 40px;
    padding: 20px;
    border: 1px solid #ccc;
    boxshadow:
      0 0 20px 0 rgba(0, 0, 0, 0.2),
      0 5px 5px 0 rgba(0, 0, 0, 0.24);
    border-radius: 5px;
    max-width: 400px;

    .result {
      width: 100%;
      padding: 10px;
      border: none;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3) inset;
      font-size: 24px;
      &:focus {
        outline: none;
      }
    }
    .buttons {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 10px;
      margin-top: 20px;
    }
    button {
      padding: 10px;
      font-size: 24px;
      border: none;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #ddd;
    }

    .clear {
      background-color: #ff4136;
      color: #fff;
    }

    .number,
    .decimal {
      background-color: #fff;
      color: #333;
    }

    .operator {
      background-color: #0074d9;
      color: #fff;
    }

    .equals {
      background-color: #01ff70;
      grid-row: span 3;
      color: #fff;
    }
  }
`
