import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer,
    Action
  } from '@ngrx/store';
  
  import * as fromApp from '../core/reducers/app.reducer';
  

  import { environment } from '../../environments/environment';
  import { InjectionToken } from '@angular/core';
  
  export interface State {
    [fromApp.appFeatureKey]: fromApp.State,
  }
  
  /**
   * Our state is composed of a map of action reducer functions.
   * These reducer functions are called with each dispatched action
   * and the current or initial state and return a new immutable state.
   */
  export const ROOT_REDUCERS = new InjectionToken<
    ActionReducerMap<State, Action>
  >('Root reducers token', {
    factory: () => ({
       [fromApp.appFeatureKey]: fromApp.reducer
    }),
  });
  
  // console.log all actions
  export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return (state, action) => {
      const result = reducer(state, action);
      console.groupCollapsed(action.type);
      console.log('prev state', state);
      console.log('action', action);
      console.log('next state', result);
      console.groupEnd();
  
      return result;
    };
  }
  
  export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
  
  /**
   * Core Reducers
   */
  export const selectAppState = createFeatureSelector<fromApp.State>(
    'app'
  );

  export const selectMapMarkers = createSelector(
    selectAppState,
    (state: fromApp.State) => state.mapMarkers
);
  
  export const selectSelectedMapMarkers = createSelector(
    selectAppState,
    (state: fromApp.State) => state.selectedMarkers
);  