import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as MapActions from '../actions/app.actions';
import { MapMarkerService } from '../services/map-marker.service';
import { MapMarker } from '../models/map.model';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';

@Injectable()
export class MapMarkersEffects {
  public loadMapMarkers$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(MapActions.loadMarkers),
      switchMap(() =>
        this.mapMarkerService.getMarkers().pipe(
          map((markers: MapMarker[]) =>
            MapActions.loadMarkersSuccess({ markers })
          ),
          catchError(error =>
            of(MapActions.loadMarkersFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private mapMarkerService: MapMarkerService
  ) {}
}
