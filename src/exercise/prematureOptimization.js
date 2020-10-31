import * as React from 'react'
import {
  OriginalCounter,
  FixedOptimizedCounter,
} from '../final/prematureOptimization'

const task = `Oh no! Someone tried to optimize our Counter without writing regression tests.
Turns out they introduced some bugs 🐛
Can you find and fix them all?`

function OptimizedCounter({items}) {
  const counterReducer = (state, [type, item]) => {
    if (type === 'inc') {
      state[item] += 1
    } else if (type === 'dec') {
      state[item] -= 1
    } else {
      state[item] = 0
    }
    return {...state}
  }
  const [counters, dispatch] = React.useReducer(counterReducer, null, () =>
    items.reduce((acc, i) => {
      acc[i] = 0
      return acc
    }, {}),
  )
  const inc = React.useCallback(item => () => dispatch(['inc', item]), [])
  const dec = React.useCallback(item => () => dispatch(['dec', item]), [])

  React.useEffect(() => {
    dispatch('reset', items)
  }, [items])

  return items.map(item => {
    const count = counters[item]
    return (
      <div key={item}>
        {item}: {count}
        <button onClick={dec(item)}>-</button>
        <button onClick={inc(item)}>+</button>
      </div>
    )
  })
}

// ---

function Counters() {
  const [items, setItems] = React.useState(['apples', 'oranges'])

  return (
    <div>
      <pre>{task}</pre>
      <section>
        <h3>"Optimized" Counter (can it count each item correctly?):</h3>
        <OptimizedCounter items={items} />
      </section>
      <section>
        <h3>Original Counter (works as expected):</h3>
        <OriginalCounter items={items} />
      </section>
      <section>
        <h3>
          Fixed Optimized Counter (if you still think you need performance
          optimizations for this one):
        </h3>
        <FixedOptimizedCounter items={items} />
      </section>

      <br />

      {items.includes('bananas') ? null : (
        <button
          onClick={() => setItems(i => [...i, 'bananas'])}
          style={{fontSize: '16px', padding: '5px'}}
        >
          Add bananas{' '}
          <span role="img" aria-label="banana emoji">
            🍌
          </span>
        </button>
      )}
    </div>
  )
}

export default Counters
