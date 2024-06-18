import type { Action, Reducer } from "redux";
import {
  PERSIST,
  PersistConfig as OriginalPersistConfig,
  persistReducer as originalPersistReducer,
  PersistState,
} from "redux-persist";

import { INVALIDATE } from "./constants";

interface PersistPartial {
  _persist: PersistState;
}

export interface PersistConfig<S> extends OriginalPersistConfig<S> {
  shouldInvalidate?: boolean;
}

export const persistReducer: <S, A extends Action = Action>(
  config: PersistConfig<S>,
  baseReducer: Reducer<S, A>
) => Reducer<S & PersistPartial, A> = (config, baseReducer) => {
  const { shouldInvalidate = false, ...originalConfig } = config;
  const reducer = originalPersistReducer(originalConfig, baseReducer);

  return (state: any, action: any) => {
    const { _persist, ...rest } = state || {};

    switch (action.type) {
      case INVALIDATE: {
        // This clears the _persist key from state, allowing the underlying
        // reducer to fetch the state from storage when PERSIST action is
        // dispatched.
        return shouldInvalidate ? { ...rest } : state;
      }
      case PERSIST: {
        // persist-redux's persistReducer has a note that says PERSIST action
        // can be dispatched multiple times, but it could result in error in
        // the console.
        //
        // If store is already rehydrated, we do not pass the action to the
        // underlying reducer.
        if (_persist?.rehydrated) {
          return state;
        }
        return reducer(state, action);
      }
      default:
        return reducer(state, action);
    }
  };
};
