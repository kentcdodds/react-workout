import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

function App() {
  return (
    <div className="container">
      <h1>React Workout</h1>
      <em>Exercises to practice React skillz</em>
      <p>
        This is a Codesandbox which you can use to practice your React Skills.
        It's a community driven project of exercises. Contributions are needed!
        Any ideas you have are welcome.
      </p>
      <h2>How to use this Codesandbox</h2>
      <p>
        Go to the exercises directory and select one of the exercises. Then
        enable "Current Module View" in codesandbox. Like this:
        <img
          alt="current module view"
          className="img"
          src="/current-module-view.png"
        />
        This will make Codesandbox render the component that is the "default
        export" of the module you have selected. From there, follow the
        instructions to complete the exercise
      </p>
      <h2>How to contribute</h2>
      <p>
        You can contribute your own example! First, make your own copy of this
        codesandbox by clicking the "Fork" button at the top. Then make and save
        the changes you want to make, and then click the "GitHub" icon to make a
        pull request.{" "}
        <a className="pretty-link" href="https://youtu.be/3PAQbhdkTtI?t=367">
          This video
        </a>{" "}
        might help a bit. Thanks!
      </p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
