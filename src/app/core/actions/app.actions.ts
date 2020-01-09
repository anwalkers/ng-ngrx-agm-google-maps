import { createAction, props } from '@ngrx/store';
import { MapMarker } from '../models/map.model';

export const loadMarkers = createAction('[App Component] load markers');
export const loadMarkersFailure = createAction(
  '[App Component] load markers failure',
  props<{ error: any }>()
);
export const loadMarkersSuccess = createAction(
  '[App Component] add markers',
  props<{ markers: MapMarker[] }>()
);
export const updateMarkers = createAction(
  '[App Component] update markers',
  props<{ marker: MapMarker }>()
)
export const addMarker = createAction(
  '[App Component] add marker',
  props<{ marker: MapMarker }>()
);
export const selectMarker = createAction(
  '[App Component] select marker',
  props<{ marker: MapMarker }>()
);
export const deselectMarker = createAction(
  '[App Component] deselect marker',
  props<{ marker: MapMarker }>()
);
