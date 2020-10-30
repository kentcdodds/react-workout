import * as React from "react";
import FinalCounter from "../final/counter";

function Counter() {
  return (
    <div>
      <pre>
        {`
Replace this with a Counter component that looks like this:
-  0  +
Clicking "-" will reduce the count
Clicking "+" will increase the count

Also, make it so I can pass an initialCount and a step as a prop
where initialCount would default to 0 and the step would default to 1

Here's how the final version works. Build this:
  `.trim()}
      </pre>
      <FinalCounter />
    </div>
  );
}

export default Counter;
