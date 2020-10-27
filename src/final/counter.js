import * as React from 'react'

function Counter({initialCount = 0, step = 1}) {
  const [count, setCount] = React.useState(initialCount)
  const increment = () => setCount(c => c + step)
  const decrement = () => setCount(c => c - step)
  return (
    <div>
      <button onClick={increment}>-</button>
      <span style={{width: 30, display: 'inline-block', textAlign: 'center'}}>
        {count}
      </span>
      <button onClick={decrement}>+</button>
    </div>
  )
}

export default Counter
