import * as React from "react";
import "./styles.css";
import useCustomReducer, { IActions } from "./useCustomReducer";

const initialState = { count: 0 };

type IState = typeof initialState;

const actionsCreators = {
  increaseCount: (payload: string, b: string) => (state: IState) => {
    return {
      count: state.count + parseInt(b, 10)
    };
  },
  decreaseCount: (payload: number) => (state: IState) => {
    return {
      count: state.count - payload
    };
  }
};

export default function App() {
  const [state, actions] = useCustomReducer(actionsCreators, initialState);
  return (
    <div className="App">
      {state.count}
      <div>
        <button onClick={() => actions.increaseCount("20")}>++</button>
        <button onClick={() => actions.decreaseCount(5)}>--</button>
      </div>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
