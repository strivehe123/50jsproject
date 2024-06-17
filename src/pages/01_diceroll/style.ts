import styled from 'styled-components'
const DiceRollStyle = styled.div`
  box-sizing: border-box;

  background-color: #fff;
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  h1 {
    font-size: 3rem;
    margin-top: 2rem;
  }
  .dice {
    font-size: 7rem;
    margin: 5px;
    animation-duration: 1s;
    animation-fill-mode: forwards;
  }
  .roll-animation {
    animation-name: roll;
  }

  @keyframes roll {
    0% {
      transform: rotateY(0deg) rotateX(0deg);
    }

    100% {
      transform: rotateY(720deg) rotateX(720deg);
    }
  }
  button {
    background-color: #47a5c4;
    color: white;
    font-size: 1.5rem;
    padding: 1rem 2rem;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #2e8baf;
  }
  ul {
    list-style: none;
    padding: 0;
    max-width: 600px;
    margin: 2rem auto;
  }

  li {
    font-size: 1.5rem;
    padding: 0.5rem;
    margin: 0.5rem;
    background-color: #f2f2f2;
    border-radius: 0.5rem;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  li span {
    font-size: 3rem;
    margin-right: 1rem;
  }
`
export default DiceRollStyle
