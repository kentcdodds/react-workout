import * as React from "react";

// check the original component if you are not sure what is the expected behaviour
export function OriginalCounter({ items }) {
  const [counters, setCounters] = React.useState({});
  return items.map((item) => {
    const count = counters[item] || 0;
    return (
      <div key={item}>
        {item}: {count}{" "}
        <button
          onClick={() =>
            count > 0 && setCounters({ ...counters, [item]: count - 1 })
          }
        >
          -
        </button>
        <button
          onClick={() =>
            count > setCounters({ ...counters, [item]: count + 1 })
          }
        >
          +
        </button>
      </div>
    );
  });
}

// There is nothing wrong with the performance of the original component,
// but let's review how to make "OptimizedCounter" work correctly the hard way...

// reducer should be a stable function, not created inside a Component
const counterReducer = (state, action) => {
  // we should NOT modify the previous state, but make a copy at the beginning
  const newState = { ...state };

  // switch is just a personal preference over too many ifs
  switch (action.type) {
    case "inc": {
      newState[action.item] += 1;
      return newState;
    }
    case "dec": {
      // let's not forget the original business logic that prevents negative values
      if (newState[action.item] > 0) {
        newState[action.item] -= 1;
      }
      return newState;
    }
    case "resetAll": {
      return action.items.reduce((accumulator, item) => {
        accumulator[item] = 0;
        return accumulator;
      }, {});
    }
    default: {
      console.error("Unrecognized action type:", action.type);
      return state;
    }
  }
};

// let's export all logic to a custom hook
const useCounter = () => {
  // if we have a useEffect to synchronize state with new items,
  // no need for duplicate lazy initialization
  const [counters, dispatch] = React.useReducer(counterReducer, {});
  const inc = React.useCallback(
    (item) => () => dispatch({ type: "inc", item }),
    []
  );
  const dec = React.useCallback(
    (item) => () => dispatch({ type: "dec", item }),
    []
  );
  const resetAll = React.useCallback(
    (items) => dispatch({ type: "resetAll", items }),
    []
  );

  return [counters, inc, dec, resetAll];
};

export function FixedOptimizedCounter({ items }) {
  const [counters, inc, dec, resetAll] = useCounter();

  React.useEffect(() => {
    resetAll(items);
  }, [resetAll, items]);

  return items.map((item) => {
    const count = counters[item];
    return (
      <div key={item}>
        {item}: {count}
        <button onClick={dec(item)}>-</button>
        <button onClick={inc(item)}>+</button>
      </div>
    );
  });
}

// just to make Codesandbox happy:
export default () => <FixedOptimizedCounter items={["apples", "pears"]} />;
