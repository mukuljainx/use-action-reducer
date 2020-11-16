import * as React from "react";

type ActionCretor<S, A> = Record<keyof A, (...payload: any) => (s: S) => S>;
type ReducerAction<R extends ActionCretor<any, any>> = R extends ActionCretor<
  any,
  infer A
>
  ? A
  : never;
type ReducerState<R extends ActionCretor<any, any>> = R extends ActionCretor<
  infer S,
  any
>
  ? S
  : never;

export type IActions<S> = Record<string, (...payload: any) => (state: S) => S>;

const useCustomReducer = <R extends ActionCretor<any, any>>(
  actions: R,
  initialState: ReducerState<R>
): [ReducerState<R>, R] => {
  const reducer = (
    state: ReducerState<R>,
    action: { type: string; payload?: any }
  ) => {
    if (!actions[action.type]) {
      throw new Error();
    }

    return actions[action.type](...action.payload)(state);
  };
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const newActions: any = {};
  Object.keys(actions).forEach((actionName) => {
    newActions[actionName] = (...payload: any) =>
      dispatch({ type: actionName, payload });
  });

  return [state, newActions];
};

export default useCustomReducer;
