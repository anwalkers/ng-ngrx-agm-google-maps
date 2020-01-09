import { createReducer, on } from '@ngrx/store';
import * as MapActions from '../actions/app.actions';

import { MapMarker } from '../models/map.model';

export const appFeatureKey = 'app';

export interface State {
  mapId: string;
  selectedMarkers: MapMarker[];
  mapMarkers: MapMarker[];
}

export const initialState = {
  mapId: 'mapId',
  selectedMarkers: [],
  mapMarkers: []
};

export const reducer = createReducer(
  initialState,
  on(MapActions.loadMarkersSuccess, (state, { markers }) => ({
    ...state,
    mapMarkers: markers
  })),
  on(MapActions.addMarker, (state, { marker }) => {
    return {
      ...state,
      mapMarkers: [...state.mapMarkers, marker]
    };
  }),
  on(MapActions.updateMarkers, (state, { marker }) => {
    return {
      ...state,
      mapMarkers: [...state.mapMarkers.filter(m => m.id !== marker.id), marker],
    };
  }),
  on(MapActions.selectMarker, (state, { marker }) => {
    return {
      ...state,
      selectedMarkers: [...state.selectedMarkers, marker]
    };
  }),
  on(MapActions.deselectMarker, (state, { marker }) => {
    if (state.selectedMarkers.length === 1) {
      return {
        ...state,
        selectedMarkers: []
      };
    } else {
      return {
        ...state,
        selectedMarkers: state.selectedMarkers.filter(m => m.id !== marker.id)
      };
    }
  })
);

export const selectMapId = (state: State) => state.mapId;
export const selectMapMarkers = (state: State) => state.mapMarkers;
export const selectSelectedMarkers = (state: State) => state.selectedMarkers;
